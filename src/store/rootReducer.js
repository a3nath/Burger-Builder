import * as actionTypes from './actions';

const INGREDIENT_COST = {
    lettuce: 1,
    tomato: 2,
    cheese: 1,
    meat: 3
}

const initialState = {
    ingredients:{
        lettuce: 1,
        tomato: 1,
        cheese: 1,
        meat: 1
    },
        total:7
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_ING):
            const newIng = {...state.ingredients}
            newIng[action.ing] += 1
            return {...state, ingredients: newIng, total: state.total + INGREDIENT_COST[action.ing]};
        case (actionTypes.REM_ING):
            const updIng = {...state.ingredients}
            updIng[action.ing] -= 1;
            return {...state, ingredients: updIng, total: state.total - INGREDIENT_COST[action.ing] };
    }
    return state
}

export default rootReducer;