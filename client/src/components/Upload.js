import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class Upload extends Component {
  state = {
    name: '',
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    redirect: false
  }

  uploadVideo = () => {
    document.getElementById("videoUpload").click();
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

  render() {
    return (
      <div>
        <div className="bg-white w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
          <form className="w-full md:w-3/4 mx-auto">
            <div className="py-4">
              <h2 className="text-2xl font-semibold mx-5">Upload</h2>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="text" id="name" placeholder="Name" onChange={this.onChange}/>
              </div>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="number" id="points" placeholder="Points" onChange={this.onChange}/>
              </div>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="number" id="assists" placeholder="Assists" onChange={this.onChange}/>
              </div>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="number" id="rebounds" placeholder="Rebounds" onChange={this.onChange}/>
              </div>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="number" id="steals" placeholder="Steals" onChange={this.onChange}/>
              </div>
              <div className="mx-4 my-4 border-2 border-none rounded-full shadow-md overflow-hidden">
                <input className="px-4 w-full outline-none h-10" type="number" id="blocks" placeholder="Blocks" onChange={this.onChange}/>
              </div>
              <hr className="w-5/6 mx-auto" />
              <div className="mx-4 my-4">
                <input className="" type="file" accept="video/*" id="videoUpload" hidden />
                <input className="px-4 w-full h-10 rounded-full shadow-md outline-none text-white bg-main hover:bg-dark"
                  type="button"
                  value="Add a Video"
                  onClick={this.uploadVideo} />
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem })(Upload);