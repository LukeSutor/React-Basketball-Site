import React, { Component } from 'react';
import ProfileScreen from './ProfileScreen';
import Post from './Post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById } from '../actions/itemActions';

class User extends Component {
  state = {
    name: null,
    user_id: null
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.name })
    this.setState({ user_id: this.props.location.user_id })
    this.props.getProfileById(this.props.location.user_id)
    window.scrollTo(0, 0)
  }

  checkProfile = (post) => {
    return post.id === this.state.user_id;
  }

  render() {
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
    // profile[0].user_id === this.state.user_id
    return (
      profile[0].user_id === this.state.user_id && (
        <div>
          {profile.map((profile) => (
            <ProfileScreen key={profile.email} profile={profile} ppg={ppg} apg={apg} rpg={rpg} spg={spg} bpg={bpg} />
          ))}
          <div className="w-5/6 md:w-3/4 h-auto mx-auto mt-8 mb-4">
            <p className="text-5xl">{this.state.name}'s Posts</p>
          </div>
          <ul className="flex flex-col items-center">
            {/* Filter through all posts to check if the post id matches the profile id of the profile shown on screen
                Then, map through those posts and show them. */}
            {items.filter(post => this.checkProfile(post))
            .map((post) => (
              <Post key={post._id + post.date} post={post} deletable={false} />
            ))}
          </ul>
        </div>
      )
    );
  }
}

User.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  item: state.item
})

export default connect(mapStateToProps, { getProfileById })(User);