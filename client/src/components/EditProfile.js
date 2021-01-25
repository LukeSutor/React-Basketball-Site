import React, { Component } from 'react'
import { getProfiles, deleteProfile, addProfile } from '../actions/itemActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withAuth0 } from '@auth0/auth0-react'

class EditProfile extends Component {
  state = {
    firstname: this.props.profile.profiles[0].firstname,
    lastname: this.props.profile.profiles[0].lastname,
    team: this.props.profile.profiles[0].team,
    position: this.props.profile.profiles[0].position,
    jersey_number: this.props.profile.profiles[0].jersey_number,
    height_feet: this.props.profile.profiles[0].height_feet,
    height_inches: this.props.profile.profiles[0].height_inches,
    weight: this.props.profile.profiles[0].weight,
    email: '',
    id: ''
  }

  UNSAFE_componentWillMount() {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ email: this.props.auth0.user.email })
      this.setState({ id: this.props.auth0.user.sub })
    }
  }

  componentDidMount() {
    this.props.getProfiles(this.state.email)
    this.setState({})
  }

  onChange = e => {
    // Set the value of the edited input to the value entered
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault()

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

    // Delete current profile
    this.props.deleteProfile(this.props.profile.profiles[0]._id)

    // Create new profile
    this.props.addProfile(newProfile)

    // Redirect to home page
    this.props.history.push('/')
  }

  render() {
    return (
        <div>
          <div className="bg-gray-50 w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
            <form className="w-full md:w-3/4 mx-auto">
              <div className="py-4">
                <h2 className="text-2xl font-semibold mx-5">Edit Profile</h2>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="firstname" value={this.state.firstname} onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="lastname" value={this.state.lastname} onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="team" value={this.state.team} onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="position" value={this.state.position} onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="jersey_number" value={this.state.jersey_number} onChange={this.onChange} />
                </div>
                <div className="my-4 flex justify-between">
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="height_feet" value={this.state.height_feet} onChange={this.onChange} />
                  </div>
                  <div className="mx-4 w-1/2 rounded-full shadow-md overflow-hidden">
                    <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="height_inches" value={this.state.height_inches} onChange={this.onChange} />
                  </div>
                </div>
                <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
                  <input className="bg-gray-50 px-4 w-full outline-none h-10" type="number" id="weight" value={this.state.weight} onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4">
                  <input className="px-4 w-full h-10 rounded-full shadow-md outline-none text-white bg-main hover:bg-dark"
                    type="button"
                    value="Update"
                    onClick={this.onSubmit} />
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

EditProfile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps,
  { getProfiles, deleteProfile, addProfile })(withAuth0(EditProfile));