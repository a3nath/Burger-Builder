import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
                <h1>Ummm, enjoy your burger!</h1>
                <div className = {classes.checkoutBurger}>
                    <Burger ingredients={props.ingredients}/>   
                </div>
                <Button BtnType='Danger' clicked={props.clickedCancel} className={[classes.checkoutCancel, classes.checkoutButton].join(' ')}>Cancel</Button>
                <Button BtnType='Success' clicked={props.clickedSuccess} className={[classes.checkoutSuccess, classes.checkoutButton].join(' ')}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;

