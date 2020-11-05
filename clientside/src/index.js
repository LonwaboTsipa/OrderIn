import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider } from 'mobx-react'
import ResturantStore from './stores/ResturantStore'
const Root = (
  <Provider ResturantStore={ResturantStore} >
    <App/>
  </Provider>
);
ReactDOM.render(
  Root,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
