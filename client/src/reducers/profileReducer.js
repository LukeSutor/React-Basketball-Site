import { GET_PROFILE, ADD_PROFILE, DELETE_PROFILE } from '../actions/types.js'

const initialState = {
  profile: []
};

function profileReducer(state = initialState, action) {
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profiles: action.payload
      }
    case ADD_PROFILE:
      return {
        ...state,
        items: [action.payload, ...state.profiles]
      }
  }
}

export default profileReducer;