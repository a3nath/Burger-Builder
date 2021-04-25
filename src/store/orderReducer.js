import * as actionTypes from './actionTypes';

const initialState = {
    orders: [], 
    error:false,
    loading:false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.START_ORDER):
            return {...state, loading:true}
        case (actionTypes.POST_ORDER):
            return {...state, orders: state.orders.concat(action.order), error: false, loading:false};
        case (actionTypes.POST_ERROR):
            return {...state, error:true, loading:false}
        case (actionTypes.GET_ORDERS):
            return {...state, orders: action.orders, error: false, loading:false}
        case (actionTypes.ORDERS_ERROR):
            return {...state, error: true, loading:false};
        default:
            return state
    } 
};

export default orderReducer;
