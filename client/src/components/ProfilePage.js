import React, { Component } from 'react'
import { addProfile, getProfiles, getItemsById } from '../actions/itemActions';
import Post from './Post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAuth0 } from '@auth0/auth0-react';
import jersey from './images/jersey.jpg';

class ProfilePage extends Component {
  state = {
    firstname: '',
    lastname: '',
    team: '',
    position: '',
    jerseyNumber: null,
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
    this.setState({ email: this.props.auth0.user.email })
    this.setState({ id: this.props.auth0.user.sub })
  }

  componentDidMount() {
    this.props.getProfiles(this.state.email);
    this.props.getItemsById(this.state.id);
  }

  onSubmit = e => {
    e.preventDefault();

    // Create new profile with the input given
    const newProfile = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      team: this.state.team,
      position: this.state.position,
      jerseyNumber: this.state.jerseyNumber,
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
    return (
      isAuthenticated && (
        <div>
          {/* User's profile page */}
          <div className="bg-white w-5/6 md:w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
            {profile.map(({ firstname, lastname, team, position, jerseyNumber, height_feet, height_inches, weight, email }) => (
              <div key={email} className="w-2/3 py-4 mx-auto">
                <div className="flex justify-between">
                  <div className ="pt-8 pb-4 w-1/4">
                    <p className="font-semibold text-xl md:text-3xl lg:text-5xl">{firstname}</p>
                    <p className="font-semibold text-xl md:text-3xl lg:text-5xl">{lastname}</p>
                  </div>
                  <div className="pt-4 w-1/4 h-1/4">
                    <img src={jersey} className="relative" alt="" />
                    <div className="absolute w-full top-28 md:top-32 lg:top-1/4 -left-0">
                      <p className="text-main text-center text-xs md:text-lg lg:text-xl font-bold">{lastname}</p>
                      <p className="text-main text-center text-xl md:text-3xl lg:text-5xl font-bold pt-0 md:pt-2 lg:pt-4">{jerseyNumber}</p>
                    </div>
                  </div>
                  <div className ="pt-8 pb-4 w-1/4">
                    <p className="font-medium text-sm md:text-md lg:text-lg text-gray-600 pt-4 text-center">{team}</p>
                    <p className="font-medium text-sm md:text-md lg:text-lg text-gray-600 py-4 text-center">{position}</p>
                  </div>
                </div>
                <div className="flex justify-evenly py-8">
                  <div className="w-24">
                    <p className="text-center text-sm md:text-lg text-gray-600 py-1">Height</p>
                    <hr className="w-3/4 mx-auto py-1" />
                    <div className="flex justify-evenly">
                      <div className="text-center text-main text-sm md:text-lg font-semibold inline-flex">{height_feet} 
                      <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 mx-1 mt-1">ft</p> {height_inches} 
                      <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 ml-1 mt-1">in</p></div>
                    </div>
                  </div>
                  <div className="w-24">
                    <p className="text-center text-sm md:text-lg text-gray-600 py-1">Weight</p>
                    <hr className="w-3/4 mx-auto py-1" />
                    <div className="flex justify-evenly">
                      <div className="text-center text-main text-sm md:text-lg font-semibold inline-flex">{weight} 
                      <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 ml-1 mt-1">lbs</p></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Place where all the current user's posts are listed as well as the option to delete them */}
          <div className="w-5/6 md:w-3/4 h-auto mx-auto mt-8 mb-4">
            <p className="text-5xl">Posts</p>
          </div>
          <ul className="flex flex-col items-center">
          {items.map((post) => (
            <Post key={post._id} post={post} deletable={true}/>
          ))}
          </ul>
          {/* Form for users to enter their profile information, hidden once their information is in the api */}
          <div className={`bg-white w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4
          ${profile.length === 0 ? "visible" : "hidden"}`}>
            <form className="w-full md:w-3/4 mx-auto">
              <div className="py-4">
                <h2 className="text-2xl font-semibold mx-5">Create Profile</h2>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="px-4 w-full outline-none h-10" type="text" id="firstname" placeholder="First Name" onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="px-4 w-full outline-none h-10" type="text" id="lastname" placeholder="Last Name" onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="text" id="team" placeholder="Team" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="text" id="position" placeholder="Position (ex. Power Forward, PF)" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="jerseyNumber" placeholder="Jersey Number" onChange={this.onChange} />
                </div>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="px-4 w-full outline-none h-10" type="number" id="height_feet" placeholder="Height (feet)" onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="px-4 w-full outline-none h-10" type="number" id="height_inches" placeholder="Height (inches)" onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="weight" placeholder="Weight" onChange={this.onChange} />
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