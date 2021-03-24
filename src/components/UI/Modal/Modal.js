import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
    const ingArr = Object.keys(props.ingredients).map((ing, key) => {
        return (
            <li>{ing.toUpperCase()}: {props.ingredients[ing]}</li>
        )       
    })
    return(
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
        </div>
    )
}

export default modal;