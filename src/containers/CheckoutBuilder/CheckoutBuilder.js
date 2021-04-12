import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../CheckoutBuilder/ContactData/ContactData';

class CheckoutBuilder extends Component {
    state={
        ingredients: null,
        price:0
    }

    componentWillMount() {
        const newIng = {}
        let total = 0
        const urlParams =  new URLSearchParams(this.props.location.search)
        const entries = urlParams.entries()

        for (const entry of entries){ 
            if(entry[0] === 'price') {
                total = +entry[1]
            }
            else{
                newIng[entry[0]] = +entry[1]
            }
        }
        this.setState({ingredients: newIng, price:total})
    }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contactdata')
    }



    render(){
        console.log(this.props)

        return( 
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    clickedCancel={this.checkoutCancel} 
                    clickedSuccess={this.checkoutContinue}/>
                <Route path={`${this.props.match.url}/contactdata`} render={() => <ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.price}/> }/>
            </div>

        )
    }
} 


export default CheckoutBuilder;