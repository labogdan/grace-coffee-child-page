import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const el = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <App
        beneficiary_id={el.getAttribute('data-beneficiary-id')}
        first_name={el.getAttribute('first_name')}
        last_name={el.getAttribute('last_name')}
    />
  </React.StrictMode>, el
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
