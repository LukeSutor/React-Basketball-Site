import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import logo from './images/logo.png'
import home from './images/home.png'
import dashboard from './images/dashboard.png'
import upload from './images/upload.png'
import profile from './images/profile.png'
import sign_in from './images/sign_in.png'
import register from './images/register.png'

class Navbar extends Component {
  state = {
    menuOpen: false
  }

  menuClick = () => {
    const menuOpen = this.state.menuOpen
    this.setState({ menuOpen: !menuOpen })
  }

  render() {
    return(
      <nav>
        <div className="flex justify-between bg-white items-center shadow border-gray-100 py-2 md:space-x-4">
          <NavLink to='/' className="h-24 w-24 overflow-hidden rounded-full ml-4 -mb-10 -mt-7">
            <img src={logo} className="rounded-full" alt="basketball logo"/></NavLink>
          <ul className="hidden md:flex justify-start md:w-1 md:flex-1">
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink exact to='/'
              activeClassName="text-main border-b-2 border-main">Home</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/dashboard'
              activeClassName="text-main border-b-2 border-main">Dashboard</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/upload'
              activeClassName="text-main border-b-2 border-main">Upload</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/profile'
              activeClassName="text-main border-b-2 border-main">Profile</NavLink>
            </li>
          </ul>
          <ul className="hidden md:flex justify-end lg:w-0 lg:flex-1">
            <li>
              <NavLink exact to='/signin' 
              className="font-medium whitespace-nowrap text-main hover:text-dark px-4 py-2 border-2 border-main hover:border-dark rounded-full" 
              activeClassName="text-green-700 border-green-700">Sign In</NavLink>
            </li>
            <li>
              <NavLink exact to='/register' 
              className="font-medium whitespace-nowrap text-white ml-4 px-4 py-2 border-transparent rounded-full shadow-sm bg-main hover:bg-dark"
              activeClassName="bg-green-700">Register</NavLink>
            </li>
          </ul>
          <div>
            <button className="md:hidden w-9 h-9 align-middle mx-4" onClick={this.menuClick}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="Hamburger Menu"/>
            </button>
          </div>
        </div>
        <div className={`absolute z-10 -my-1 bg-white h-relative w-full ${ this.state.menuOpen === true ? "visible" : "hidden"}`}>
          <ul className="flex flex-col gap-3 justify-between px-2 py-4">
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={home} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Home</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={dashboard} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/dashboard' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Dashboard</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={upload} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/upload' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Upload</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={profile} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/profile' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Profile</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={sign_in} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/signin' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Sign In</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={register} alt="" className="h-6 w-6 mx-4 my-auto"/>
              <NavLink to='/register' 
              className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" 
              onClick={this.menuClick}>Register</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
}

export default withRouter(Navbar);