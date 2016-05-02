import { LOCK_SUCCESS, LOGOUT_SUCCESS } from '../actions/Auth_Actions'

// Auth reducer, starting state sets auth based on a token in local storage
// TODO: A Util to check if the token is expired
export default function(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {
    case LOCK_SUCCESS:
      console.log('Successful login');
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}