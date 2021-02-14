import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import BlueBasketballSVG from './images/BlueBasketballSVG'
import iPhone from './images/iPhone.png'
import Graph from './images/Graph'
import Record from './images/Record'
import Share from './images/Share'

function Home(props) {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    document.title = 'Statbreak'
  }, [])

  return (
    <div>
      <BlueBasketballSVG />
      <div className="flex flex-row justify-evenly">
        <div className="w-full md:w-3/5 mx-auto">
          <div className="mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold my-20 md:my-8">Statbreak</h1>
            <div className="flex flex-row flex-wrap justify-around text-md md:text-xl">
              <div className="flex flex-col w-28 md:w-40 lg:w-44">
                <Record />
                <p className="my-2">Record your <br /> stats</p>
              </div>
              <div className="flex flex-col w-28 md:w-40  lg:w-44">
                <Graph />
                <p className="my-2">Track your <br /> progress</p>
              </div>
              <div className="flex flex-col w-28 md:w-40 lg:w-44">
                <Share />
                <p className="my-2">Share with your <br /> coaches and peers</p>
              </div>
            </div>
            <div className="bg-main text-center w-min mx-auto rounded-full whitespace-nowrap hover:bg-dark mt-14 md:mt-8">
              <button className={`text-white text-lg md:text-lg font-semibold px-4 py-2 focus:outline-none
              ${isAuthenticated ? "hidden" : ""}`}
                onClick={() => loginWithRedirect()}>Get Started</button>
            </div>
            <div className="bg-main text-center w-min mx-auto rounded-full whitespace-nowrap hover:bg-dark mt-14 md:mt-8">
              <button className={`text-white text-lg md:text-lg font-semibold px-4 py-2 focus:outline-none
              ${isAuthenticated ? "" : "hidden"}`}
                onClick={() => props.history.push('/upload')}>Post a Game</button>
            </div>
          </div>
        </div>
        <div className="relative hidden md:flex z-20 w-1/3 mt-8">
          <img src={iPhone} alt="" className="mx-auto my-auto" style={{ maxWidth: "12em" }} />
        </div>
      </div>
    </div>

  );
}

export default Home;