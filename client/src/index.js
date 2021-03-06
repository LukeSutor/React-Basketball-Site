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
  // Use http://localhost:3000/dashboard when testing code, use https://statbreak.herokuapp.com/dashboard for production
  redirectUri="https://statbreak.herokuapp.com/dashboard">
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
