import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

class layout extends Component {

    state={
        showSidedrawer: false
    }

    drawerClose = () => {
        this.setState({
            showSidedrawer: false
        })
    }

    drawerToggle = () => {
        this.setState((prevState) => {
            return  {showSidedrawer: !prevState.showSidedrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    DrawerClicked={this.drawerToggle} 
                    auth={this.props.isAuth}/>
                <Sidedrawer 
                    clicked={this.drawerClose} 
                    show={this.state.showSidedrawer} 
                    auth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token != null
    }
}

export default connect(mapStateToProps)(layout);