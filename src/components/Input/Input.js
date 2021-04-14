import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    console.log(props)
    console.log(props.placeholder)

    switch (props.inputType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed}
                className={classes.InputElement} 
                value={props.value}
                {...props.elementConfig}/>
            break;
        case('select'):
            inputElement = <select 
                    onChange={props.changed} 
                    className={classes.InputElement} 
                    value={props.value}>
                    {props.elementConfig.options.map(opt => 
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    )}
                </select> 
            break;
        default:
            inputElement = <input 
            onChange={props.changed}
            className={classes.InputElement} 
            value={props.value}
            {...props.elementConfig}
            />
            break
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.name}</label>
            {inputElement}
        </div>
    )
}

export default input;