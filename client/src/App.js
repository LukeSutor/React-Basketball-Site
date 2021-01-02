import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import ProfilePage from './components/ProfilePage';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/upload' component={Upload} />
          <Route path='/profile' component={ProfilePage} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;