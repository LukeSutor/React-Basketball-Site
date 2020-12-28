import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import './App.css';

import { Provider } from 'react-redux';
import store1 from './store1';

function App() {
  return (
    <Provider store={store1}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/upload' component={Upload} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;