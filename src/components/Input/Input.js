import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    let validationError = null

    if (props.invalid && props.validation && props.touched){
    validationError= <p>Please enter valid {props.elementConfig.type} value</p>
    }

    switch (props.inputType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed}
                className={props.invalid && props.validation && props.touched ? [classes.InputElement, classes.InputInvalid].join(' '): classes.InputElement} 
                value={props.value}
                {...props.elementConfig}/>
            break;
        case('select'):
            inputElement = <select 
                    onChange={props.changed} 
                    className={props.invalid && props.validation && props.touched ? [classes.InputElement, classes.InputInvalid].join(' '): classes.InputElement}
                    value={props.value}>
                    {props.elementConfig.options.map(opt => 
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    )}
                </select> 
            break;
        default:
            inputElement = <input 
            onChange={props.changed}
            className={props.invalid && props.validation && props.touched ? [classes.InputElement, classes.InputInvalid].join(' '): classes.InputElement} 
            value={props.value}
            {...props.elementConfig}
            />
            break
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label} hidden="hidden">{props.name}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;