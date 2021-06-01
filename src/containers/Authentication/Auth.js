import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/Input/Input';
import  * as actionCreators from '../../store/actionCreators/index';
import { Redirect } from 'react-router';

const AuthData = props => {
    
    const [authForm, setAuthForm] = useState({
        email: {
            value:'',
            elementType:'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
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
                placeholder: 'Password'
            },
            validation: {
                required:true,
                MinLen: 7
            },
            valid:false,
            touched:false
        },
    })

    // const [formValid, setFormValid] = useState(false)
    const [isSignIn, setSignIn] = useState(true)

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
        const newForm = {...authForm};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newInput.valid = validHandler(newInput.value, newInput.validation);
        newInput.touched = true;
        newForm[inputElement] = newInput;
        // let formCheck = true
        // for (let formElement in newForm){
        //     formCheck = newForm[formElement].valid && formCheck
        // }
        setAuthForm(newForm)
    }; 

    const submitHandler = (event) => {
        event.preventDefault();
        props.auth(authForm.email.value, authForm.password.value, isSignIn)
    };

    const toggleSignIn = () => {
        setSignIn(!isSignIn)
    };

    const {burgerBuild, redirPath, authRedirHome} = props

    useEffect(() => {
        if(!burgerBuild && redirPath !== '/'){
                    authRedirHome()
                }
    }, [burgerBuild, redirPath, authRedirHome])

    const formArr = []

    for (let index in authForm){
        formArr.push({id: index, config: authForm[index]})
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
        <form onSubmit={submitHandler}>
            {formInput}
            <Button BtnType='Success'>Submit</Button>
        </form>
    ); 

    if (props.loading === true){
        form = <Spinner/>
    }

    let errorMess = null;
    if (props.error){
        errorMess = (
            <p>{props.error.message}</p>
        )
    }

    let authRedir = null;
    if (props.isAuth){
        authRedir = <Redirect to={props.redirPath}/>
    }

    return(
        <div className={classes.AuthData}>
            {errorMess}
            {authRedir}
            <h4>Enter Login data</h4>
            {form}
            <Button BtnType='Danger' clicked={toggleSignIn}>SWITCH to {isSignIn ? "Sign Up" : "Sign In"}</Button>
        </div>
    )
};

const mapStateToProps = state => {
   return {
    //when I click on the form loading:true, show spinner and then once successfully posted loading false
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    ing: state.burgerBuilder.ingredients,
    isAuth: state.authReducer.token !== null,
    burgerBuild: state.burgerBuilder.burgerBuilding,
    redirPath: state.authReducer.redirectPath
   } 
};

const mapDispatchToProps = (dispatch) => {
    return{
        auth: (email, password, signedIn) => dispatch(actionCreators.authThunk(email, password, signedIn)),
        authRedirHome: () => dispatch(actionCreators.authRedirect('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthData);