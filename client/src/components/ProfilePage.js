import React, { Component } from 'react';
import { addProfile, getProfiles, getItemsById } from '../actions/itemActions';
import ProfileScreen from './ProfileScreen';
import Post from './Post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAuth0 } from '@auth0/auth0-react';

class ProfilePage extends Component {
  state = {
    firstname: '',
    lastname: '',
    team: '',
    position: '',
    jersey_number: null,
    height_feet: '',
    height_inches: '',
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
            <ProfileScreen key={profile.email} profile={profile} ppg={ppg} apg={apg} rpg={rpg} spg={spg} bpg={bpg} />
          ))}

          {/* Place where all the current user's posts are listed as well as the option to delete them */}
          <div className="w-5/6 md:w-3/4 h-auto mx-auto mt-8 mb-4">
            <p className={`text-5xl
            ${items.length === 0 ? "hidden" : ""}`}>Posts</p>
          </div>
          <ul className="flex flex-col items-center">
            {items.map((post) => (
              <Post key={post._id + post.date} post={post} deletable={true} />
            ))}
          </ul>
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
                  <p className="text-center text-red-600">Warning: Once you create your profile, the information cannot be changed.</p>
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
  { addProfile, getProfiles, getItemsById })(withAuth0(ProfilePage));