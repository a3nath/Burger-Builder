import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/Input/Input';
import  * as actionCreators from '../../store/actionCreators/index';
import { Redirect } from 'react-router';
import Modal from '../../components/UI/Modal/Modal'

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

    const [isSignup, setIsSignup] = useState(true)

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

    const [isLogin, setIsLogin] = useState(false)

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
        const newForm = {...formName};
        const newInput = {...newForm[inputElement]};
        newInput.value = event.target.value;
        newInput.valid = validHandler(newInput.value, newInput.validation);
        newInput.touched = true;
        newForm[inputElement] = newInput;
        // let formCheck = true
        // for (let formElement in newForm){
        //     formCheck = newForm[formElement].valid && formCheck
        // }
        setForm(newForm)
    }; 

    //submit form values
    const submitHandler = (event) => {
        event.preventDefault();
        if (isLogin){
            props.auth(loginForm.email.value, loginForm.password.value, isLogin)
           
        }
        else if (!isLogin){
            props.auth(signupForm.email.value, signupForm.password.value, isLogin)
        }
    };

  

    //
    const toggleSignIn = () => {
        setIsLogin(!isLogin)
        setIsSignup(!isSignup)
    };

    const {burgerBuild, redirPath, authRedirHome} = props

    useEffect(() => {
            if(!burgerBuild && redirPath !== '/')
            {
                authRedirHome()
            }
        }, [burgerBuild, redirPath, authRedirHome]
    )

    //setting up  form

    let formArr = []
    let formName = signupForm
    let setForm = setSignupForm
    
    for (let index in formName){
        formArr.push({id: index, config: formName[index]})
    }

    let formInput = formArr.map(element => {
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
        <p>Already have account?<a onClick={toggleSignIn}>Sign in</a></p>
        </div>
    ); 


    if (isLogin) {  
            formArr = []
            formName = loginForm
            setForm = setLoginForm

            for (let index in formName){
                formArr.push({id: index, config: formName[index]})
            }

            formInput = formArr.map(element => {
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

            formWrapper = 
                <div>
                    <h4>Enter Login data</h4>
                    <form onSubmit={submitHandler}>
                        {formInput}
                        <Button BtnType='Success'>Submit</Button>
                    </form>
                    <p>Dont have an account?<a onClick={toggleSignIn}>Sign up</a></p>
                </div>    
                
    }             

    if (props.loading === true){
        formWrapper = <Spinner/>
    }

    let errMess = null
    if (props.error){
        errMess = <p>{props.error.message}</p>
    }
   
    let authRedir = null;
    if (props.isAuth){ 
        authRedir = <Redirect to={props.redirPath}/>
    }


    return(
        <div className={classes.AuthData}>
            {authRedir}
            {formWrapper}
            {errMess}
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