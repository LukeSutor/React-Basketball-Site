import { GET_PROFILES, ADD_PROFILE } from '../actions/types.js';

const initialState = {
  profiles: []
};

function profileReducer(state = initialState, action) {
  switch(action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload.filter(profile => profile.email === action.email)
      }
    case ADD_PROFILE:
      return {
        ...state,
        items: [action.payload, ...state.profiles]
      }
    default:
      return state;
  }
}

export default profileReducer;