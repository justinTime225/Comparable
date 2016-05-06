import { LOCK_SUCCESS, LOGOUT_SUCCESS } from '../actions/Auth_Actions';

// Auth reducer, starting state sets auth based on a token in local storage
export default function(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
}, action) {
  switch (action.type) {
    case LOCK_SUCCESS:

      // Successful login sets isAuthenticated to true in state
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      });
    case LOGOUT_SUCCESS:

      // Successful logout sets isAuthenticated to false in state
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    default:
      return state;
  }
}
