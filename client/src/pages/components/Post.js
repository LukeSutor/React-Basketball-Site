import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteItem } from '../../actions/itemActions'
import basketball from '../images/basketball.png'

function Post(props) {

  const [current_date] = useState(new Date())
  const [post_date] = useState(new Date(props.post.date))

  function onDeleteClick(id) {
    props.deleteItem(id);
  }

  function calcElapsed() {
    var elapsed = Math.floor((current_date - post_date) / 1000)
    if (elapsed < 60) {
      return (elapsed.toString() + " second(s) ago")
    } else if (elapsed < 3600) {
      return (Math.floor(elapsed / 60).toString() + " minute(s) ago")
    } else if (elapsed < 86400) {
      return (Math.floor(elapsed / 3600).toString() + " hour(s) ago")
    } else {
      return (Math.floor(elapsed / 86400).toString() + " day(s) ago")
    }
  }

  return (
        <div className="bg-gray-50 w-full md:w-3/5 lg:w-1/2 text-center my-4 rounded-none md:rounded-lg shadow-md overflow-hidden mx-auto">
          <div className="flex justify-between">
            <Link to={{ pathname: "/user/" + props.post.name.replace(/\s+/g, '-'), user_id: props.post.id, post_id: props.post.id }}>
              <li className="text-center text-sm md:text-lg font-semibold my-3 md:my-2 ml-16 transform duration-150 hover:scale-110 hover:text-main">{props.post.name}</li>
            </Link>
            <li className="text-center text-sm md:text-lg text-gray-500 font-normal my-3 md:my-2 mr-16">{props.post.team}</li>
          </div>
          <hr className="w-5/6 mx-auto" />
          <div className="flex justify-evenly flex-wrap py-2">
            <div className="py-2 rounded-lg">
              <p className="mx-auto pb-1 w-20 text-gray-500 text-xs">POINTS</p>
              <hr className="w-3/4 mx-auto py-1" />
              <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
                <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
                {props.post.points}</li>
            </div>
            <div className="py-2 rounded-lg">
              <p className="mx-auto pb-1 w-20 text-gray-500 text-xs">ASSISTS</p>
              <hr className="w-3/4 mx-auto py-1" />
              <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
                <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
                {props.post.assists}</li>
            </div>
            <div className="py-2 rounded-lg">
              <p className="mx-auto pb-1 w-20 text-gray-500 text-xs">REBOUNDS</p>
              <hr className="w-3/4 mx-auto py-1" />
              <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
                <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
                {props.post.rebounds}</li>
            </div>
            <div className="py-2 rounded-lg">
              <p className="mx-auto pb-1 w-20 text-gray-500 text-xs">STEALS</p>
              <hr className="w-3/4 mx-auto py-1" />
              <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
                <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
                {props.post.steals}</li>
            </div>
            <div className="py-2 rounded-lg">
              <p className="mx-auto pb-1 w-20 text-gray-500 text-xs">BLOCKS</p>
              <hr className="w-3/4 mx-auto py-1" />
              <li className="mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center">
                <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt="" />
                {props.post.blocks}</li>
            </div>
          </div>
          <div className={`${props.deletable ? "visible" : "hidden"}`}>
            <button className="bg-red-600 rounded-lg text-white p-1 mb-2 focus:outline-none"
              onClick={onDeleteClick.bind(this, props.post._id)}
            >Delete</button>
          </div>
          <p className="text-gray-500 text-sm pb-2">{calcElapsed()}</p>
        </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { deleteItem })(Post);