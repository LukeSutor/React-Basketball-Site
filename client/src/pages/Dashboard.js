import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './components/Post'
import { connect } from 'react-redux'
import { getItems, getProfiles } from '../actions/itemActions'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { useTransition, animated } from 'react-spring'
import down_arrow from './images/down_arrow.png'
import x_icon from './images/x_icon.png'

function Dashboard(props) {
  // email is set to default "lukesutor@gmail.com"
  // this ensures a profile is always retrieved and added to props when dashboard page is loaded, even if user isn't signed in.
  // this fixs bug where users cannot see profiles from other users posts when not logged in.
  const [email, setEmail] = useState('lukesutor@gmail.com')

  const [sort, setSort] = useState(0)

  const [showSort, setShowSort] = useState(false);

  const { isAuthenticated, user } = useAuth0()

  const { items } = props.item

  const profile = props.profile.profiles

  const sortRef = useRef();

  // : (a.color === b.color) ? ((a.name > b.name) ?
  // 1 : -1)

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user.email)
    }
    props.getItems()
    document.title = 'Statbreak | Dashboard'

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getProfiles(email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  function handleClick(e) {
    if (sortRef.current && sortRef.current.contains(e.target)) {
      return;
    }
    setShowSort(false)
  }

  switch (sort) {
    case 0:
      items.sort((a, b) => (a.date <= b.date) ? 1 : -1)
      break;
    case 1:
      items.sort((a, b) => (a.name >= b.name) ? 1 : -1)
      break;
    case 2:
      items.sort((a, b) => (a.points <= b.points) ? 1 : -1)
      break;
    case 3:
      items.sort((a, b) => (a.assists <= b.assists) ? 1 : -1)
      break;
    case 4:
      items.sort((a, b) => (a.rebounds <= b.rebounds) ? 1 : -1)
      break;
    case 5:
      items.sort((a, b) => (a.steals <= b.steals) ? 1 : -1)
      break;
    case 6:
      items.sort((a, b) => (a.blocks <= b.blocks) ? 1 : -1)
      break;
    default:
      items.sort((a, b) => (a.date <= b.date) ? 1 : -1)
      break;
  }

  // React Spring transition for posts
  const postTransition = useTransition(items, item => item._id, {
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  })

  // React Spring transition for sort
  const sortTransition = useTransition(showSort, null, {
    from: { transform: 'translate3d(-100%, 0, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(-100%, 0, 0)' }
  })

  return (
    <div>
      <div className="fixed z-20 left-0 mt-20 inline-flex">
        <button onClick={() => setShowSort(true)}
          className="transform rotate-90 -ml-5 px-2 py-1 inline-flex rounded-t-lg bg-gray-200 bg-opacity-50 hover:bg-opacity-100 focus:outline-none">
          <img src={down_arrow} alt="" className="w-3 h-3 mr-2 my-auto transform rotate-180" />Filter</button>
        {sortTransition.map(({ item, key, props }) =>
          item &&
          <animated.div key={key} style={props} ref={sortRef} className="fixed z-20 w-2/5 md:w-1/4 lg:w-1/5 -mt-5 bg-gray-100 rounded-r-lg shadow-md">
            <div className="flex flex-row justify-around">
              <p className="text-xl md:text-2xl pb-2 font-semibold">Sort By</p>
              <img src={x_icon} alt="close" className="h-3 md:h-4 w-3 md:w-4 my-auto" onClick={() => setShowSort(false)} />
            </div>
            <div className="flex flex-row">
              <div className="w-full" />
              <div className="flex flex-col text-left w-min transform">
                <button onClick={() => setSort(0)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 0 ? "bg-main text-white hover:bg-main" : ""}`}>Date</button>
                <button onClick={() => setSort(1)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 1 ? "bg-main text-white hover:bg-main" : ""}`}>Name</button>
                <button onClick={() => setSort(2)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 2 ? "bg-main text-white hover:bg-main" : ""}`}>Points</button>
                <button onClick={() => setSort(3)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 3 ? "bg-main text-white hover:bg-main" : ""}`}>Assists</button>
                <button onClick={() => setSort(4)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 4 ? "bg-main text-white hover:bg-main" : ""}`}>Rebounds</button>
                <button onClick={() => setSort(5)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 5 ? "bg-main text-white hover:bg-main" : ""}`}>Steals</button>
                <button onClick={() => setSort(6)}
                  className={`text-base md:text-lg w-min my-1 py-1 px-4 rounded-full hover:bg-gray-200 focus:outline-none
          ${sort === 6 ? "bg-main text-white hover:bg-main" : ""}`}>Blocks</button>
              </div>
              <div className="w-full" />
            </div>
          </animated.div>
        )}
      </div>
      <div className="py-4">
        <ul className="flex flex-col items-center">
          <div className={`bg-gray-50 w-3/4 md:w-3/5 lg:w-1/2 text-center my-4 rounded-lg shadow-md overflow-hidden
            ${profile.length === 0 && isAuthenticated ? "visible" : "hidden"}`}>
            <p className="font-medium py-2">We are missing account information such as your name and team.</p>
            <p className="font-medium py-2">Please go <Link
              to='/profile'
              className="font-medium text-main hover:text-dark focus:outline-none"
            >Here</Link> to finish setting up your account.</p>
          </div>
          {postTransition.map(({ item, key, props }) => (
            <animated.div key={key} style={props} className="w-full">
              <Post post={item} deletable={false} />
            </animated.div>
          ))}
        </ul>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item,
  profile: state.profile
})

export default connect(mapStateToProps,
  { getItems, getProfiles })(Dashboard);