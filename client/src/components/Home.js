import React, { Component } from 'react'
import basketball_background from './images/basketball_background.png';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends Component {
  render() {
    const { isAuthenticated, loginWithRedirect } = this.props.auth0;
    return (
      <div>
        <div className="bg-main w-full md:h-3/4 mt-8 text-white">
          <div className="flex justify-evenly py-8">
            <div className="flex flex-col justify-evenly w-min h-min">
              <p className="text-4xl md:text-6xl lg:text-7xl font-semibold md:-mt-4 lg:-mt-8 whitespace-nowrap">The Stat <br /> Sheet</p>
              <p className="text-md md:text-2xl whitespace-nowrap">Record your stats, track your progress,<br /> share with your coaches and peers.</p>
              <div className="bg-white text-center w-min mx-auto rounded-full whitespace-nowrap hover:bg-gray-100">
                <button className={`text-main text-md md:text-lg font-semibold px-2 md:px-4 py-1 md:py-2 focus:outline-none
                ${isAuthenticated ? "hidden" : ""}`}
                onClick={() => loginWithRedirect()}>Get Started</button>
              </div>
            </div>
            <div className="w-1/2">
              <img src={basketball_background} alt="basketball vector" />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withAuth0(Home);