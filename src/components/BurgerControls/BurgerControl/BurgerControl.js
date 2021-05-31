import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './BurgerControl.module.css';

const burgerControl = (props) => {
    return(
        <Aux>
            <p className={classes.Ing}>{props.ing}</p>
            <button onClick={props.added} className={classes.Button}>Add Ingredient</button>
            <button onClick={props.remove} disabled={props.disab} className={classes.Button}>Remove Ingrdient</button>
        </Aux>
    )
};

export default burgerControl;