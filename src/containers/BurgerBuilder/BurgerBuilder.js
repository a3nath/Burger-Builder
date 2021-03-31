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
        ingredients: {
            lettuce: 1,
            tomato: 1,
            cheese: 1,
            meat: 1
        },
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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.total,
            customer: {
                name: 'Aaa',
                contact: '519519519',
                country: 'Canada'
            }
        }
        axios.post('/ordersson', order)
            .then(response => {
                this.setState({loading:false, modal:false})
            })
            .catch(error => {
                this.setState({loading: false, modal:false})
            })
    }

    render () {
        let orderSummary = <OrderSummary purchaseClick={this.purchaseHandler} cancelClick={this.modalCloseHandler} price={this.state.total} ingredients={this.state.ingredients}/>

        if (this.props.loading){
            orderSummary = <Spinner/>
        }


        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    ingredients={this.state.ingredients} 
                    addControl={this.addIng} 
                    removeControl = {this.removeIng}
                    price={this.state.total} 
                    modal={this.modalHandler}
                />
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