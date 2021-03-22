import React from 'react';

import Aux from '../../../hoc/Aux';

const saladControl = (props) => {
    return(
        <div>
            <p>{props.ing}</p>
            <button onClick={props.added}>Add Ingredient</button>
            <button onClick={props.remove} disabled={props.disab}>Remove Ingrdient</button>
        </div>
    )
};

export default saladControl;