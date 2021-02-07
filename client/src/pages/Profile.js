import React, { useEffect, useState } from 'react'
import { addProfile, getProfiles, getItemsById } from '../actions/itemActions'
import ProfileScreen from './components/ProfileScreen'
import Averages from './components/Averages'
import Graphs from './components/Graphs'
import Post from './components/Post'
import CreateProfile from './components/CreateProfile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { useTransition, animated } from 'react-spring'

function ProfilePage(props) {

  const [id, setId] = useState(null)

  const [email, setEmail] = useState('lukesutor@gmail.com')

  const { isAuthenticated, user } = useAuth0()

  const profile = props.profile.profiles

  const { items } = props.item

  useEffect(() => {
    if(isAuthenticated) {
    setId(user.sub)
    setEmail(user.email)
    }
    // document.title = `${user.name} | Profile`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getProfiles(email)
    if(profile) {
      document.title = `${profile[0].username} | Profile`
    } else {
      document.title = 'Statbreak | Profile'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    props.getItemsById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  // Animation code below

  // Animation and style toggler 0 = averages, 1 = graph, 2 = posts
  const [toggle, setToggle] = useState(0)


  // React Spring transition between averages, graph, and posts
  const profileTransition = useTransition(toggle, null, {
    from: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' }
  })


  return (
    isAuthenticated && (
      <div>
        {console.log(props)}
        <div className={`${profile.length === 0 ? "hidden" : ""}`}>
          {/* User's profile page */}
          {profile.map((profile) => (
            <ProfileScreen key={profile.email} profile={profile} />
          ))}

          {/* Navbar to switch between posts and graph of user progress */}
          <div className="flex flex-row justify-around w-3/4 md:w-1/2 mx-auto shadow-lg rounded-full my-8 text-center text-gray-500">
            <button onClick={() => setToggle(0)}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl hover:bg-gray-100 focus:outline-none
              ${toggle === 0 ? "text-black font-semibold shadow-inner bg-gray-50" : ""}`}>Averages</button>
            <button onClick={() => setToggle(1)}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl hover:bg-gray-100 focus:outline-none
              ${toggle === 1 ? "text-black font-semibold shadow-inner bg-gray-50" : ""}`}>Graph</button>
            <button onClick={() => setToggle(2)}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl hover:bg-gray-100 focus:outline-none
              ${toggle === 2 ? "text-black font-semibold shadow-inner bg-gray-50" : ""}`}>Posts</button>
          </div>

          {/* Transitions between averages, graph, and posts */}
          {profileTransition.map(({ item, key, props }) =>
            item < 2
              ?
              item === 0
                ?
                <animated.div key={key} style={props} className="absolute w-full">
                  <Averages posts={items} id={id} />
                </animated.div>
                :
                <animated.div key={key} style={props} className="absolute w-full">
                  <Graphs posts={items} id={id} />
                </animated.div>

              :
              <ul className="absolute w-full flex flex-col items-center">
                {items.filter(post => post.id === id).map((post) => (
                  <animated.div key={post._id} style={props} className="w-full">
                    <Post key={post._id + post.date} post={post} deletable={true} />
                  </animated.div>
                ))}
              </ul>
          )}
        </div>

        {/* Form for users to create their profile, hidden once their information is in the api */}
        <div className={`bg-gray-50 w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4
          ${profile.length === 0 ? "" : "hidden"}`}>
          <CreateProfile history={props.history} />
        </div>
      </div>
    )
  );
};

ProfilePage.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getItemsById: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  item: state.item
});

export default connect(mapStateToProps,
  { addProfile, getProfiles, getItemsById })(ProfilePage)