import axios from 'axios';
export const PROFILE_OFFER = "PROFILE_OFFER";

export function getOffer() {
  const request = axios.get('/api/offers');
  console.log('inside getOffer')
  console.log(request);
  return {
    type: PROFILE_OFFER,
    payload: request,
  }
}