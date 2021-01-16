import React, { Component } from 'react';

class ProfileScreen extends Component {
  render() {
    // Declare all averages as 0
    let ppg = 0, apg = 0, rpg = 0, spg = 0, bpg = 0
    // If the averages passed in by the parent component arent NaN, set all local averages to the prop averages
    // This ensures averages on the site never read "NaN"
    if(!isNaN(this.props.ppg)) {
      ppg = this.props.ppg
      apg = this.props.apg
      rpg = this.props.rpg
      spg = this.props.spg
      bpg = this.props.bpg
    }
    
    return (
      <div>
        <div className="w-5/6 mx-auto">
          <div className="flex flex-col md:flex-row justify-around md:justify-between h-96 overflow-hidden">
            <div className="relative w-min md:w-96 mx-auto">
              <div style={{ fontSize: '400px' }} className="hidden md:flex text-main -mt-36 opacity-40 text-center">
              {this.props.profile.jersey_number}</div>
              <div className="md:absolute text-black text-4xl md:text-8xl text-center font-semibold w-full top-1/3 md:top-1/4 -mt-3">{this.props.profile.firstname}
                <br />{this.props.profile.lastname}
                <p className="md:hidden text-main font-semibold">{this.props.profile.jersey_number}</p></div>
            </div>
            <div className="flex flex-row md:flex-col lg:flex-row gap-16 md:gap-0 lg:gap-32 mx-auto -mt-10 md:-mt-0">
              <div className="my-auto">
                <div className="text-3xl md:text-4xl lg:text-5xl text-main font-semibold inline-flex">{this.props.profile.height_feet}
                  <p className="text-black text-lg md:text-2xl lg:text-2xl mt-1 lg:mt-3 px-3">ft</p>
                  {this.props.profile.height_inches}
                  <p className="text-black text-lg md:text-2xl lg:text-2xl mt-1 lg:mt-3 px-3">in</p></div>
                <p className="text-md md:text-lg lg:text-xl font-light">Height</p>
              </div>
              <div className="my-auto">
                <div className="text-3xl md:text-4xl lg:text-5xl text-main font-semibold inline-flex">{this.props.profile.weight}
                  <p className="text-black text-lg md:text-2xl lg:text-2xl mt-1 lg:mt-3 px-3">lbs</p></div>
                <p className="text-md md:text-lg lg:text-xl font-light">Weight</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-32 md:h-36 lg:h-40">
          <div className="text-center pt-10">
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold">{this.props.profile.team}</p>
            <p className="text-gray-600 text-md md:text-xl lg:text-2xl">{this.props.profile.position}</p>
          </div>
        </div>
        <div className="flex justify-evenly flex-wrap py-4">
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
      </div>
    );
  }
}

export default ProfileScreen;