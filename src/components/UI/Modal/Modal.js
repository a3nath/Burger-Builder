import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import OrderSummary from '../../Order/OrderSummary';

const modal = (props) => {
    


    return(
        <Aux>
            <Backdrop show={props.modalShow} clicked={props.modalClose}/>
            <div className={classes.Modal} 
            style={{
                transform: props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.modalShow ? '1' : '0'
            }}>
                <OrderSummary purchaseClick={props.purchase} cancelClick={props.modalClose} total={props.price} ingredientsArr={props.ingredients}/>
            </div>

        </Aux>
        
    )
}

export default modal;