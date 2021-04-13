import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            exact
            to={props.link} 
            activeClassName={classes.active}
        >
        </NavLink>{props.children}
    </li>
)

export default navigationItem;
