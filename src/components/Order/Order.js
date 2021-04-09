import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Order.module.css';

const order = (props) => {
    return(
        <Link to='/checkout'>
            <button onClick={props.clicked} disabled={!props.price > 0} className={classes.OrderButton}>ORDER NOW</button>
        </Link>
            )
}

export default order;
