import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionTypes from '../../../store/actionTypes'



const Logout = props => {

    useEffect(() => {
        props.onLogout()
    })

    return(
        <Redirect to='/'/>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type:actionTypes.AUTH_LOGOUT})
    }
}


export default connect(null, mapDispatchToProps)(Logout);