import { GET_ITEMS, GET_ITEMS_BY_ID, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types.js';

const initialState = {
  items: [],
  loading: false
};

function itemReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case GET_ITEMS_BY_ID:
      return {
        ...state,
        items: action.payload.filter(item => item.id === action.id)
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case ADD_ITEM:
      return{
        ...state,
        items: [action.payload, ...state.items]
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default itemReducer;