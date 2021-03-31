import React from 'react';

import classes from './Sidedrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sidedrawer = (props) => {

    let DrawerClass = [classes.Sidedrawer, classes.Close]

    if (props.show) {
        DrawerClass = [classes.Sidedrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop BackdropClicked={props.clicked} Backdropshow={props.show}/>
            <div className={DrawerClass.join(' ')}>
                <div className={classes.Logo} style={{'height': '11%'}}>
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