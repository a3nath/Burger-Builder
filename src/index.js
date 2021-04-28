import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';
import burgerReducer from './store/reducers/burgerReducer';
import orderReducer from './store/reducers/orderReducer';

const rootReducer = combineReducers({burgerBuilder: burgerReducer, orderBuilder: orderReducer})

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

