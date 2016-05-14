import { TOGGLE_PIE, TOGGLE_BUBBLE, TOGGLE_SCATTER } from '../actions/Profile_Actions';

export default function(state = {
  profileChart: 'bubble',
}, action) {
  switch (action.type) {
    case TOGGLE_PIE:
      return Object.assign({}, state, {
        profileChart: 'pie',
      });
    case TOGGLE_BUBBLE:
      return Object.assign({}, state, {
        profileChart: 'bubble',
      });
    case TOGGLE_SCATTER:
      return Object.assign({}, state, {
        profileChart: 'scatter',
      });
    default:
      return state;
  }
}
