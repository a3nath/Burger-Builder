import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'

class ContactData extends Component {

    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
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
                    <Button BtnType='Success'>ORDER</Button>
                    
                </form>
            </div>
        )
    }
}

export default ContactData;