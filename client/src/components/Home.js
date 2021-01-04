import React, { Component } from 'react'
import basketball_court from './images/basketball_court.png'

class Home extends Component {
  // Styling to make the background image it's reactive styling always taking up 50% of the screen
  container = {
      backgroundImage: `url(${basketball_court})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '45vh',
      opacity: '100%'
  }

  render() {
    return(
      <div>
        <div style={this.container}>
          <div className="relative top-1/3 mx-10 md:mx-16 lg:mx-24 w-min whitespace-nowrap bg-main rounded-lg">
            <p className="text-white text-l md:text-3xl lg:text-4xl font-bold p-4 content-center">The Stat Sheet</p>
          </div>
        </div>
        <div className="py-4 mx-auto">
          <p className="text-center text-main">Test</p>
        </div>
      </div>
    
    );
  }
}

export default Home;