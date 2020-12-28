import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [ 
    { id: 1, name: "Kobe Bryant", points: 81, rebounds: 6, assists: 2, steals: 3, blocks: 1 },
    { id: 2, name: "Lebron James", points: 61, rebounds: 7, assists: 4, steals: 1, blocks: 0 },
    { id: 3, name: "Michael Jordan", points: 38, rebounds: 7, assists: 5, steals: 2, blocks: 1 },
    { id: 4, name: "Wilt Chamberlain", points: 100, rebounds: 27, assists: 8, steals: 0, blocks: 5 }],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
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