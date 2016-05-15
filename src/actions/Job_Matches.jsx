import axios from 'axios';
export const JOB_MATCH = 'JOB_MATCH';
export const GET_USERS = 'GET_USERS';

export function sendJob(data, userData) {
  console.log('Send job', userData);
  const request = axios.get('/api/jobs', {
    params: {
      title: data.title,
      location: data.location,
    },
  });
  return {
    type: JOB_MATCH,
    payload: request,
    meta: userData,
  };
}

export function getUserOffers(data) {
  console.log('Get User Offers', data);
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
