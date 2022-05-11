import React, {Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../src/components/UI/Spinner/Spinner';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actionCreators from './store/actionCreators/index';


const App = props => {

  const {onLogin} = props

  useEffect(() => {
    onLogin();
  }, [onLogin]); 

  const Orders = React.lazy(() => import('./containers/Orders/Orders'))
  const CheckoutBuilder = React.lazy(() => import('./containers/CheckoutBuilder/CheckoutBuilder'))
  const Auth = React.lazy(() => import('./containers/Authentication/Auth'))
  const Logout = React.lazy(() => import('./containers/Authentication/Logout/Logout'))

  let routes = 
    <Switch>
      <Route exact path='/' component={BurgerBuilder}/>
      <Route path='/auth'><Auth/></Route>
      <Route path='/checkout' component={CheckoutBuilder}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/logout' component={Logout}/>
      <Redirect to='/'/>
    </Switch>

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Spinner/>}>
            {routes}  
          </Suspense>
        </Layout>  
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.authReducer.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () =>  dispatch(actionCreators.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
