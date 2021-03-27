import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

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
                <Toolbar DrawerClicked={this.drawerToggle}/>
                <Sidedrawer clicked={this.drawerClose} show={this.state.showSidedrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default layout;