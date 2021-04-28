import axios from '../../axios-orders';
import * as actionTypes from '../actionTypes';

export const authStart = () => {
    return {type: actionTypes.AUTH_START}
};

export const authSuccess = (email, password) => {
    return {type: actionTypes.AUTH_SUCCESS}
};

export const authFailed = (error) => {
    return {type: actionTypes.AUTH_FAILED, error:error}
};

export const authThunk = (email, password) => {
    return dispatch => {
        dispatch(authStart())
    }
}

