import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProfileScreen from './ProfileScreen'
import Post from './Post'
import Graphs from './Graphs'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfileById, getProfiles } from '../actions/itemActions'
import { withAuth0 } from '@auth0/auth0-react'

class User extends Component {
  state = {
    name: null,
    user_id: null,
    email: null
  }

  UNSAFE_componentWillMount() {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ email: this.props.auth0.user.email })
    }
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.name })
    this.setState({ user_id: this.props.location.user_id })
    this.props.getProfileById(this.props.location.user_id)
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    if (this.props.auth0.isAuthenticated) {
      this.props.getProfiles(this.state.email)
    }
  }

  checkProfile = (post) => {
    return post.id === this.state.user_id;
  }

  render() {
    const profile = this.props.profile.profiles;
    const { items } = this.props.item;
    const user_posts = items.filter(post => this.checkProfile(post))
    let posts = 0;
    let ppg = 0;
    let apg = 0;
    let rpg = 0;
    let spg = 0;
    let bpg = 0;
    for (let i = 0; i < user_posts.length; i++) {
      ppg += user_posts[i].points;
      apg += user_posts[i].assists;
      rpg += user_posts[i].rebounds;
      spg += user_posts[i].steals;
      bpg += user_posts[i].blocks;
      posts++
    }
    ppg = Math.round((ppg / posts) * 100) / 100
    apg = Math.round((apg / posts) * 100) / 100
    rpg = Math.round((rpg / posts) * 100) / 100
    spg = Math.round((spg / posts) * 100) / 100
    bpg = Math.round((bpg / posts) * 100) / 100
    // profile[0].user_id === this.state.user_id
    return (
      profile[0].user_id === this.state.user_id && (
        <div>
          {/* User's profile page */}
          {profile.map((profile) => (
            <ProfileScreen key={profile.email} profile={profile} />
          ))}

          {/* Navbar to switch between posts and graph of user progress */}
          <div className="flex flex-row justify-around w-3/4 md:w-1/2 mx-auto shadow-lg rounded-full my-8 text-gray-600">
            <Link to={`/user/${this.props.match.params.name}?tab=averages`}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100
              ${this.props.location.search === '?tab=averages' ? "text-black font-semibold shadow-inner" : ""}`}>Averages</Link>
            <Link to={`/user/${this.props.match.params.name}?tab=graph`}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100
              ${this.props.location.search === '?tab=graph' ? "text-black font-semibold shadow-inner" : ""}`}>Graph</Link>
            <Link to={`/user/${this.props.match.params.name}?tab=posts`}
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100
              ${this.props.location.search === '?tab=posts' ? "text-black font-semibold shadow-inner" : ""}`}>Posts</Link>
          </div>

          {/* User's averages */}
          <div className={`${this.props.location.search === '?tab=averages' ? "" : "hidden"}`}>
            <div className="flex justify-evenly flex-wrap">
              <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
                <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">PPG</p>
                <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{ppg}</p>
              </div>
              <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
                <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">APG</p>
                <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{apg}</p>
              </div>
              <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
                <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">RPG</p>
                <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{rpg}</p>
              </div>
              <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
                <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">SPG</p>
                <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{spg}</p>
              </div>
              <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
                <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">BPG</p>
                <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{bpg}</p>
              </div>
            </div>
          </div>

          {/* User's stat graph */}
          <div className={`${this.props.location.search === '?tab=graph' ? "" : "h-0 overflow-hidden"}`}>
            <Graphs posts={this.props.item.items} id={this.state.user_id} />
          </div>

          <ul className={`flex flex-col items-center
          ${this.props.location.search === '?tab=posts' ? "" : "hidden"}`}>
            {/* Filter through all posts to check if the post id matches the profile id of the profile shown on screen
                Then, map through those posts and show them. */}
            {items.filter(post => this.checkProfile(post))
              .map((post) => (
                <Post key={post._id + post.date} post={post} deletable={false} />
              ))}
          </ul>
        </div>
      )
    );
  }
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
  { getProfileById, getProfiles })(withAuth0(User));