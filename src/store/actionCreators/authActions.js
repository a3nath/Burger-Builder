import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const authStart = () => {
    return {type: actionTypes.AUTH_START}
};

export const authSuccess = (idtoken, userid) => {
    return {type: actionTypes.AUTH_SUCCESS, idToken:idtoken, userId: userid}
};

export const authFailed = (error) => {
    return {type: actionTypes.AUTH_FAILED, error:error}
};

export const authLogout = () => {
    return {type: actionTypes.AUTH_LOGOUT}
};

export const checkTimeout = (time) => {
    return dispatch => { 
        setTimeout(() => dispatch(authLogout()) ,time * 1000)
    }
}

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
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(checkTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error))
            })
    }
}