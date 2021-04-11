import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button'
import classes from './CheckoutBuilder.module.css'
import ContactData from '../CheckoutBuilder/ContactData/ContactData'
import { Link, Route } from 'react-router-dom';


class CheckoutBuilder extends Component {
    state={
        ingredients: {
            lettuce: 1,
            tomato: 1,
            meat:1,
            cheese:1
        }
    }

    componentDidMount() {
        const newIng = {}
        const urlParams =  new URLSearchParams(this.props.location.search)
        const entries = urlParams.entries()

        for (const entry of entries){ 
           
            newIng[entry[0]] = +entry[1]
        }

        this.setState({ingredients: newIng})
    }

   

    navigateBack = () => {
        this.props.history.goBack()
    }


    render(){
        console.log(this.props)

        return( 
            <div className={classes.CheckoutBuilder}>
               <h1>Ummm, enjoy your burger!</h1>
                <div style={{width:'300px', height:'500px', margin:'auto'}}>
                    <Burger ingredients={this.state.ingredients}/>   
               </div>
                <Button BtnType='Danger' clicked={this.navigateBack}>Cancel</Button>
                <Link to={`${this.props.match.url}/contactdata`}>
                    <Button BtnType='Success' clicked>Continue</Button>
                </Link>
                <Route path={`${this.props.match.path}/contactdata`} component={ContactData}/>
           </div>
        )
    }
} 

export default CheckoutBuilder;