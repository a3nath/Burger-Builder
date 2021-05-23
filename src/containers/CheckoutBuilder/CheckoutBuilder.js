import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../CheckoutBuilder/ContactData/ContactData';

const CheckoutBuilder = props => {
  
    const checkoutCancel = () => {
        props.history.goBack()
    }

    const checkoutContinue = () => {
        props.history.replace('/checkout/contactdata')
    }
        
    let summary = <Redirect to='/'/>

    if (props.ing) {
        const purchaseRedirect = props.purchased ? <Redirect to ='/'/> : null;
        summary = 
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    ingredients={props.ing} 
                    clickedCancel={this.checkoutCancel} 
                    clickedSuccess={this.checkoutContinue}/>
                <Route path={`${props.match.url}/contactdata`} component={ContactData}/>
            </div>                    
    }

    return( 
        <div>
            {summary}
        </div>
    )
} 

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.orderBuilder.purchased
    }
}

export default connect(mapStateToProps)(CheckoutBuilder);
