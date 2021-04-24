import { initialErr } from './actionCreators';
import * as actionTypes from './actionTypes';

const initialState = {
    orders: [], 
    error:false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.POST_ORDER):
            return state;
        case (actionTypes.POST_ERROR):
            return {...state, error:true}
        case (actionTypes.GET_ORDERS):
            return { ...state, error: false}
        case (actionTypes.ORDERS_ERROR):
            return {...state, error: true};
        default:
            return state
    } 
}

export default orderReducer;
