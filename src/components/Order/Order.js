import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

    const ingArr = []

    for (let ingName in props.ingredients) {
        ingArr.push({name: ingName, amount: props.ingredients[ingName]})
    }

   const ingOutput = ingArr.map(ing => {
       return(
       <span 
        key={ing.name}
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '2px',
            'background-color':'#5767df',
            color:',#fff'

        }}
       >{ing.name}: {ing.amount}</span>
       )
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients <div className={classes.OrderIngArr}>{ingOutput}</div></p>
            <p>Price: {props.price}</p>
        </div>

    )
}

export default order;