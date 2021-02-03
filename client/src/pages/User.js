import React, { useEffect, useState } from 'react'
import ProfileScreen from './components/ProfileScreen'
import Averages from './components/Averages'
import Graphs from './components/Graphs'
import Post from './components/Post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfileById, getProfiles } from '../actions/itemActions'
import { useTransition, animated } from 'react-spring'

function User(props) {

  const [user_id, setUser_id] = useState(null)

  const profile = props.profile.profiles;

  const { items } = props.item;

  useEffect(() => {
    props.getProfileById(props.location.user_id)
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUser_id(props.location.user_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id])

  function checkProfile(post) {
    return post.id === user_id;
  }

  // Animation code

  // Animation and style toggler 0 = averages, 1 = graph, 2 = posts
  const [toggle, setToggle] = useState(0)

  // React Spring transition between averages, graph, and posts
  const profileTransition = useTransition(toggle, null, {
    from: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' }
  })

  return (
    profile[0].user_id === user_id && (
      <div>
        {/* User's profile page */}
        {profile.map((profile) => (
          <ProfileScreen key={profile.email} profile={profile} />
        ))}

        {/* Navbar to switch between averages, posts, and graph of user progress */}
        <div className="flex flex-row justify-around w-3/4 md:w-1/2 mx-auto shadow-lg rounded-full my-8 text-gray-600">
          <button onClick={() => setToggle(0)}
            className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100 focus:outline-none
              ${toggle === 0 ? "text-black font-semibold shadow-inner" : ""}`}>Averages</button>
          <button onClick={() => setToggle(1)}
            className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100 focus:outline-none
              ${toggle === 1 ? "text-black font-semibold shadow-inner" : ""}`}>Graph</button>
          <button onClick={() => setToggle(2)}
            className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100 focus:outline-none
              ${toggle === 2 ? "text-black font-semibold shadow-inner" : ""}`}>Posts</button>
        </div>
        {console.log(toggle)}
        {console.log(props)}

        {/* Transitions between averages, graph, and posts */}
        {profileTransition.map(({ item, key, props }) =>
          item < 2
            ?
            item === 0
              ?
              <animated.div key={key} style={props} className="absolute w-full">
                <Averages posts={items} id={user_id} />
              </animated.div>
              :
              <animated.div key={key} style={props} className="absolute w-full">
                <Graphs posts={items} id={user_id} />
              </animated.div>

            :
            <ul className="absolute w-full flex flex-col items-center">
              {items.filter(post => checkProfile(post)).map((post) => (
                <animated.div key={post._id} style={props} className="w-full">
                  <Post key={post._id + post.date} post={post} deletable={false} />
                </animated.div>
              ))}
            </ul>
        )}
      </div>
    )
  );
}

User.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  item: state.item
})

export default connect(mapStateToProps,
  { getProfileById, getProfiles })(User);