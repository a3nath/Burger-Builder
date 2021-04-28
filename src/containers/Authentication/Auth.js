import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/Input/Input';
import  * as actionCreators from '../../store/actionCreators/index';


class AuthData extends Component {

    state={
        authForm:{
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
            password: {
                value:'',
                elementType:'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                validation: {
                    required:true,
                    MinLen: 7
                },
                valid:false,
                touched:false
            },
        },
        formValid:false,
    };

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
    };

    inputHandler = (event, inputElement) => {
        const newForm = {...this.state.authForm};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newInput.valid = this.validHandler(newInput.value, newInput.validation);
        newInput.touched = true;
        newForm[inputElement] = newInput;
        // let formCheck = true
        // for (let formElement in newForm){
        //     formCheck = newForm[formElement].valid && formCheck
        // }
        this.setState({authForm: newForm})
    };


    render(){

        const formArr = []

        for (let index in this.state.authForm){
            formArr.push({id: index, config: this.state.authForm[index]})
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
                    touched={element.config.touched}
                />
            )
        })

        let form = (
            <form onSubmit={'/'}>
                {formInput}
                <Button BtnType='Success'>Submit</Button>
                <Button BtnType='Danger'>Switch</Button>
            </form>
        ); 

        if (this.props.loading == true){
            form = <Spinner/>
        }

        return(
            <div className={classes.AuthData}>
                <h4>Enter Login data</h4>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
   return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.total,
    //when I click on the form loading:true, show spinner and then once successfully posted loading false
    loading: state.orderBuilder.loading
   } 
};

const mapDispatchToProps = (dispatch) => {
    return{
        postOrder: (orderData) => dispatch(actionCreators.postOrderthunk(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthData);