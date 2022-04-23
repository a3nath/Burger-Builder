import React, {useEffect, useState } from 'react';
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
import classes from './BurgerBuilder.module.css';



const BurgerBuilder = props => {

    const [modal, setModal] = useState(false)
    // const [loading, setLoading] = useState(false)
  
    const modalHandler = () => {
        if (props.isAuth) {
            setModal(true)
        }
        else{
            props.authRedir('/checkout/')
            props.history.push('/auth')
        }
    };

    const modalCloseHandler = () => {
        setModal(false)
    };

    const purchaseHandler =() => {
        props.purchaseStart()
    };
 
    const {iniIng} = props

    useEffect(() => {
       iniIng()
    }, [iniIng])

    let burgerMenu = <Spinner/>
    let orderSummary = null

    const intro =  
        <div className={classes.Intro}>
            <h1>Burger Builder</h1>
            <h2 className={classes.subtitle}>Welcome to Burger Builder</h2>
            <h3>Sign in, add topings to create your very own burger, press order to enter contact details and we will send the burger to your door!</h3>
        </div>

    if (props.ing){
        burgerMenu = 
            <div className={classes.burgerBox}>
                <BurgerControls 
                    ingredients={props.ing} 
                    addControl={props.addIng} 
                    removeControl = {props.removeIng}
                    price={props.total} 
                    modal={modalHandler}
                    auth={props.isAuth}
                />
                <Burger ingredients={props.ing} />
            </div>
        orderSummary = 
            <OrderSummary 
                purchaseClick={purchaseHandler} 
                cancelClick={modalCloseHandler} 
                price={props.total} 
                ingredients={props.ing}
            /> 
    }

    if (props.loading){
        orderSummary = <Spinner/>
    }

    return (
        <Aux>
            {intro}
            {burgerMenu}
            <Modal
                modalShow={modal}
                modalClose={modalCloseHandler}
                // loading={this.state.loading}    
            >
                {orderSummary}
            </Modal>
        </Aux>
        
    );
}


const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.total,
        purchased: state.orderBuilder.purchased,
        isAuth: state.authReducer.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        iniIng: () => dispatch(actionCreators.iniIngthunk()),
        addIng: (ingName) => dispatch(actionCreators.addIng(ingName)),
        removeIng: (ingName) => dispatch(actionCreators.removeIng(ingName)),
        purchaseStart: () => dispatch(actionCreators.purchased()),
        authRedir: (path) => dispatch(actionCreators.authRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));