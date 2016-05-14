import axios from 'axios';
export const JOB_MATCH = 'JOB_MATCH';

export function sendJob(data, userData) {
  console.log(data);
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
