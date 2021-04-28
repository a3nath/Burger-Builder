import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
                <h1>Ummm, enjoy your burger!</h1>
                <div style={{width:'300px', height:'500px', margin:'auto'}}>
                    <Burger ingredients={props.ingredients}/>   
                </div>
                <Button BtnType='Danger' clicked={props.clickedCancel}>Cancel</Button>
                <Button BtnType='Success' clicked={props.clickedSuccess}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;

