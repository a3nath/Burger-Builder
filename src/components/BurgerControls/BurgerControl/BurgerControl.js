import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './BurgerControl.module.css';

const burgerControl = (props) => {
    return(
        <Aux>
            <p className={classes.Ing}>{props.ing}</p>
            <button onClick={props.added} className={classes.burgerButton}>Add Ingredient</button>
            <button onClick={props.remove} disabled={props.disab} className={classes.burgerButton}>Remove Ingrdient</button>
        </Aux>
    )
};

export default burgerControl;