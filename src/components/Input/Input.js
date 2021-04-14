import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    let optionArr = null;
    if (props.options){
        optionArr = props.options
    }

    switch (props.inputType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed}
                className={classes.InputElement} 
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}/>
            break;
        case('select'):
            inputElement = <select 
                    onChange={props.changed} 
                    className={classes.InputElement} 
                    value={props.value}>
                    {props.elementConfig.options.map(opt => {
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    })}
                </select> 
        default:
            inputElement = <input 
            onChange={props.changed}
            className={classes.InputElement} 
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
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