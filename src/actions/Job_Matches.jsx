import axios from 'axios';
export const JOB_MATCH = 'JOB_MATCH';

export function sendJob(title, userData) {

  const request = axios.get('/api/jobs', {
    params: {
      title: title,
    },
  });

  return {
    type: JOB_MATCH,
    payload: request,
    meta: userData,
  };
}
