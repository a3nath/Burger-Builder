import axios from '../axios-orders'

export const ADD_ING = 'ADD_INGREDIENT'
export const REMOVE_ING = 'REMOVE_INGREDIENT'
export const INITIAL_ING = "INITIAL_INGREDIENT"
export const INITIAL_ERROR = "INITIAL_ERROR"

export const initialIng = ingArr => {
    return {type: INITIAL_ING, ing: ingArr}
}

export const initialErr = error => {
    return {type: INITIAL_ERROR, error: error}
}

export const addIng = ingName => {
    return {type: ADD_ING, ing:ingName}
}

export const removeIng = ingName => {
    return {type: REMOVE_ING, ing:ingName}
}

export const iniIngthunk = () => {
    return (dispatch) => {
        return (
            axios.get('https://academindburger-default-rtdb.firebaseio.com/.json')
                .then(response => {
                    dispatch(initialIng(response.data.ingredients))
                })
                .catch(err => { 
                    dispatch(initialErr(err))
                })
        )
    }
}