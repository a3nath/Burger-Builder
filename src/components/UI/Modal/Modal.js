import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button'

const modal = (props) => {
    const ingArr = Object.keys(props.ingredients).map((ing, key) => {
        return (
            <li key={key}>{ing.toUpperCase()}: {props.ingredients[ing]}</li>
        )       
    })
    return(
        <Aux>
            <Backdrop show={props.modalShow} clicked={props.modalClose}/>
            <div className={classes.Modal} 
            style={{
                transform: props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.modalShow ? '1' : '0'
            }}>
                <h2>Your Amazing burger is readdy!</h2>
                <p>The ingredients are:</p>
                <ul>
                    {ingArr}
                </ul>
                <p>Price: {props.price}</p>
                <Button clicked={props.purchase} BtnType='Success'>Contine</Button>
                <Button clicked={props.modalClose} BtnType='Danger'>Cancel</Button>

            </div>

        </Aux>
        
    )
}

export default modal;