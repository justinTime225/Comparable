import Auth0Lock from 'auth0-lock';

/* POSSIBLE LOGIN ACTIONS */

export const SHOW_LOCK = 'SHOW_LOCK';
export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export const LOCK_ERROR = 'LOCK_ERROR';

// Action creator for showing Lock
function showLock() {
  return {
    type: SHOW_LOCK
  }
}

// Action creator for login success
function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

// Action creator for login error
function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

// This function opens the lock widget and dispatches actions along the way
export function login() {
  const lock = new Auth0Lock('7knLLEidEQiUBihGrdb8GKVtNnfPF1A5', 'comparable.auth0.com');
  return dispatch => {
    lock.show((err, profile, token) => {
      // If there was an error logging in, dispatch the lockErr function
      if (err) {
        dispatch(lockError(err));
        return;
      }
      console.log(profile);
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      dispatch(lockSuccess(profile, token));
    });
  }
}

/* POSSIBLE LOGOUT ACTIONS */
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  }
}