import React, {useState} from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

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
            />
            <Sidedrawer 
                clicked={drawerClose} 
                show={showSidedrawer} 
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}



export default Layout;