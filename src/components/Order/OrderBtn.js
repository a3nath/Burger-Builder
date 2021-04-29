import React from 'react';
import classes from './OrderBtn.module.css';

const orderBtn = (props) => {
    return(
            <button onClick={props.clicked} disabled={!props.price > 0} className={classes.OrderButton}>
                {props.auth ? 'ORDER NOW' : 'SIGN IN TO ORDER' }</button>
            )
}

export default orderBtn;
