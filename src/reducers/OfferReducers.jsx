import { CHANGE_OFFER, CLICK_JOB, CLOSE_JOB } from '../actions/Offer_Actions';

export default function(state = {
  userOffer: false,
  display: false,
}, action) {
  switch (action.type) {
    case CHANGE_OFFER:
      return Object.assign({}, state, {
        userOffer: action.offer,
      });
    case CLICK_JOB:
      return Object.assign({}, state, {
        display: action.job,
      });
    case CLOSE_JOB:
      return Object.assign({}, state, {
        display: false,
      });
    default:
      return state;
  }
}
