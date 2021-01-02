import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  item: itemReducer,
  profile: profileReducer
});