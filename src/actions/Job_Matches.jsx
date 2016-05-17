import axios from 'axios';
export const JOB_MATCH = 'JOB_MATCH';
export const GET_USERS = 'GET_USERS';

export function sendJob(data) {
  const request = axios.get('/api/jobs', {
    params: {
      title: data.title,
      location: data.location,
    },
  });
  return {
    type: JOB_MATCH,
    payload: request,
    meta: data,
  };
}

export function getUserOffers(data) {
  const request = axios.get('/api/users/offers', {
    params: {
      title: data.title,
    },
  });
  return {
    type: GET_USERS,
    payload: request,
    meta: data,
  }
}
