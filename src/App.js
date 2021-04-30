import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutBuilder from './containers/CheckoutBuilder/CheckoutBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Authentication/Auth';
import Logout from './containers/Authentication/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators/index';


class App extends Component {

  componentDidMount() {
    this.props.onLogin()
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path='/' component={BurgerBuilder} />
              <Route path='/checkout' component={CheckoutBuilder}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/logout' component={Logout}/>
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () =>  dispatch(actionCreators.autoLogin())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
