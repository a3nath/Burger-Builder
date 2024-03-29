import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import classes from './OrderSummary.module.css';



const orderSummary = (props) => {

    const ingArr = Object.keys(props.ingredients).map((ing, key) => {
        return (
            <li key={key}>{ing.toUpperCase()}: {props.ingredients[ing]}</li>
        )       
    })

    return(
        <Aux>
            <div className={classes.modalBody}>
            <h2 className={classes.modalHeader}>Your Amazing burger is readdy!</h2>
            <p>The ingredients are:</p>
                <ul>
                    {ingArr}
                </ul>
                <p>Price: {props.price}</p>
                <Link to={`/checkout/`}>
                    <Button clicked={props.purchaseClick} BtnType='Success'>Contine</Button>
                </Link>
                <Button clicked={props.cancelClick} BtnType='Danger'>Cancel</Button>
            </div>
        </Aux>
    )
}

export default orderSummary;
