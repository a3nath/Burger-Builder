import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutBuilder from './containers/CheckoutBuilder/CheckoutBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Authentication/Auth';
import Logout from './containers/Authentication/logout/Logout';

class App extends Component {
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

export default App;
