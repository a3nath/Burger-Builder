import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../CheckoutBuilder/ContactData/ContactData';

class CheckoutBuilder extends Component {
  
    componentWillMount() {
 
    }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contactdata')
    }

    render(){


        let summary = <Redirect to='/'/>

        if (this.props.ing) {
            const purchaseRedirect = this.props.purchased ? <Redirect to ='/'/> : null;
            summary = 
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ing} 
                        clickedCancel={this.checkoutCancel} 
                        clickedSuccess={this.checkoutContinue}/>
                    <Route path={`${this.props.match.url}/contactdata`} component={ContactData}/>
                </div>                    
        }

        return( 
            <div>
                {summary}
            </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.orderBuilder.purchased
    }
}

export default connect(mapStateToProps)(CheckoutBuilder);
