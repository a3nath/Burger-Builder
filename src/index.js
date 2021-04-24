import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerReducer from './store/burgerReducer';
import orderReducer from './store/orderReducer';

const rootReducer = combineReducers({burger: burgerReducer, order: orderReducer})

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

