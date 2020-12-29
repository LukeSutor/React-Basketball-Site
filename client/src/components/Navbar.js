import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

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
          <NavLink to='/' className="text-2xl font-medium whitespace-nowrap text-black mx-4 md:ml-4 md:mr:0">Basketball Stats</NavLink>
          <ul className="hidden md:flex justify-start md:w-1 md:flex-1">
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink exact to='/'
              activeClassName="text-purple-500">Home</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/dashboard'
              activeClassName="text-purple-500">Dashboard</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/upload'
              activeClassName="text-purple-500">Upload</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/profile'
              activeClassName="text-purple-500">Profile</NavLink>
            </li>
          </ul>
          <ul className="hidden md:flex justify-end lg:w-0 lg:flex-1">
            <li>
              <NavLink to='/' 
              className="font-medium whitespace-nowrap text-purple-500 hover:text-purple-600 px-4 py-2 border-2 border-purple-500 hover:border-purple-600 rounded-full" 
              activeClassName="text-purple-600 border-purple-600">Sign In</NavLink>
            </li>
            <li>
              <NavLink to='/' className="font-medium whitespace-nowrap text-white ml-4 px-4 py-2 border-transparent rounded-full shadow-sm bg-purple-500 hover:bg-purple-600">Register</NavLink>
            </li>
          </ul>
          <div>
            <button className="md:hidden w-9 h-9 align-middle mx-4" onClick={this.menuClick}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="Hamburger Menu"/>
            </button>
          </div>
        </div>
        <div className={`fixed z-10 -my-1 bg-white h-relative w-full ${ this.state.menuOpen === true ? "visible" : "hidden"}`}>
          <ul className="flex flex-col gap-3 justify-between px-2 py-4">
            <li>
              <NavLink to='/' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/upload' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Upload</NavLink>
            </li>
            <li>
              <NavLink to='/' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Profile</NavLink>
            </li>
            <li>
              <NavLink to='/' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Sign In</NavLink>
            </li>
            <li>
              <NavLink to='/' className="px-2 py-2 rounded-full hover:bg-gray-100 text-lg font-semibold" onClick={this.menuClick}>Register</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
}

export default withRouter(Navbar);