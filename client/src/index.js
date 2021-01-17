import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/main.css';

ReactDOM.render(
  <Auth0Provider
  domain="dev-hcy8y0so.us.auth0.com"
  clientId="CBBTcAiRUoGsp5D2Yb8eF8tntjKR3NCL"
  // Use http://localhost:3000/ when testing code, use https://the-stat-sheet.herokuapp.com/ for production
  redirectUri="http://localhost:3000/">
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
