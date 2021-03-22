import React from 'react';

import classes from './BurgerControl.module.css'
import BurgerControl from './BurgerControl/BurgerControl';


const burgerControls = (props) => {
    return(
        Object.keys(props.ingredients).map((ing,key) => {
            return(
                <div key={key} className={classes.Control}>
                    <BurgerControl 
                        ing={ing} 
                        added={() => props.addControl(ing)} 
                        remove = {() => props.removeControl(ing)}
                        disab = {(props.ingredients[ing] < 1 ? true : false)}
                    />
                </div>
            )
        })
)};




export default burgerControls;