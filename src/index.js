import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import RootReducer from './store/rootReducer';

const store = createStore(RootReducer)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
