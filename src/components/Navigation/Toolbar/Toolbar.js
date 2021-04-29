import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.DrawerClicked}/>
        <div className={classes.Logo}>
            <Logo/> 
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems auth={props.auth}/>
        </nav>
    </header>

)

export default toolbar;