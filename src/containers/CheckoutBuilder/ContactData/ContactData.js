import React, {useState} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input';
import  * as actionCreators from '../../../store/actionCreators/index';


const ContactData = props => {
    const [contactForm, setContactForm] = useState({
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
            }
        }
    )

    const [formValid, setFormValid] = useState(false)

    const validHandler = (value, rules) => {
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
    };

    const inputHandler = (event, inputElement) => {
        const newForm = {...contactForm};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newInput.valid = validHandler(newInput.value, newInput.validation);
        newInput.touched = true;
        newForm[inputElement] = newInput;
        let formCheck = true
        for (let formElement in newForm){
            formCheck = newForm[formElement].valid && formCheck
        }
        setContactForm(newForm);
        setFormValid(formCheck);
    };

    const orderHandler = (event) => {
        event.preventDefault();
        const customerData = {};
        for (let index in contactForm){
            customerData[index] = contactForm[index].value
        }

        const order = {
            ingredients: props.ing,
            price: props.price,
            customer: customerData,
            userId: props.userId
        }
        props.postOrder(order, props.token);
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         setState({loading:false})
        //         props.history.push('/')
        //     })
        //     .catch(error => {
        //         setState({loading: false}) 
        //     })
    };

        const formArr = []

        for (let index in contactForm){
            formArr.push({id: index, config: contactForm[index]})
        }

        const formInput = formArr.map(element => {
            return(
                <Input 
                    key={element.id} 
                    inputType= {element.config.elementType} 
                    name={element.id} 
                    value ={element.config.value} 
                    elementConfig={element.config.elementConfig}
                    changed={(event) => inputHandler(event, element.id)}
                    invalid={!element.config.valid}
                    validation={element.config.validation}
                    touched={element.config.touched}
                />
            )
        })

        let form = (
            <form onSubmit={orderHandler}>
                {formInput}
                <Button disabled={!formValid} BtnType='Success'>ORDER</Button>
            </form>
        ); 

        if (props.loading === true){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact data</h4>
                {form}
            </div>
        )
};

const mapStateToProps = state => {
   return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.total,
    //when I click on the form loading:true, show spinner and then once successfully posted loading false
    loading: state.orderBuilder.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
   } 
};

const mapDispatchToProps = (dispatch) => {
    return{
        postOrder: (orderData, token) => dispatch(actionCreators.postOrderthunk(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);