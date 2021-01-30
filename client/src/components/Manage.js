import React, { Component } from 'react'
import Post from './Post'
import { getItems } from '../actions/itemActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withAuth0 } from '@auth0/auth0-react'

class Manage extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      this.props.auth0.isAuthenticated && this.props.auth0.user['https://the-stat-sheet.herokuapp.com/admin'] && (
        <div>
          <div className="py-4">
            <ul className="flex flex-col items-center">
              {items.map((post) => (
                <Post key={post._id} post={post} deletable={true} />
              ))}
            </ul>
          </div>
        </div>
      )
    );
  }
}

Manage.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps,
  { getItems })(withAuth0(Manage));