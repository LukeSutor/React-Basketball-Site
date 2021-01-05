import React, { Component } from 'react';
import jersey from './images/jersey.jpg';

class ProfileScreen extends Component{
  render() {
    return(
      <div className="bg-white w-5/6 md:w-3/4 h-auto rounded-lg shadow-md mx-auto overflow-hidden my-4">
            {/* {profile.map(({ firstname, lastname, team, position, jerseyNumber, height_feet, height_inches, weight, email }) => ( */}
              <div className="w-2/3 py-4 mx-auto">
                <div className="flex justify-between">
                  <div className="pt-8 pb-4 w-1/4">
                    <p className="font-semibold text-xl md:text-3xl lg:text-5xl">{this.props.profile.firstname}</p>
                    <p className="font-semibold text-xl md:text-3xl lg:text-5xl">{this.props.profile.lastname}</p>
                  </div>
                  <div className="pt-4 w-1/4 h-1/4">
                    <img src={jersey} className="relative" alt="" />
                    <div className="absolute w-full top-28 md:top-32 lg:top-1/4 -left-0">
                      <p className="text-main text-center text-xs md:text-lg lg:text-xl font-bold">{this.props.profile.lastname}</p>
                      <p className="text-main text-center text-xl md:text-3xl lg:text-5xl font-bold pt-0 md:pt-2 lg:pt-4">{this.props.profile.jerseyNumber}</p>
                    </div>
                  </div>
                  <div className="pt-8 pb-4 w-1/4">
                    <p className="font-medium text-xs md:text-md lg:text-lg text-gray-600 text-center">{this.props.profile.team}</p>
                    <p className="font-medium text-xs md:text-md lg:text-lg text-gray-600 py-4 text-center">{this.props.profile.position}</p>
                  </div>
                </div>
                <div className="flex justify-evenly py-8">
                  <div className="w-24">
                    <p className="text-center text-sm md:text-lg text-gray-600 py-1">Height</p>
                    <hr className="w-3/4 mx-auto py-1" />
                    <div className="flex justify-evenly">
                      <div className="text-center text-main text-sm md:text-lg font-semibold inline-flex">{this.props.profile.height_feet}
                        <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 mx-1 mt-1">ft</p> {this.props.profile.height_inches}
                        <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 ml-1 mt-1">in</p></div>
                    </div>
                  </div>
                  <div className="w-24">
                    <p className="text-center text-sm md:text-lg text-gray-600 py-1">Weight</p>
                    <hr className="w-3/4 mx-auto py-1" />
                    <div className="flex justify-evenly">
                      <div className="text-center text-main text-sm md:text-lg font-semibold inline-flex">{this.props.profile.weight}
                        <p className="text-xs md:text-sm text-gray-600 font-normal -bottom-0 ml-1 mt-1">lbs</p></div>
                    </div>
                  </div>
                </div>
              </div>
            {/* ))} */}
          </div>
    );
  }
}

export default ProfileScreen;