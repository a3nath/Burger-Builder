import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutBuilder from './containers/CheckoutBuilder/CheckoutBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Authentication/Auth';
import Logout from './containers/Authentication/Logout/Logout';
import * as actionCreators from './store/actionCreators/index';


class App extends Component {

  componentDidMount() {
    this.props.onLogin()
  }

  
  render () {
  
    let routes = 
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/auth' component={Auth}/>
        <Route path='/checkout' component={CheckoutBuilder}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/logout' component={Logout}/>
        <Redirect to='/'/>
      </Switch>


    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
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
