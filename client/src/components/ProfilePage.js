import React, { Component } from 'react'
import { addProfile, getProfiles, getItemsById } from '../actions/itemActions'
import { Link } from 'react-router-dom'
import ProfileScreen from './ProfileScreen'
import Post from './Post'
import Graphs from './Graphs'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withAuth0 } from '@auth0/auth0-react'

class ProfilePage extends Component {
  state = {
    firstname: null,
    lastname: null,
    team: null,
    position: null,
    jersey_number: null,
    height_feet: null,
    height_inches: null,
    weight: null,
    email: '',
    id: ''
  }

  onChange = e => {
    // Set the value of the edited input to the value entered
    this.setState({ [e.target.id]: e.target.value });
  }

  UNSAFE_componentWillMount() {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ email: this.props.auth0.user.email })
      this.setState({ id: this.props.auth0.user.sub })
    }
  }

  componentDidMount() {
    this.props.getProfiles(this.state.email);
    this.props.getItemsById(this.state.id);
  }

  onSubmit = e => {
    e.preventDefault();

    // Create new profile with the input given
    const newProfile = {
      user_id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      team: this.state.team,
      position: this.state.position,
      jersey_number: this.state.jersey_number,
      height_feet: this.state.height_feet,
      height_inches: this.state.height_inches,
      weight: this.state.weight,
      email: this.state.email
    }

    // Add profile to redux
    this.props.addProfile(newProfile)

    // Redirect user to dashboard
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    const profile = this.props.profile.profiles;
    const { items } = this.props.item;
    let posts = 0;
    let ppg = 0;
    let apg = 0;
    let rpg = 0;
    let spg = 0;
    let bpg = 0;
    for (let i = 0; i < items.length; i++) {
      ppg += items[i].points;
      apg += items[i].assists;
      rpg += items[i].rebounds;
      spg += items[i].steals;
      bpg += items[i].blocks;
      posts++
    }
    ppg = Math.round((ppg / posts) * 100) / 100
    apg = Math.round((apg / posts) * 100) / 100
    rpg = Math.round((rpg / posts) * 100) / 100
    spg = Math.round((spg / posts) * 100) / 100
    bpg = Math.round((bpg / posts) * 100) / 100
    return (
      isAuthenticated && (
        <div>
          {/* User's profile page */}
          {profile.map((profile) => (
            <ProfileScreen key={profile.email} profile={profile} />
          ))}

          {/* Navbar to switch between posts and graph of user progress */}
          <div className="flex flex-row justify-around w-3/4 md:w-1/2 mx-auto shadow-lg rounded-full my-8 text-gray-600">
            <Link to='/profile?tab=averages'
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100
              ${this.props.location.search === '?tab=averages' ? "text-black font-semibold shadow-inner" : ""}`}>Averages</Link>
            <Link to='/profile?tab=graph'
              className={`w-1/2 p-4 rounded-full text-md md:text-xl lg:text-3xl text-center hover:bg-gray-100
              ${this.props.location.search === '?tab=graph' ? "text-black font-semibold shadow-inner" : ""}`}>Graph</Link>
            <Link to='/profile?tab=posts'
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
            <Graphs posts={this.props.item.items} id={this.state.id} />
          </div>

          {/* User's posts */}
          <div className={`${this.props.location.search === '?tab=posts' ? "" : "hidden"}`}>
            <ul className="flex flex-col items-center">
              {items.map((post) => (
                <Post key={post._id + post.date} post={post} deletable={true} />
              ))}
            </ul>
          </div>

          {/* Form for users to enter their profile information, hidden once their information is in the api */}
          <div className={`bg-gray-50 w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4
          ${profile.length === 0 ? "visible" : "hidden"}`}>
            <form className="w-full md:w-3/4 mx-auto">
              <div className="py-4">
                <h2 className="text-2xl font-semibold mx-5">Create Profile</h2>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="firstname" placeholder="First Name" onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="lastname" placeholder="Last Name" onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="team" placeholder="Team" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="position" placeholder="Position (ex. Power Forward, PF)" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="jersey_number" placeholder="Jersey Number" onChange={this.onChange} />
                </div>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="height_feet" placeholder="Height (feet)" onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="height_inches" placeholder="Height (inches)" onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="weight" placeholder="Weight" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4">
                  <input className="px-4 w-full h-10 rounded-full shadow-md outline-none text-white bg-main hover:bg-dark"
                    type="button"
                    value="Submit"
                    onClick={this.onSubmit} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
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
  { addProfile, getProfiles, getItemsById })(withAuth0(ProfilePage))