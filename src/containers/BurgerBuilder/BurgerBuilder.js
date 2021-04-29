import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Order/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actionCreators/index';
import { Redirect } from 'react-router';

class BurgerBuilder extends Component {
    state = {
        modal:false,
        loading: false
    }



    modalHandler = () => {
        if (this.props.isAuth) {
            this.setState({modal:true})
        }
        else{
            this.props.history.push('/auth')
        }
    };

    modalCloseHandler = () => {
        this.setState({modal:false})
    };

    purchaseHandler =() => {
        this.props.purchaseStart()
    };

    componentDidMount(){
        this.props.iniIng()
    };


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
                        auth={this.props.isAuth}
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
        ing: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.total,
        purchased: state.orderBuilder.purchased,
        isAuth: state.authReducer.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        iniIng: () => dispatch(actionCreators.iniIngthunk()),
        addIng: (ingName) => dispatch(actionCreators.addIng(ingName)),
        removeIng: (ingName) => dispatch(actionCreators.removeIng(ingName)),
        purchaseStart: () => dispatch(actionCreators.purchased())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));