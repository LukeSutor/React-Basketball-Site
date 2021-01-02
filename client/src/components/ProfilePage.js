import React, { Component } from 'react'
import { addProfile, getProfiles } from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAuth0 } from '@auth0/auth0-react';

class ProfilePage extends Component {
  getInitialState() {
    let email = this.props.auth0.user.email
    return{
      profileName: '',
      team: '',
      email: email
    }
  }
  
  state = {
    profileName: '',
    team: '',
    email: this.getInitialState.email
  }

  onChange = e => {
    // Set the value of the edited input to the value entered
    this.setState({ [e.target.id]: e.target.value });
  }

  componentWillMount() {
    this.setState({email: this.props.auth0.user.email})
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  onSubmit = e => {
    e.preventDefault();

    // Create new profile with the input given
    const newProfile = {
      profileName: this.state.profileName,
      team: this.state.team,
      email: this.state.email
    }

    // Add profile to redux
    this.props.addProfile(newProfile)

    // Redirect user to dashboard
    this.props.history.push('/dashboard')
  }
  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log(this.props)
    return (
      isAuthenticated && (
        <div>
          <div className="bg-white w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
            <div className="w-2/3 py-4 mx-auto">
              <p className="font-medium">Welcome,</p>
            </div>
          </div>
          <div className="bg-white w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
            <form className="w-full md:w-3/4 mx-auto">
              <div className="py-4">
                <h2 className="text-2xl font-semibold mx-5">Profile</h2>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="text" id="profileName" placeholder="Name" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="text" id="team" placeholder="Team" onChange={this.onChange} />
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
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, 
  { addProfile, getProfiles })(withAuth0(ProfilePage));