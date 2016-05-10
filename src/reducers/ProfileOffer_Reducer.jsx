import { PROFILE_OFFER } from '../actions/Profile_Offer';

export default function (state = [], action) {
  switch(action.type) {
    case PROFILE_OFFER:
      console.log(action.payload);
      
      return action.payload;
  }

  return state;
}