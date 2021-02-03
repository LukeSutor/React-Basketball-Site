import React, { Component } from 'react';

class ProfileScreen extends Component {
  render() {
    
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
                <p className="text-md text-gray-500 md:text-lg lg:text-xl font-light">Height</p>
              </div>
              <div className="my-auto">
                <div className="text-3xl md:text-4xl lg:text-5xl text-main font-semibold inline-flex">{this.props.profile.weight}
                  <p className="text-black text-lg md:text-2xl lg:text-2xl mt-1 lg:mt-3 px-3">lbs</p></div>
                <p className="text-md text-gray-500 md:text-lg lg:text-xl font-light">Weight</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-32 md:h-36 lg:h-40">
          <div className="text-center pt-10">
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold">{this.props.profile.team}</p>
            <p className="text-gray-500 text-md md:text-xl lg:text-2xl">{this.props.profile.position}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileScreen;