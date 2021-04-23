import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

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

        return( 
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ing} 
                    clickedCancel={this.checkoutCancel} 
                    clickedSuccess={this.checkoutContinue}/>
                <Route path={`${this.props.match.url}/contactdata`} component={ContactData}/>
            </div>

        )
    }
} 

const mapDispatchToProps = state => {
    return {
        ing: state.ingredients,
    }
}

export default connect(mapDispatchToProps)(CheckoutBuilder);
