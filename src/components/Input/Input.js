import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    switch (props.inputType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed}
                className={classes.inputElement} 
                type={props.type}/>
            break;
        // case('select'):
        //     inputElement = 
        //         <select onChange={props.changed} 
        //             className={classes.inputElement} value={props.value}>
        //             {props.options.map(opt => {
        //                 <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
        //             })}
        //         </select> 
        default:
            inputElement = <input 
            onChange={props.changed}
                className={classes.inputElement} 
            type={props.type}/>
            break
    }

    return(
        <div>
            <label className={classes.Label}>{props.name}</label>
            {inputElement}
        </div>
    )
}

export default input;