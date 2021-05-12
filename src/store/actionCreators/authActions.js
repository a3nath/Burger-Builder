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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
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
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationTime', response.data.expiresIn)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(checkTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error))
            })
    }
}

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expirationDate = new Date(localStorage.getItem('expirationTime') * 1000 + new Date().getTime())
        const userId = localStorage.getItem('userId')

        if (!token || expirationDate <= new Date()){
            dispatch(authLogout)
        }

        else {
            dispatch(authSuccess(token, userId))
            dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }

    }
}

export const authRedirect = (path) => {
    return {
        type:actionTypes.AUTH_REDIRECT, 
        path:path
    }
}