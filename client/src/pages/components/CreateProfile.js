import React, { Component } from 'react'
import { addProfile } from '../../actions/itemActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withAuth0 } from '@auth0/auth0-react'

class CreateProfile extends Component {
  state = {
    username: null,
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

  UNSAFE_componentWillMount() {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ email: this.props.auth0.user.email })
      this.setState({ id: this.props.auth0.user.sub })
    }
  }

  onChange = e => {
    // Set the value of the edited input to the value entered
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    // Create new profile with the input given
    const newProfile = {
      username: this.state.username,
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

    return (
      <div>
        <form className="w-full md:w-3/4 mx-auto">
          <div className="py-4">
            <h2 className="text-2xl font-semibold mx-5">Create Profile</h2>
            <div className="mx-4 my-4 rounded-full shadow-md overflow-hidden">
              <input className="bg-gray-50 px-4 w-full outline-none h-10" type="text" id="username" placeholder="Username" onChange={this.onChange} />
            </div>
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
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps,
  { addProfile })(withAuth0(CreateProfile))