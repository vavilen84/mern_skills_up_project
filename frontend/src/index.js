import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/layout/app/App';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import {rootReducer} from './reducers';
import {Provider} from 'react-redux';

// Note: this API requires redux@>=3.1.0
const store = createStore(
    combineReducers({rootReducer}),
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  ,
  document.getElementById('root')
);
