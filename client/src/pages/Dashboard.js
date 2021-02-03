import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './components/Post'
import { connect } from 'react-redux'
import { getItems, getProfiles } from '../actions/itemActions'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { useTransition, animated } from 'react-spring'

function Dashboard(props) {
  // email is set to default "lukesutor@gmail.com"
  // this ensures a profile is always retrieved and added to props when dashboard page is loaded, even if user isn't signed in.
  // this fixs bug where users cannot see profiles from other users posts when not logged in.
  const [email, setEmail] = useState('lukesutor@gmail.com')

  const { isAuthenticated, user } = useAuth0()

  const { items } = props.item

  const profile = props.profile.profiles

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user.email)
    }
    props.getItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getProfiles(email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  // React Spring transition for posts
  const postTransition = useTransition(items, item => item._id, {
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  })

  return (
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