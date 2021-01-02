import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { withAuth0 } from '@auth0/auth0-react';

class Upload extends Component {
  getInitialState() {
    let email = this.props.auth0.user.email
    return{
      profileName: '',
      team: '',
      email: email
    }
  }

  state = {
    email: this.getInitialState.email,
    name: '',
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    redirect: false
  }

  componentWillMount() {
    this.setState({email: this.props.auth0.user.email})
  }

  onChange = e => {
    // Set the value of the edited input to the value entered
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    // Create a new post with the params added
    const newPost = {
      name: this.state.name,
      points: this.state.points,
      assists: this.state.assists,
      rebounds: this.state.rebounds,
      steals: this.state.steals,
      blocks: this.state.blocks
    }

    // Add item to redux
    this.props.addItem(newPost)

    // Redirect user to dashboard
    this.props.history.push('/dashboard')
  }

  accountRedirect = () => {
    this.props.history.push('/profile')
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    const profile = this.props.profile.profiles;
    return (
      isAuthenticated && (
        <div>
          {/* Information box asking user to finish setting up their account, hidden if their account is set up */}
          <div className={`bg-white w-3/4 md:w-3/5 lg:w-1/2 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4 text-center
          ${profile.length === 0 ? "" : "hidden"}`}>
            <p className="font-medium py-2">Before you post your stats, your profile must be finalized.</p>
            <p className="font-medium py-2">Please go <button 
            className="font-medium text-main hover:text-dark focus:outline-none"
            onClick={this.accountRedirect}>Here</button> to finish setting up your account.</p>
          </div>

          {/* Form allowing user to enter their stats, hidden if the user hasn't finalized their account */}
          <div className={`bg-white w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4
          ${profile.length === 0? "hidden" : ""}`}>
            <form className="w-full md:w-3/4 mx-auto">
              <div className="py-4">
                <h2 className="text-2xl font-semibold mx-5">Upload</h2>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="text" id="name" placeholder="Name" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="points" placeholder="Points" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="assists" placeholder="Assists" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="rebounds" placeholder="Rebounds" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="steals" placeholder="Steals" onChange={this.onChange} />
                </div>
                <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                  <input className="px-4 w-full outline-none h-10" type="number" id="blocks" placeholder="Blocks" onChange={this.onChange} />
                </div>
                <hr className="w-5/6 mx-auto" />
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
}

Upload.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item,
  profile: state.profile
});

export default connect(mapStateToProps, { addItem })(withAuth0(Upload));