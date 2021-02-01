import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProfileScreen from './ProfileScreen'
import Averages from './Averages'
import Graphs from './Graphs'
import Post from './Post'
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
            <Averages posts={this.props.item.items} id={this.state.user_id} />
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