import React, {useState} from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [showSidedrawer, setShowSidedrawer] = useState(false)

    const drawerClose = () => {
        setShowSidedrawer(false)
    }

    const drawerToggle = () => {
        setShowSidedrawer(!showSidedrawer)
    }

    return(
        <Aux>
            <Toolbar 
                DrawerClicked={drawerToggle} 
                auth={props.isAuth}/>
            <Sidedrawer 
                clicked={drawerClose} 
                show={showSidedrawer} 
                auth={props.isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token != null
    }
}

export default connect(mapStateToProps)(Layout);