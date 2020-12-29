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
      height: '50vh'
  }

  render() {
    return(
      <div style={this.container}>
        <div className="bg-green-600 rounded-lg w-1/5">
          <p className="text-white text-5xl py-1 content-center">Court Stats</p>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default Home;