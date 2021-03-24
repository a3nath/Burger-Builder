import React from 'react';

import classes from './BurgerControl.module.css'
import BurgerControl from './BurgerControl/BurgerControl';
import Order from '../Order/Order';


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
            <Order clicked={props.modalHandler} price={props.price}/>
        </div>
)};


export default burgerControls;