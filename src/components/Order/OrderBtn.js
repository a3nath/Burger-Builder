import React from 'react';
import classes from './OrderBtn.module.css';

const orderBtn = (props) => {
    return(
            <button onClick={props.clicked} disabled={!props.price > 0} className={classes.OrderButton}>ORDER NOW</button>
            )
}

export default orderBtn;
