import React from 'react';
import { Link, Route } from 'react-router-dom';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import ContactData from '../../containers/CheckoutBuilder/ContactData/ContactData';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
                <h1>Ummm, enjoy your burger!</h1>
                    <div style={{width:'300px', height:'500px', margin:'auto'}}>
                        <Burger ingredients={props.ingredients}/>   
                </div>
                    <Button BtnType='Danger' clicked={props.click}>Cancel</Button>
                        <Button BtnType='Success' clicked>Continue</Button>
            
                    {/* <Route path={`${this.props.match.path}/contactdata`} render={() => <ContactData ingredients={props.ingredients} price={props.price}/> }/> */}
            </div>
    )
}

export default checkoutSummary;

