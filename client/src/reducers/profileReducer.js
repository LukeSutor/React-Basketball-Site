import { GET_PROFILES, ADD_PROFILE, GET_PROFILE_BY_ID } from '../actions/types.js';

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
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profiles: action.payload.filter(profile => profile.user_id === action.user_id)
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