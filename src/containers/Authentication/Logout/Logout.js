import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionTypes from '../../../store/actionTypes'

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout()
    };

    render(){
        return(
            <Redirect to='/'/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type:actionTypes.AUTH_LOGOUT})
    }
}


export default connect(null, mapDispatchToProps)(Logout);