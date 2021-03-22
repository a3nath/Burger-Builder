import React from 'react';

import classes from './SaladControl.module.css'
import SaladControl from './SaladControl/SaladControl';


const saladControls = (props) => {
    return(
        Object.keys(props.ingredients).map((ing,key) => {

            return(
                <div key={key} className={classes.Control}>
                    <SaladControl 
                        ing={ing} 
                        added={() => props.addControl(ing)} 
                        remove = {() => this.removeControl(ing)}
                        disab = {(props.ingredients[ing] < 1 ? true : false)}
                    />
                </div>
            )
        })
)};




export default saladControls;