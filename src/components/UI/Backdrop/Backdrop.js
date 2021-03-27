import React from 'react';
import classes from './Backdrop.module.css'

const backdrop = (props) => (
    (props.Backdropshow) ?  <div className={classes.Backdrop} onClick={props.BackdropClicked}></div> : null
)

export default backdrop;