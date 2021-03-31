import React from 'react';
import Aux from '../../hoc/Aux/Aux'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {

    const ingArr = Object.keys(props.ingredients).map((ing, key) => {
        return (
            <li key={key}>{ing.toUpperCase()}: {props.ingredients[ing]}</li>
        )       
    })
    return(
        <Aux>
            <h2>Your Amazing burger is readdy!</h2>
            <p>The ingredients are:</p>
            <ul>
                {ingArr}
            </ul>
            <p>Price: {props.price}</p>
            <Button clicked={props.purchaseClick} BtnType='Success'>Contine</Button>
            <Button clicked={props.cancelClick} BtnType='Danger'>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;