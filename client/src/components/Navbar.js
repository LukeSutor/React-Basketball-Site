import React, { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import basketball_logo from './images/logo.png'
import hamburger_icon from './images/hamburger_icon.png'
import home from './images/home.png'
import dashboard from './images/dashboard.png'
import upload from './images/upload.png'
import profile from './images/profile.png'
import edit_profile from './images/edit_profiile.png'
import sign_in from './images/sign_in.png'
import log_out from './images/logout.png'
import down_arrow from './images/down_arrow.png'

const Navbar = (props) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <nav>
      <div className="flex justify-between items-center border-gray-100 py-2 md:space-x-4">
        <NavLink to='/' className="h-12 w-48 ml-4 md:ml-8 mt-2">
          <img src={basketball_logo} className="rounded-full" alt="basketball logo" /></NavLink>
        <ul className="hidden md:flex gap-1 justify-end md:w-1 md:flex-1 text-sm text-gray-500 font-medium">
          <NavLink className="px-4 py-2 rounded-full hover:bg-gray-100"
            exact to='/'
            onClick={() => setProfileOpen(false)}
            activeClassName="text-black shadow-inner bg-gray-50">Home</NavLink>
          <NavLink className="px-4 py-2 rounded-full hover:bg-gray-100"
            to='/dashboard'
            onClick={() => setProfileOpen(false)}
            activeClassName="text-black shadow-inner bg-gray-50">Dashboard</NavLink>
          <NavLink className={`px-4 py-2 rounded-full hover:bg-gray-100
            ${isAuthenticated ? "" : "hidden"}`}
            to='/upload'
            onClick={() => setProfileOpen(false)}
            activeClassName="text-black shadow-inner bg-gray-50">Upload</NavLink>
          <NavLink className={`px-4 py-2 rounded-full hover:bg-gray-100
            ${isAuthenticated ? "" : "hidden"}`}
            to='/profile?tab=averages'
            onClick={() => setProfileOpen(false)}
            activeClassName="text-black shadow-inner bg-gray-50">Profile</NavLink>
          <button className={`whitespace-nowrap text-white bg-main hover:bg-dark px-4 py-2 mr-4 rounded-full focus:outline-none
            ${isAuthenticated ? "hidden" : ""}`}
            onClick={() => loginWithRedirect()}>Sign In</button>
          <button className={`flex flex-row text-black font-medium px-4 py-2 mr-4 rounded-full hover:bg-gray-100 focus:outline-none
              ${isAuthenticated ? "" : "hidden"}`}
            onClick={() => setProfileOpen(!profileOpen)}>{`${isAuthenticated ? `${user.name}` : ""}`}
            <img src={`${isAuthenticated ? `${user.picture}` : ""}`} alt="" className="h-6 w-6 mx-1 rounded-full" />
            <img src={down_arrow} alt="" className="h-6 w-6" /></button>
        </ul>

        {/* Hamburger Menu */}

        <div>
          <button className="md:hidden w-9 h-9 align-middle mx-4 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <img src={hamburger_icon} alt="Hamburger Menu" />
          </button>
        </div>
      </div>
      <div className={`absolute z-10 bg-white h-relative w-full ${menuOpen ? "visible" : "hidden"}`}>
        <ul className="flex flex-col gap-2 justify-between px-2 py-4">
          <li className="flex flex-row hover:bg-gray-100 rounded-full">
            <img src={home} alt="" className="h-6 w-6 mx-4 my-auto" />
            <NavLink exact to='/'
              className="py-2 rounded-full hover:bg-gray-100 text-lg"
              activeClassName="underline"
              onClick={() => setMenuOpen(!menuOpen)}>Home</NavLink>
          </li>
          <li className="flex flex-row hover:bg-gray-100 rounded-full">
            <img src={dashboard} alt="" className="h-6 w-6 mx-4 my-auto" />
            <NavLink to='/dashboard'
              className="py-2 rounded-full hover:bg-gray-100 text-lg"
              activeClassName="underline"
              onClick={() => setMenuOpen(!menuOpen)}>Dashboard</NavLink>
          </li>
          <li className={`flex flex-row hover:bg-gray-100 rounded-full
            ${isAuthenticated ? "" : "hidden"}`}>
            <img src={upload} alt="" className="h-6 w-6 mx-4 my-auto" />
            <NavLink to='/upload'
              className="py-2 rounded-full hover:bg-gray-100 text-lg"
              activeClassName="underline"
              onClick={() => setMenuOpen(!menuOpen)}>Upload</NavLink>
          </li>
          <li className={`flex flex-row hover:bg-gray-100 rounded-full
            ${isAuthenticated ? "" : "hidden"}`}>
            <img src={profile} alt="" className="h-6 w-6 mx-4 my-auto" />
            <NavLink to='/profile?tab=averages'
              className="py-2 rounded-full hover:bg-gray-100 text-lg"
              activeClassName="underline"
              onClick={() => setMenuOpen(!menuOpen)}>Profile</NavLink>
          </li>
          <li className={`flex flex-row hover:bg-gray-100 rounded-full
            ${isAuthenticated ? "" : "hidden"}`}>
            <img src={edit_profile} alt="" className="h-6 w-6 mx-4 my-auto" />
            <NavLink to='/edit-profile'
              className="py-2 rounded-full hover:bg-gray-100 text-lg"
              activeClassName="underline"
              onClick={() => setMenuOpen(!menuOpen)}>Edit Profile</NavLink>
          </li>
          <li className={`flex flex-row hover:bg-gray-100 rounded-full
            ${isAuthenticated ? "hidden" : ""}`}>
            <img src={sign_in} alt="" className="h-6 w-6 mx-4 my-auto" />
            <button className="py-2 rounded-full hover:bg-gray-100 text-lg focus:outline-none"
              onClick={() => loginWithRedirect()}>Sign In</button>
          </li>
          <li className={`flex flex-row hover:bg-gray-100 rounded-full
            ${isAuthenticated ? "" : "hidden"}`}>
            <img src={log_out} alt="" className="h-6 w-6 mx-4 my-auto" />
            <button className="py-2 rounded-full hover:bg-gray-100 text-lg focus:outline-none"
              onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
      {/* Dropdown menu for profile icon */}
      <div className={`absolute right-4 z-10  -my-1 bg-white h-relative w-1/6 rounded-lg ring-1 ring-black ring-opacity-5 
          ${profileOpen ? "visible" : "hidden"}`}>
        <div className="flex flex-col text-left text-sm">
          <NavLink to='/edit-profile'
            className={`font-medium px-4 py-2 focus:outline-none
            ${props.location.pathname.includes("/user", 0) ? "hidden" : ""}`}
            onClick={() => setProfileOpen(!profileOpen)}>Edit Profile</NavLink>
          <button className="font-medium px-4 py-1 focus:outline-none text-left"
            onClick={() => logout()}>Logout</button>
          {<NavLink to='/manage'
            className={`text-red-600 font-medium px-4 py-2 focus:outline-none
            ${isAuthenticated ? `${user['https://the-stat-sheet.herokuapp.com/admin'] ? "" : "hidden"}` : ""}`}
            onClick={() => setProfileOpen(!profileOpen)}>Manage</NavLink>}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar)