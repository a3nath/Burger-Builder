import React from 'react';

import classes from './BurgerControls.module.css'
import BurgerControl from './BurgerControl/BurgerControl';
import OrderBtn from '../Order/OrderBtn';

const burgerControls = (props) => {
    return(
        <div className={classes.Control}>
            <p>Total Price: {props.price}</p>
            {Object.keys(props.ingredients).map((ing,key) => {
            return(
                <div key={key}>
                    <BurgerControl 
                        ing={ing} 
                        added={() => props.addControl(ing)} 
                        remove = {() => props.removeControl(ing)}
                        disab = {(props.ingredients[ing] < 1 ? true : false)}
                    />
                </div>
                )
            })
        }
            <OrderBtn clicked={props.modal} price={props.price} auth={props.auth}/>
        </div>
)};


export default burgerControls;