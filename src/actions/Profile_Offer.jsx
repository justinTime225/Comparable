/* React imports */
import axios from 'axios';

export const PROFILE_OFFER = "PROFILE_OFFER";

export function getOffer(email) {
  const request = axios.get('/api/offers', {
    params: {
      userEmail: email,
    },
  });

  return {
    type: PROFILE_OFFER,
    payload: request,
  }
}
