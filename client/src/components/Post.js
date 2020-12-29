import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemActions';
import basketball from './images/basketball.png'

class Post extends Component {

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    return(
      <div className="bg-white w-3/4 md:w-3/5 lg:w-1/2 text-center my-4 rounded-lg shadow-md overflow-hidden">
        <li className="text-center font-bold my-2">{this.props.post.name}</li>
        <hr className="w-5/6 mx-auto"/>
        <div className="flex justify-evenly flex-wrap py-2">
          <div className="transform ease-in duration-100 hover:scale-110 py-2">
            <p className="mx-auto w-20 text-gray-500 text-xs">POINTS</p>
            <li className={`mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center 
              ${ this.props.post.points < 10 ? "text-red-700" : "" } 
              ${ this.props.post.points > 30 ? "text-green-500" : ""}`}>
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt=""/>
              {this.props.post.points}</li>
          </div>
          <div className="transform ease-in duration-100 hover:scale-110 py-2">
            <p className="mx-auto w-20 text-gray-500 text-xs">ASSISTS</p>
            <li className={`mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center
              ${ this.props.post.assists < 3 ? "text-red-700" : ""} 
              ${ this.props.post.assists > 9 ? "text-green-500" : ""}`}>
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt=""/>
              {this.props.post.assists}</li>
          </div>
          <div className="transform ease-in duration-100 hover:scale-110 py-2">
            <p className="mx-auto w-20 text-gray-500 text-xs">REBOUNDS</p>
            <li className={`mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center
              ${ this.props.post.rebounds < 3 ? "text-red-700" : ""} 
              ${ this.props.post.rebounds > 9 ? "text-green-500" : ""}`}>
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt=""/>
              {this.props.post.rebounds}</li>
          </div>
          <div className="transform ease-in duration-100 hover:scale-110 py-2">
            <p className="mx-auto w-20 text-gray-500 text-xs">STEALS</p>
            <li className={`mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center
              ${ this.props.post.steals === 0 ? "text-red-700" : ""} 
              ${ this.props.post.steals > 3 ? "text-green-500" : ""}`}>
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt=""/>
              {this.props.post.steals}</li>
          </div>
          <div className="transform ease-in duration-100 hover:scale-110 py-2">
            <p className="mx-auto w-20 text-gray-500 text-xs">BLOCKS</p>
            <li className={`mx-auto text-xl font-semibold w-12 h-12 flex items-center justify-center
              ${ this.props.post.blocks === 0 ? "text-red-700" : ""} 
              ${ this.props.post.blocks > 3 ? "text-green-500" : ""}`}>
              <img src={basketball} className="absolute h-14 w-14 opacity-30 hover:opacity-40" alt=""/>
              {this.props.post.blocks}</li>
          </div>
        </div>
        <button 
          onClick={this.onDeleteClick.bind(this, this.props.post._id)}
          >&times;</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { deleteItem })(Post);