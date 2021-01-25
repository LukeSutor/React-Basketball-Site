import { GET_PROFILES, ADD_PROFILE, GET_PROFILE_BY_ID, DELETE_PROFILE } from '../actions/types.js';

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
      case DELETE_PROFILE:
        return {
          ...state,
          profiles: state.profiles.filter(profile => profile.user_idid !== action.payload)
        }
      // Not working comment out
      // case UPDATE_PROFILE:
      //   return {
      //     ...state,
      //     profiles: action.payload.filter(profile => profile.user_id === action.id)
      //   }
    default:
      return state;
  }
}

export default profileReducer;