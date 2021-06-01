import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/Input/Input';
import  * as actionCreators from '../../store/actionCreators/index';
import { Redirect } from 'react-router';

const AuthData = props => {
    
    const [signupForm, setSignupForm] = useState({
        name:{
            value:'',
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            validation: {
                required:true
            },
            valid:false,
            touched:false
        },
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
    });

    const [loginForm, setLoginForm] = useState({
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
    });

    const [isLogin, setIsLogin] = useState(true)

    //error checking helper for form
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

    //error checking for input
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
        setLoginForm(newForm)
    }; 

    //submit form values
    const submitHandler = (event) => {
        event.preventDefault();
        props.auth(authForm.email.value, authForm.password.value, isSignIn)
    };

    //
    const toggleSignIn = () => {
        setIsLogin(!isLogin)
    };

    const {burgerBuild, redirPath, authRedirHome} = props

    useEffect(() => {
        if(!burgerBuild && redirPath !== '/')
        {
            authRedirHome()}
        }, [burgerBuild, redirPath, authRedirHome]
    )

    //setting up sign up form

    const signupArr = []

    for (let index in SignupForm){
        formArr.push({id: index, config: SignupForm[index]})
    }

    const formInput = signupArr.map(element => {
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

    let formWrapper = (
        <div>
        <h4>
            Sign up
        </h4>
        <form onSubmit={submitHandler}>
            {formInput}
            <Button BtnType='Success'>Submit</Button>
        </form>
        <a></a>
        </div>
    ); 

    //login form

    const loginArr = []

    for (let index in LoginForm){
        formArr.push({id: index, config: SignupForm[index]})
    }

    const formInput = signupArr.map(element => {
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

    //

    if (!isSignIn) {
        formWrapper = 
        <div>
            <h4>Enter Login data</h4>
            <form onSubmit={submitHandler}>
                {formInput}
                <Button BtnType='Success'>Submit</Button>
            </form>
            <a></a>
        </div>    
    }

    if (props.loading === true){
        formWrapper = <Spinner/>
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
            {formWrapper}
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