import React, {Component} from 'react';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

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

    navigateBack = () => {
        this.props.history.goBack()
    }

    render(){
        console.log(this.props)

        return( 
            <CheckoutSummary ingredients={this.state.ingredients} price={this.state.price} click={this.navigateBack}/>
        )
    }
} 

export default CheckoutBuilder;