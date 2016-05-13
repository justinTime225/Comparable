import { PROFILE_OFFER } from '../actions/Profile_Offer';

export default function (state = [], action) {
  switch(action.type) {
    case PROFILE_OFFER:
      
      return action.payload;
  }

  return state;
}
