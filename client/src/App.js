import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Upload from './components/Upload'
import ProfilePage from './components/ProfilePage'
import User from './components/User'
import UpdateProfile from './components/UpdateProfile'
import './App.css'

import { Provider } from 'react-redux'
import store from './store'

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
          <Route path='/user/:name' component={User} />
          <Route path='/update-profile' component={UpdateProfile} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App