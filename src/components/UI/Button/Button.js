import React from 'react';

import classes from './Button.module.css';


const button = (props) => {
    console.log(props.disabled)
    return( <button disabled={props.disabled} className={[classes.Button, classes[props.BtnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
    )
};

export default button;