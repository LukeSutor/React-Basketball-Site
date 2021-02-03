import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import ProfilePage from './pages/Profile'
import User from './pages/User'
import EditProfile from './pages/EditProfile'
import Manage from './pages/Manage'
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
          <Route path='/edit-profile' component={EditProfile} />
          <Route path='/manage' component={Manage} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App