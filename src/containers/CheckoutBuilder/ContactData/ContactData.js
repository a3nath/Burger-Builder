import React, {Component} from 'react';

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
                }
            },
            email: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                }
            },
            streetAddress: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Address'
                }
            },
            postalCode: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                }
            },
            Delivery:{
                    value:'',
                    elementType:'select',
                    elementConfig: {
                        options: [
                            {value: 'aa', displayValue: 'aa'},
                            {value: 'bb', displayValue: 'bb'}
                        ]
                },
            }
        },
        loading:false
    }

    inputHandler = (event, inputElement) => {
        const newForm = {...this.state.contactForm};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newForm[inputElement] = newInput;
        this.setState({contactForm: newForm});
    }

    orderHandler = (event) => {
        const customerData = {}
        event.preventDefault();
        this.setState({loading: true})
        for (let index in this.state.contactForm){
            customerData[index] = this.state.contactForm[index.value]
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: this.state.customerData
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
            console.log(this.state.contactForm[index])
            formArr.push({id: index, config: this.state.contactForm[index]})
            console.log(formArr)
        }

        const formInput = formArr.map(element => {
            return(
            <Input 
                key={element.id} 
                inputType= {element.config.elementType} 
                name={element.id} 
                value ={element.config.value} 
                placholder={element.config.elementConfig.placeholder} 
                type={element.config.elementConfig.type}
                options={element.config.elementConfig.options}
                changed={(event) => this.inputHandler(event, element.id)}/>)
        })

        let form = (
            <form onSubmit={this.orderHandler}>
                {formInput}
            </form>
        ); 

        if (this.state.loading == true){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact data</h4>
                {form}
                <Button BtnType='Success'>ORDER</Button>
            </div>
        )
    }
}

export default ContactData;