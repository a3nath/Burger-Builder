import React from 'react';

import Aux from '../../../hoc/Aux';

const burgerControl = (props) => {
    return(
        <Aux>
            <p>{props.ing}</p>
            <button onClick={props.added}>Add Ingredient</button>
            <button onClick={props.remove} disabled={props.disab}>Remove Ingrdient</button>
        </Aux>
    )
};

export default burgerControl;