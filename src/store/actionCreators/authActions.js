import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const authStart = () => {
    return {type: actionTypes.AUTH_START}
};

export const authSuccess = (action) => {
    return {type: actionTypes.AUTH_SUCCESS, action:action}
};

export const authFailed = (error) => {
    return {type: actionTypes.AUTH_FAILED, error:error}
};

export const authThunk = (email, password, signedIn) => {
    return dispatch => {
        dispatch(authStart());
        const userCred = {email:email, password:password, returnSecureToken:true}
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwiiR8Y8atJBrXaGqHBuYEyeU9IjELKz8"
        if (!signedIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwiiR8Y8atJBrXaGqHBuYEyeU9IjELKz8'
        }
        axios.post(url, userCred)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                dispatch(authFailed(err))
            })
    }
}