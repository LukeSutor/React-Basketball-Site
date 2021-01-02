import React, { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './images/logo.png'
import home from './images/home.png'
import dashboard from './images/dashboard.png'
import upload from './images/upload.png'
import profile from './images/profile.png'
import sign_in from './images/sign_in.png'
import register from './images/register.png'
import down_arrow from'./images/down_arrow.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  // Return different navbar if user isn't authenticated
  if (!isAuthenticated) {
    return (
      <nav>
        <div className="flex justify-between items-center bg-white shadow border-gray-100 py-2 space-x-4">
          <NavLink to='/' className="h-24 w-24 overflow-hidden rounded-full ml-4 -mb-10 -mt-7">
            <img src={logo} className="rounded-full" alt="basketball logo" /></NavLink>
          <ul className="hidden md:flex justify-start md:w-1 md:flex-1">
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink exact to='/'
                activeClassName="text-main border-b-2 border-main">Home</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/dashboard'
                activeClassName="text-main border-b-2 border-main">Dashboard</NavLink>
            </li>
          </ul>
          <div className="hidden md:flex justify-end w-0 flex-1 px-4">
            <button className="font-medium whitespace-nowrap text-white bg-main hover:bg-dark px-4 py-2 rounded-full focus:outline-none"
              onClick={() => loginWithRedirect()}>Sign In</button>
          </div>
          <div>
            <button className="md:hidden w-9 h-9 align-middle mx-4 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="Hamburger Menu" />
            </button>
          </div>
        </div>
        <div className={`absolute z-10 -my-1 bg-white h-relative w-full ${menuOpen ? "visible" : "hidden"}`}>
          <ul className="flex flex-col gap-3 justify-between px-2 py-4">
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={home} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Home</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={dashboard} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/dashboard'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Dashboard</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={sign_in} alt="" className="h-6 w-6 mx-4 my-auto" />
              <button className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold focus:outline-none"
                onClick={() => loginWithRedirect()}>Sign In</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    isAuthenticated && (
      <nav>
        <div className="flex justify-between bg-white items-center shadow border-gray-100 py-2 md:space-x-4">
          <NavLink to='/' className="h-24 w-24 overflow-hidden rounded-full ml-4 -mb-10 -mt-7">
            <img src={logo} className="rounded-full" alt="basketball logo" /></NavLink>
          <ul className="hidden md:flex justify-start md:w-1 md:flex-1">
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink exact to='/'
                onClick={() => setProfileOpen(false)}
                activeClassName="text-main border-b-2 border-main">Home</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/dashboard'
                onClick={() => setProfileOpen(false)}
                activeClassName="text-main border-b-2 border-main">Dashboard</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
              <NavLink to='/upload'
                onClick={() => setProfileOpen(false)}
                activeClassName="text-main border-b-2 border-main">Upload</NavLink>
            </li>
            <li className="font-medium px-4 py-2 rounded-full hover:bg-gray-100">
                <NavLink to='/profile'
                  onClick={() => setProfileOpen(false)}
                  activeClassName="text-main border-b-2 border-main">Profile</NavLink>
            </li>
          </ul>
          <div className="hidden md:flex justify-end lg:w-0 lg:flex-1">
            <button className="flex flex-row font-medium px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => setProfileOpen(!profileOpen)}>{user.name}
              <img src={down_arrow} alt="" className="h-6 w-6" /></button>
          </div>

          {/* Hamburger Menu */}

          <div>
            <button className="md:hidden w-9 h-9 align-middle mx-4 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="Hamburger Menu" />
            </button>
          </div>
        </div>
        <div className={`absolute z-10 -my-1 bg-white h-relative w-full ${menuOpen ? "visible" : "hidden"}`}>
          <ul className="flex flex-col gap-3 justify-between px-2 py-4">
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={home} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Home</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={dashboard} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/dashboard'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Dashboard</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={upload} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/upload'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Upload</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={profile} alt="" className="h-6 w-6 mx-4 my-auto" />
              <NavLink to='/profile'
                className="py-2 rounded-full hover:bg-gray-100 text-lg{`font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>Profile</NavLink>
            </li>
            <li className="flex flex-row hover:bg-gray-100 rounded-full">
              <img src={register} alt="" className="h-6 w-6 mx-4 my-auto" />
              <button className="py-2 rounded-full hover:bg-gray-100 text-lg font-semibold focus:outline-none"
                onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        </div>
        {/* Dropdown menu for profile icon */}
        <div className={`absolute right-0 z-10  -my-1 bg-white h-relative w-relative rounded-l-lg ring-1 ring-black ring-opacity-5 
          ${profileOpen ? "visible" : "hidden"}`}>
              <NavLink to='/profile' className=" font-medium px-4 pt-2">{user.name} Profile</NavLink>
              <br />
              <button className="font-medium px-4 py-2 focus:outline-none"
              onClick={() => logout()}>Logout</button>
          </div>
      </nav>
    )
  );
};

export default withRouter(Navbar)