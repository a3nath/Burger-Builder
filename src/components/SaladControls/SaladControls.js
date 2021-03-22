import React from 'react';

const saladControls = (props) => {
    return(
        <div>
            <button onClick={props.addControl}>Add Ingredient</button>
            <button onClick={props.removeControl}>Remove Ingredient</button>
        </div>
    )

}




export default saladControls;