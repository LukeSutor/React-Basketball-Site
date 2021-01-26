import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemActions';
import basketball from './images/basketball.png';

class Post extends Component {
  state = {
    current_date: new Date(),
    post_date: new Date(this.props.post.date)
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  calcElapsed = () => {
    var elapsed = Math.floor((this.state.current_date - this.state.post_date) / 1000)
    if(elapsed < 60) {
      return (elapsed.toString() + " second(s) ago" )
    } else if(elapsed < 3600) {
      return (Math.floor(elapsed / 60).toString() + " minute(s) ago")
    } else if(elapsed < 86400) {
      return (Math.floor(elapsed / 3600).toString() + " hour(s) ago")
    } else {
      return (Math.floor(elapsed / 86400).toString() + " day(s) ago")
    }
  }

  render() {
    return (
      <div className="bg-gray-50 w-3/4 md:w-3/5 lg:w-1/2 text-center my-4 rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between">
          <Link to={{ pathname: "/user/"+this.props.post.name, user_id: this.props.post.id, post_id: this.props.post.id}}>
            <li className="text-center text-sm md:text-lg font-semibold my-3 md:my-2 ml-16 transform duration-150 hover:scale-110 hover:text-main">{this.props.post.name}</li>
          </Link>
          <li className="text-center text-sm md:text-lg text-gray-600 font-normal my-3 md:my-2 mr-16">{this.props.post.team}</li>
        </div>
        <hr className="w-5/6 mx-auto" />
        <div className="flex justify-evenly flex-wrap py-2">
          <div className="py-2 rounded-lg">
            <p className="mx-auto pb-1 w-20 text-gray-600 text-xs">POINTS</p>
            <hr className="w-3/4 mx-auto py-1" />
            <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
              {this.props.post.points}</li>
          </div>
          <div className="py-2 rounded-lg">
            <p className="mx-auto pb-1 w-20 text-gray-600 text-xs">ASSISTS</p>
            <hr className="w-3/4 mx-auto py-1" />
            <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
              {this.props.post.assists}</li>
          </div>
          <div className="py-2 rounded-lg">
            <p className="mx-auto pb-1 w-20 text-gray-600 text-xs">REBOUNDS</p>
            <hr className="w-3/4 mx-auto py-1" />
            <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
              {this.props.post.rebounds}</li>
          </div>
          <div className="py-2 rounded-lg">
            <p className="mx-auto pb-1 w-20 text-gray-600 text-xs">STEALS</p>
            <hr className="w-3/4 mx-auto py-1" />
            <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
              {this.props.post.steals}</li>
          </div>
          <div className="py-2 rounded-lg">
            <p className="mx-auto pb-1 w-20 text-gray-600 text-xs">BLOCKS</p>
            <hr className="w-3/4 mx-auto py-1" />
            <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
              {this.props.post.blocks}</li>
          </div>
        </div>
        <div className={`${this.props.deletable ? "visible" : "hidden"}`}>
          <button className="bg-red-600 rounded-lg text-white p-1 mb-2 focus:outline-none"
            onClick={this.onDeleteClick.bind(this, this.props.post._id)}
          >Delete</button>
        </div>
        <p className="text-gray-600 text-sm pb-2">{this.calcElapsed()}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { deleteItem })(Post);