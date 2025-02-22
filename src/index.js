import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';


import {Amplify} from 'aws-amplify';
import {config_userPool, config_storage} from './config_aws';

Amplify.configure(
  {
    Auth: config_userPool,
    Storage: config_storage
  });


ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
