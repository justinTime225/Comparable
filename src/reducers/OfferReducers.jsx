import { CHANGE_OFFER } from '../actions/Offer_Actions';

// Auth reducer, starting state sets auth based on a token in local storage
// TODO: A Util to check if the token is expired
export default function(state = {
  offer: false
}, action) {
  switch (action.type) {
    case CHANGE_OFFER:
      return Object.assign({}, state, {
        offer: action.offer
      })
    default:
      return state
  }
}
