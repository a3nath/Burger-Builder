import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Order/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        total: 7,
        modal:false,
        loading: false
    }

    // addIng = (type) => {
    //     // let newIng = {...this.state.ingredients}
    //     // const oldIngCount = newIng[type]
    //     // const newIngCount = oldIngCount + 1
    //     // newIng[type] = newIngCount
    //     // const oldTotal = this.state.total
    //     // const newTotal = oldTotal + INGREDIENT_COST[type]

    //     // this.setState({ingredients: newIng, total: newTotal})
    // }

    // removeIng = (type) => {
    //     // let newIng = {...this.state.ingredients}
    //     // const oldIngCount = newIng[type]
    //     // const newIngCount = oldIngCount - 1
    //     // newIng[type] = newIngCount
    //     // const oldTotal = this.state.total
    //     // const newTotal = oldTotal - INGREDIENT_COST[type]

    //     this.setState({ingredients: newIng, total:newTotal})
    // }

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
        // axios.get('https://academindburger-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(err => { console.log(err)})
    }


    render () {

        let burgerMenu = <Spinner/>
        let orderSummary = null

        if (this.props.ing){
            burgerMenu = 
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BurgerControls 
                        ingredients={this.props.ing} 
                        addControl={this.props.addIng} 
                        removeControl = {this.props.removeIng}
                        price={this.props.total} 
                        modal={this.modalHandler}
                    />

                </Aux>
            orderSummary = 
                <OrderSummary 
                    purchaseClick={this.purchaseHandler} 
                    cancelClick={this.modalCloseHandler} 
                    price={this.props.total} 
                    ingredients={this.props.ing}
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
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        total: state.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIng: (ingName) => dispatch({type: actionTypes.ADD_ING, ing:ingName}),
        removeIng: (ingName) => dispatch({type: actionTypes.REM_ING, ing:ingName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));