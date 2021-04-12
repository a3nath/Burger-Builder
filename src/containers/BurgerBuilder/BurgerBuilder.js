import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Order/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_COST = {
    lettuce: 1,
    tomato: 2,
    cheese: 1,
    meat: 3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        total: 7,
        modal:false,
        loading: false
    }

    addIng = (type) => {
        let newIng = {...this.state.ingredients}
        const oldIngCount = newIng[type]
        const newIngCount = oldIngCount + 1
        newIng[type] = newIngCount
        const oldTotal = this.state.total
        const newTotal = oldTotal + INGREDIENT_COST[type]

        this.setState({ingredients: newIng, total: newTotal})
    }

    removeIng = (type) => {
        let newIng = {...this.state.ingredients}
        const oldIngCount = newIng[type]
        const newIngCount = oldIngCount - 1
        newIng[type] = newIngCount
        const oldTotal = this.state.total
        const newTotal = oldTotal - INGREDIENT_COST[type]

        this.setState({ingredients: newIng, total:newTotal})
    }

    modalHandler = () => {
        this.setState({modal:true})
    }

    modalCloseHandler = () => {
        this.setState({modal:false})
    }

    purchaseHandler =() => {
        this.setState({loading: true})
    }

    componentDidMount(){
        axios.get('https://academindburger-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(err => { console.log(err)})
    }


    render () {

        let burgerMenu = <Spinner/>
        let orderSummary = null

        if (this.state.ingredients){
            burgerMenu = 
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls 
                        ingredients={this.state.ingredients} 
                        addControl={this.addIng} 
                        removeControl = {this.removeIng}
                        price={this.state.total} 
                        modal={this.modalHandler}
                    />
                </Aux>
            orderSummary = 
                <OrderSummary 
                    purchaseClick={this.purchaseHandler} 
                    cancelClick={this.modalCloseHandler} 
                    price={this.state.total} 
                    ingredients={this.state.ingredients}
                /> 
        }

        if (this.props.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                {burgerMenu}

                <Modal 
                    modalShow={this.state.modal}
                    modalClose={this.modalCloseHandler}
                    // loading={this.state.loading}    
                >
                    {orderSummary}
                </Modal>
            </Aux>
            
        );
    }
};

export default WithErrorHandler(BurgerBuilder, axios);