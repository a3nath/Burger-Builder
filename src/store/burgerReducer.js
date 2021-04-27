import * as actionTypes from './actionTypes';

const INGREDIENT_COST = {
    lettuce: 1,
    tomato: 2,
    cheese: 1,
    meat: 3
}

const initialState = {
    ingredients:null,
    total:0,
    error: false
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.INITIAL_ING):
            const iniIng = action.ing;
            return {...state, ingredients: action.ing, total:0, error:true}
        case(actionTypes.INITIAL_ERROR):
            return {...state, error: true}
        case(actionTypes.ADD_ING):
            const newIng = {...state.ingredients}
            newIng[action.ing] += 1
            return {...state, ingredients: newIng, total: state.total + INGREDIENT_COST[action.ing]};
        case (actionTypes.REMOVE_ING):
            const updIng = {...state.ingredients}
            updIng[action.ing] -= 1;
            return {...state, ingredients: updIng, total: state.total - INGREDIENT_COST[action.ing]};
        default:
            return state
    }
}

export default burgerReducer;