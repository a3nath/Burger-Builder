import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

const BurgerIngredient = props => {
        let ingredient = null;

        switch ( props.type ) {
            case ( 'bottom' ):
                ingredient = <div className={classes.Bottom}></div>;
                break;
            case ( 'bread-top' ):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ( 'meat' ):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ( 'cheese' ):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ( 'tomato' ):
                ingredient = <div className={classes.Tomato}></div>;
                break; 
            case ( 'lettuce' ):
                ingredient = <div className={classes.Lettuce}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;