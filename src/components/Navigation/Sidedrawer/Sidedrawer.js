import React from 'react';

import classes from './Sidedrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sidedrawer = (props) => {

    let DrawerClass = [classes.Drawer, classes.Close]

    if (props.open) {
        DrawerClass = [classes.Drawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop onClick={props.click} Backdropshow={props.open}/>
            <div className={DrawerClass.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
        
    )
}

export default sidedrawer;