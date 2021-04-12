import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Aaa',
                contact: '519519519',
                country: 'Canada'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false})
            })
            .catch(error => {
                this.setState({loading: false}) 
            })

         
    }

    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact data</h4>
                <form>
                    <input type='text' className={classes.Input} name='name' placeholder='Your Name'/>
                    <input type='email' name='email' className={classes.Input} placeholder='Your Email'/>
                    <input type='text' name='street' className={classes.Input} placeholder='Your Address'/>
                    <input type='text' name='postal' className={classes.Input} placeholder='Your postal code'/>
                    <Button BtnType='Success' clicked={this.orderHandler}>ORDER</Button>
                    
                </form>
            </div>
        )
    }
}

export default ContactData;