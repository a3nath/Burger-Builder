import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Order.module.css';

const order = (props) => {
    return(
            <button onClick={props.clicked} disabled={!props.price > 0} className={classes.OrderButton}>ORDER NOW</button>
            )
}

export default order;
