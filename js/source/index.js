import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import SystemReducer from './reducers/all'

import App from './App';

// This main file implements redux store for all app

const store = createStore(
  SystemReducer,
  compose(applyMiddleware(thunk), // compose due to createStore parameters
    window.devToolsExtension && window.devToolsExtension()),
);

// dispatch some initial action
// store.dispatch({ type: 'INCREMENT' })

ReactDOM.render(
  <div> 
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('container')
);
