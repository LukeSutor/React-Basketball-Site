import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import Post from './Post';
import PropTypes from 'prop-types';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return(
      <div className="py-4">
        <ul className="flex flex-col items-center">
          {items.map(( post ) => (
            <Post key={post._id} post={ post } />
          ))}
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, 
  { getItems })(Dashboard);