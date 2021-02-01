import React, { Component } from 'react'

class Averages extends Component {

  checkPost(post) {
    return post.id === this.props.id;
  }

  render() {
    const posts = this.props.posts.filter(post => this.checkPost(post))
    let ppg = 0,
    apg = 0,
    rpg = 0,
    spg = 0,
    bpg = 0
    for (let i = 0; i < posts.length; i++) {
      ppg += posts[i].points
      apg += posts[i].assists
      rpg += posts[i].rebounds
      spg += posts[i].steals
      bpg += posts[i].blocks
    }
    ppg = ppg = Math.round((ppg / posts.length) * 100) / 100
    apg = apg = Math.round((apg / posts.length) * 100) / 100
    rpg = rpg = Math.round((rpg / posts.length) * 100) / 100
    spg = spg = Math.round((spg / posts.length) * 100) / 100
    bpg = bpg = Math.round((bpg / posts.length) * 100) / 100
    return (
      <div className="flex justify-evenly flex-wrap">
        <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
          <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">PPG</p>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{ppg}</p>
        </div>
        <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
          <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">APG</p>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{apg}</p>
        </div>
        <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
          <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">RPG</p>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{rpg}</p>
        </div>
        <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
          <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">SPG</p>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{spg}</p>
        </div>
        <div className="py-8 w-32 md:w-56 lg:w-80 text-center">
          <p className="text-gray-600 text-md md:text-2xl lg:text-3xl font-light pb-1">BPG</p>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold">{bpg}</p>
        </div>
      </div>
    );
  }
}

export default Averages