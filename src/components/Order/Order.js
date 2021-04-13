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
            border: 'solid 1px',
            padding: '2px'
        }}
       >{ing.name} {ing.amount}</span>
       )
    })
    console.log(ingOutput)

    return(
        <div className={classes.Order}>
            <p>Ingredients {ingOutput}</p>
            <p>Price: {props.price}</p>
        </div>

    )
}

export default order;