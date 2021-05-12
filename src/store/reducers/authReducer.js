import * as actionTypes from '../actionTypes';

const initialState = {
    error:null,
    loading:false,
    token:null,
    userId:null,
    redirectPath:'/'
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START):
            return {...state, error:null, loading:true};
        case(actionTypes.AUTH_SUCCESS):
            return {...state, token:action.idToken, userId:action.userId, error: null, loading:false};
        case(actionTypes.AUTH_FAILED):
            return {...state, error: action.error, loading:false};
        case(actionTypes.AUTH_LOGOUT):
            return {...state, token:null, userId:null};
        case(actionTypes.AUTH_REDIRECT):
            return {...state, redirectPath:action.path};
        default: 
            return state
    };
};

export default authReducer;