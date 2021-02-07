import React, { useEffect } from 'react'
import basketball_background from './images/basketball_background_1.png'
import { useAuth0 } from '@auth0/auth0-react'
import { useTransition, animated } from 'react-spring'

function Home() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    document.title = 'Statbreak'
  }, [])

  // Animation for words and button
  const transition = useTransition(true, null, {
    config: {mass: 1, tension: 200, friction: 40},
    from: { opacity: 0, marginTop: 230 },
    enter: { opacity: 1, marginTop: 0 },
  })

  return (
    <div>
      <div className="bg-main w-full md:h-3/4 mt-8 text-white">
        <div className="flex flex-col-reverse md:flex-row justify-around">
          {transition.map(({ item, key, props }) =>
            item &&
              <animated.div key={key} style={props} className="flex flex-col justify-evenly w-3/4 md:w-1/3 text-center md:text-left mx-auto">
                <p className="text-4xl md:text-5xl lg:text-7xl font-semibold md:-mt-6">Statbreak</p>
                <p className="text-md md:text-xl lg:text-2xl md:-mt-4 lg:-mt-8">Record your stats, track your progress, share with your coaches and peers.</p>
                <div className="bg-white text-center w-min mx-auto rounded-full whitespace-nowrap hover:bg-gray-100">
                  <button className={`text-main text-md md:text-lg font-semibold px-2 md:px-4 py-1 md:py-2 focus:outline-none
              ${isAuthenticated ? "hidden" : ""}`}
                    onClick={() => loginWithRedirect()}>Get Started</button>
                </div>
              </animated.div>
          )}
          <div className="w-3/4 md:w-1/2 py-6 md:py-0n mx-auto my-auto">
            <img src={basketball_background} alt="basketball vector" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;