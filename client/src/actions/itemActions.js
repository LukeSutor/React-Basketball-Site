import axios from 'axios';
import { GET_ITEMS, GET_ITEMS_BY_ID, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_PROFILES, GET_PROFILE_BY_ID, ADD_PROFILE, DELETE_PROFILE } from './types';


// Post actions
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => dispatch({
      type: GET_ITEMS,
      payload: res.data
    }))
};

export const getItemsById = (id) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => dispatch({
      type: GET_ITEMS_BY_ID,
      payload: res.data,
      id: id
    }))
};

export const addItem = (item) => dispatch => {
  axios
    .post('/api/items', item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
};

export const deleteItem = (id) => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

// Profile actions
export const getProfiles = (email) => dispatch => {
  axios
    .get('/api/profiles')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data,
      email: email
    }))
};

export const getProfileById = (id) => dispatch => {
  axios
    .get('/api/profiles')
    .then(res => dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
      user_id: id
    }))
};

export const addProfile = (profile) => dispatch => {
  axios
    .post('/api/profiles', profile)
    .then(res =>
      dispatch({
        type: ADD_PROFILE,
        payload: res.data
      }))
}

export const deleteProfile = (id) => dispatch => {
  axios
    .delete(`/api/profiles/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROFILE,
        payload: id
      }))
};

// Not working, comment out for now
// export const updateProfile = (id, newProfile) => dispatch => {
//   axios
//     .put('/api/profiles', newProfile)
//     .then(res =>
//       dispatch({
//         type: UPDATE_PROFILE,
//         payload: newProfile
//       }))
// }