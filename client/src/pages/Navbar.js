import React, { useEffect, useState, useRef } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LogoSVG from './images/LogoSVG'
import hamburger_icon from './images/hamburger_icon.png'
import x_icon from './images/x_icon.png'
import Home from './images/Home.js'
import Dashboard from './images/Dashboard.js'
import Upload from './images/Upload.js'
import Profile from './images/Profile.js'
import EditProfile from './images/EditProfile.js'
import SignIn from './images/SignIn.js'
import Logout from './images/Logout.js'
import down_arrow from './images/down_arrow.png'
import { useTransition, animated } from 'react-spring'

const Navbar = (props) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  // Create references for each menu to track whether the user clicks outside of them to close them
  const menuRef = useRef();

  const profileRef = useRef();

  const { pathname } = props.location

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(e) {
    if (profileRef.current && profileRef.current.contains(e.target)) {
      return;
    }
    setProfileOpen(false);
    if (menuRef.current && menuRef.current.contains(e.target)) {
      return;
    }
    setMenuOpen(false);
  }

  // Toggle for top of page button
  const [pageTop, setPageTop] = useState(false)

  // Toggle for mobile navbar
  const [mobileNav, setMobileNav] = useState(true)

  let prevScrolled = window.pageYOffset;

  function handleScroll() {
    if (window.scrollY > 200) {
      setPageTop(true)
    } else {
      setPageTop(false)
    }

    let currScroll = window.pageYOffset
    if (prevScrolled > currScroll || window.scrollY < 150) {
      setMobileNav(true)
    } else {
      setMobileNav(false)
    }
    prevScrolled = currScroll
  }

  // Mobile menu animation
  const menuTransition = useTransition(menuOpen, null, {
    config: { mass: 1, tension: 200, friction: 30 },
    from: { marginRight: -400 },
    enter: { opacity: 1, marginRight: 0 },
    leave: { opacity: 0 }
  })

  // Scroll to top button animation
  const pageTopTransition = useTransition(pageTop, null, {
    from: { position: 'fixed', bottom: -20, right: 20, zIndex: 10, opacity: 0, marginTop: 100 },
    enter: { position: 'fixed', bottom: 20, right: 20, zIndex: 10, opacity: 1, marginTop: 0 },
    leave: { bottom: -20, opacity: 0 }
  })

  // Mobile navbar Animation
  const mobileNavTransition = useTransition(mobileNav, null, {
    from: { position: 'fixed', marginBottom: -100 },
    enter: { position: 'fixed', marginBottom: 0 },
    leave: { position: 'fixed', marginBottom: -100 }
  })

  // Profile tab animation
  const [profileOpen, setProfileOpen] = useState(false);

  const profileTransition = useTransition(profileOpen, null, {
    from: { marginTop: -200, },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0 }
  })

  return (
    <nav className="relative z-50">
      <div className="z-20 flex justify-between items-center border-gray-100 py-2 md:space-x-4">
        <NavLink to='/'
          className="h-min w-min ml-4 lg:ml-8 mt-2">
          <LogoSVG /></NavLink>
        <ul className="hidden md:flex gap-1 justify-end md:w-1 md:flex-1 text-sm text-gray-500 font-medium">
          <NavLink className="px-4 py-2 rounded-full hover:bg-gray-100 hover:bg-opacity-50"
            exact to='/'
            activeClassName="text-black shadow-inner bg-gray-50">Home</NavLink>
          <NavLink className="px-4 py-2 rounded-full hover:bg-gray-100 hover:bg-opacity-50"
            to='/dashboard'
            activeClassName="text-black shadow-inner bg-gray-50">Dashboard</NavLink>
          <NavLink className={`px-4 py-2 rounded-full hover:bg-gray-100 hover:bg-opacity-50
            ${isAuthenticated ? "" : "hidden"}`}
            to='/upload'
            activeClassName="text-black shadow-inner bg-gray-50">Upload</NavLink>
          <NavLink className={`px-4 py-2 rounded-full hover:bg-gray-100 hover:bg-opacity-50
            ${isAuthenticated ? "" : "hidden"}`}
            to='/profile'
            activeClassName="text-black shadow-inner bg-gray-50">Profile</NavLink>
          <button className={`whitespace-nowrap text-white bg-main hover:bg-dark px-4 py-2 mr-4 rounded-full focus:outline-none
            ${isAuthenticated ? "hidden" : ""}`}
            onClick={() => loginWithRedirect()}>Sign In</button>
          <button className={`flex flex-row text-black font-medium px-4 py-2 mr-4 rounded-full hover:bg-gray-100 hover:bg-opacity-50 focus:outline-none
              ${isAuthenticated ? "" : "hidden"}`}
            onClick={() => setProfileOpen(!profileOpen)}>{`${isAuthenticated ? `${user.name}` : ""}`}
            <img src={`${isAuthenticated ? `${user.picture}` : ""}`} alt="" className="h-6 w-6 mx-1 rounded-full" />
            <img src={down_arrow} alt="" className={`h-6 w-6 ${profileOpen ? "transform rotate-180" : ""}`} /></button>
        </ul>

        {/* Hamburger Menu */}
        <div>
          <button className="md:hidden w-9 h-9 align-middle mx-4 focus:outline-none" onClick={() => setMenuOpen(true)}>
            <img src={hamburger_icon} alt="Hamburger Menu" />
          </button>
        </div>
      </div>
      {menuTransition.map(({ item, key, props }) =>
        item &&
        <animated.div style={props} key={key} ref={menuRef} className="absolute z-10 text-gray-500 text-lg bg-white h-relative w-3/4 right-0 top-0">
          <ul className="flex flex-col gap-2 justify-between px-2 py-4">
            <img src={x_icon} alt="close" className="w-6 h-6 ml-auto mr-4 mb-6 align-middle focus:outline-none" onClick={() => setMenuOpen(false)} />
            <NavLink exact to='/'
              className="flex flex-row py-2 px-4 rounded-full hover:bg-gray-100"
              activeClassName="text-black bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="mr-4 my-auto"><Home color={`${pathname === '/' ? "#3baac5" : "#9ca3af"}`} /></div>Home</NavLink>
            <NavLink to='/dashboard'
              className="flex flex-row py-2 px-4 rounded-full hover:bg-gray-100"
              activeClassName="text-black bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="mr-4 my-auto"><Dashboard color={`${pathname === '/dashboard' ? "#3baac5" : "#9ca3af"}`} /></div>Dashboard</NavLink>
            <NavLink to='/upload'
              className={`flex flex-row py-2 px-4 rounded-full hover:bg-gray-100
              ${isAuthenticated ? "" : "hidden"}`}
              activeClassName="text-black bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="mr-4 my-auto"><Upload color={`${pathname === '/upload' ? "#3baac5" : "#9ca3af"}`} /></div>Upload</NavLink>
            <NavLink to='/profile'
              className={`flex flex-row py-2 px-4 rounded-full hover:bg-gray-100
              ${isAuthenticated ? "" : "hidden"}`}
              activeClassName="text-black bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="mr-4 my-auto"><Profile color={`${pathname === '/profile' ? "#3baac5" : "#9ca3af"}`} /></div>Profile</NavLink>
            <NavLink to='/edit-profile'
              className={`flex flex-row py-2 px-4 rounded-full hover:bg-gray-100
              ${isAuthenticated ? "" : "hidden"}`}
              activeClassName="text-black bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="mr-4 my-auto"><EditProfile color={`${pathname === '/edit-profile' ? "#3baac5" : "#9ca3af"}`} /></div>Edit Profile</NavLink>
            <button onClick={() => loginWithRedirect()}
              className={`flex flex-row py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none
              ${isAuthenticated ? "hidden" : ""}`}>
              <div className="mr-4 my-auto"><SignIn color="#9ca3af" /></div>Sign In</button>
            <button onClick={() => logout()}
              className={`flex flex-row py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none
              ${isAuthenticated ? "" : "hidden"}`}>
              <div className="mr-4 my-auto"><Logout color="#9ca3af" /></div>Logout</button>
          </ul>
        </animated.div>
      )}

      {/* Mini navbar for mobile devices */}
      {mobileNavTransition.map(({ item, key, props }) =>
        item &&
        <animated.div key={key} style={props} className="md:hidden fixed bottom-0 h-relative w-full z-10 text-gray-500 text-sm text-center overflow-hidden bg-white border-t-2 border-gray-100">
          <div className="flex flex-row justify-evenly">
            <NavLink exact to='/'
              className={`flex flex-col py-2 w-full
            ${isAuthenticated ? "hidden" : ""}`}
              activeClassName="bg-gray-100 text-black">
              <Home color={`${pathname === '/' ? "#3baac5" : "#9ca3af"}`} />Home</NavLink>
            <NavLink to='/dashboard'
              className="flex flex-col py-2 w-full"
              activeClassName="bg-gray-100 text-black">
              <Dashboard color={`${pathname === '/dashboard' ? "#3baac5" : "#9ca3af"}`} />Dashboard</NavLink>
            <NavLink to='/upload'
              className={`flex flex-col py-2 w-full
            ${isAuthenticated ? "" : "hidden"}`}
              activeClassName="bg-gray-100 text-black">
              <Upload color={`${pathname === '/upload' ? "#3baac5" : "#9ca3af"}`} />Upload</NavLink>
            <NavLink to='/profile'
              className={`flex flex-col py-2 w-full
            ${isAuthenticated ? "" : "hidden"}`}
              activeClassName="bg-gray-100 text-black">
              <Profile color={`${pathname === '/profile' ? "#3baac5" : "#9ca3af"}`} />Profile</NavLink>
            <li onClick={(() => loginWithRedirect())}
              className={`flex flex-col w-full mx-auto py-2 focus:outline-none
            ${isAuthenticated ? "hidden" : ""}`}>
              <SignIn color="#9ca3af" />
              <button className="focus:outline-none">Sign In</button>
            </li>
          </div>
        </animated.div>
      )
      }

      {/* Dropdown menu for profile */}
      {
        profileTransition.map(({ item, key, props }) =>
          item &&
          <animated.div ref={profileRef} key={key} style={props} className={`absolute z-10 right-8 -my-4 bg-white h-relative w-1/6 rounded-lg ring-1 ring-black ring-opacity-5 
              ${isAuthenticated ? "" : "hidden"}`}>
            <div className="flex flex-col text-left text-sm">
              <NavLink to='/edit-profile'
                className="font-medium px-4 py-2 focus:outline-none" // Used to have check if user was on another user's profile and hide it
                onClick={() => setProfileOpen(!profileOpen)}>Edit Profile</NavLink>
              <button className="font-medium px-4 py-1 focus:outline-none text-left"
                onClick={() => logout()}>Logout</button>
              {<NavLink to='/manage'
                className={`text-red-600 font-medium px-4 py-2 focus:outline-none
                  ${isAuthenticated ? `${user['https://statbreak.herokuapp.com/admin'] ? "" : "hidden"}` : ""}`}
                onClick={() => setProfileOpen(!profileOpen)}>Manage</NavLink>}
            </div>
          </animated.div>
        )
      }

      {/* Button to travel back to the top of the page */}
      {
        pageTopTransition.map(({ item, key, props }) =>
          item &&
          <animated.div key={key} style={props}>
            <button onClick={() => window.scrollTo(0, 0)}
              className="text-white py-2 px-4 rounded-full bg-main shadow-2xl focus:outline-none">Top</button>
          </animated.div>
        )
      }
    </nav >
  );
};

export default withRouter(Navbar)