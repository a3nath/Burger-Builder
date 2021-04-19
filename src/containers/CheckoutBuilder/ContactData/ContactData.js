import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input';


class ContactData extends Component {

    state={
        contactForm:{
            name: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required:true,
                    MinLen:3,
                    MaxLen:30
                },
                valid:false,
                touched:false
            },
            email: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
            streetAddress: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                validation: {
                    required:true,
                },
                valid:true,
                touched:false
            },
            postalCode: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                validation: {
                    required:true,
                    MinLen:6,
                    MaxLen:6
                },
                valid:true,
                touched:false
            },
            Delivery:{
                    value:'speedy',
                    elementType:'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'speedy'},
                            {value: 'cheapest', displayValue: 'cheapest'}
                        ]
                    },
                    validation: {},
                    valid:false,
                    touched:false
                },
            },
        formValid:false,
        loading:false
    }

    validHandler = (value, rules) => {
        let inputValid = true
        if (rules.required){
            inputValid = value.trim() !== '' && inputValid
        }
        if (rules.MaxLen) {
            inputValid = value.length <= rules.MaxLen && inputValid
        }
        if (rules.MinLen) {
            inputValid = value.length >= rules.MinLen && inputValid
        }
        return inputValid
    }

    inputHandler = (event, inputElement) => {
        const newForm = {...this.state.contactForm};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newInput.valid = this.validHandler(newInput.value, newInput.validation);
        newInput.touched = true;
        newForm[inputElement] = newInput;
        let formCheck = true
        for (let formElement in newForm){
            formCheck = newForm[formElement].valid && formCheck
        }
        this.setState({contactForm: newForm, formValid: formCheck})
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const customerData = {};
        for (let index in this.state.contactForm){
            customerData[index] = this.state.contactForm[index].value
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            customer: customerData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false}) 
            })
    }

    render(){

        const formArr = []

        for (let index in this.state.contactForm){
            formArr.push({id: index, config: this.state.contactForm[index]})
        }

        const formInput = formArr.map(element => {
            return(
            <Input 
                key={element.id} 
                inputType= {element.config.elementType} 
                name={element.id} 
                value ={element.config.value} 
                elementConfig={element.config.elementConfig}
                changed={(event) => this.inputHandler(event, element.id)}
                invalid={!element.config.valid}
                validation={element.config.validation}
                touched={element.config.touched}/>)
        })

        let BtnClass = [classes.Btn]

        let form = (
            <form onSubmit={this.orderHandler}>
                {formInput}
                <Button disabled={!this.state.formValid} BtnType='Success'>ORDER</Button>
            </form>
        ); 

        if (this.state.loading == true){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact data</h4>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = state => {
   return {
    ing: state.ingredients,
    price: state.total
   } 
}

export default connect(mapDispatchToProps)(ContactData);