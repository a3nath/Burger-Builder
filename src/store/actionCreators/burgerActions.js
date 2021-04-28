import axios from '../../axios-orders';
import * as actionTypes from '../actionTypes';

//Burger builder

export const initialIng = ingArr => {
    return {type: actionTypes.INITIAL_ING, ing: ingArr}
};

export const initialErr = error => {
    return {type: actionTypes.INITIAL_ERROR, error: error}
};

export const addIng = ingName => {
    return {type: actionTypes.ADD_ING, ing:ingName}
};

export const removeIng = ingName => {
    return {type: actionTypes.REMOVE_ING, ing:ingName}
};

export const iniIngthunk = () => {
    return (dispatch) => {
        return (
            axios.get('https://academindburger-default-rtdb.firebaseio.com/ingredients.json')
                .then(response => {
                    dispatch(initialIng(response.data))
                })
                .catch(err => { 
                    dispatch(initialErr(err))
                })
        )
    }
};