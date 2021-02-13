import React from 'react'

function Sign_In(props) {
  return (
    <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mx-auto my-auto">
      <path d="M452,0H60C26.916,0,0,26.916,0,60v80h40V60c0-11.028,8.972-20,20-20h392c11.028,0,20,8.972,20,20v392
			c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20v-80H0v80c0,33.084,26.916,60,60,60h392c33.084,0,60-26.916,60-60V60
			C512,26.916,485.084,0,452,0z" fill={props.color}/>
      <polygon points="240,131.716 211.716,160 287.716,236 0,236 0,276 287.716,276 211.716,352 240,380.284 364.284,256" fill={props.color}/>
    </svg>
  );
}

export default Sign_In