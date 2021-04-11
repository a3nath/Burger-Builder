import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {

    const ingArr = Object.keys(props.ingredients).map((ing, key) => {
        return (
            <li key={key}>{ing.toUpperCase()}: {props.ingredients[ing]}</li>
        )       
    })

    let ingStr = ''

    for (let index in Object.keys(props.ingredients)){
        let ing = Object.keys(props.ingredients)[index]
        ingStr = ingStr + `${ing}=${props.ingredients[ing]}&`
    }

    return(
        <Aux>
            <h2>Your Amazing burger is readdy!</h2>
            <p>The ingredients are:</p>
            <ul>
                {ingArr}
            </ul>
            <p>Price: {props.price}</p>
            <Link to={`/checkout/?${ingStr}`}>
                <Button clicked={props.purchaseClick} BtnType='Success'>Contine</Button>
            </Link>
            <Button clicked={props.cancelClick} BtnType='Danger'>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;
