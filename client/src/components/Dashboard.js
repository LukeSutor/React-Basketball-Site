import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { getItems, getProfiles } from '../actions/itemActions'
import PropTypes from 'prop-types'
import { withAuth0 } from '@auth0/auth0-react'

class Dashboard extends Component {
  state = {
    // email is set to default "lukesutor@gmail.com"
    // this ensures a profile is always retrieved and added to props when dashboard page is loaded, even if user isn't signed in.
    // this fixs bug where users cannot see profiles from other users posts when not logged in.
    email: 'lukesutor@gmail.com'
  }

  UNSAFE_componentWillMount() {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ email: this.props.auth0.user.email })
    }
  }

  componentDidMount() {
    this.props.getItems();
    this.props.getProfiles(this.state.email);
  }

  accountRedirect = () => {
    this.props.history.push('/profile')
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    const { items } = this.props.item;
    const profile = this.props.profile.profiles;
    return (
      <div className="py-4">
        <ul className="flex flex-col items-center">
          <div className={`bg-gray-50 w-3/4 md:w-3/5 lg:w-1/2 text-center my-4 rounded-lg shadow-md overflow-hidden
            ${profile.length === 0 && isAuthenticated ? "visible" : "hidden"}`}>
            <p className="font-medium py-2">We are missing account information such as your name and team.</p>
            <p className="font-medium py-2">Please go <button
              className="font-medium text-main hover:text-dark focus:outline-none"
              onClick={this.accountRedirect}>Here</button> to finish setting up your account.</p>
          </div>
          {items.map((post) => (
            <Post key={post._id} post={post} deletable={false} />
          ))}
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item,
  profile: state.profile
})

export default connect(mapStateToProps,
  { getItems, getProfiles })(withAuth0(Dashboard));