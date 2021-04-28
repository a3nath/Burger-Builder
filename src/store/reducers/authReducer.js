import * as actionTypes from '../actionTypes';

const initialState = {
    error:false,
    loading:false,
    token:null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START):
            return state
        case(actionTypes.AUTH_SUCCESS):
            return {...state}
        case(actionTypes.AUTH_FAILED):
            return {...state, error: true}
        default: 
            return state
    }   
}

export default authReducer;