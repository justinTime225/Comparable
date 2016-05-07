import axios from 'axios';

export const CHANGE_OFFER = 'CHANGE_OFFER';
export const CLICK_JOB = 'CLICK_JOB';
export const CLOSE_JOB = 'CLOSE_JOB';

// Action creator for changing the users offer
export function changeOffer(data) {
  return {
    type: CHANGE_OFFER,
    offer: data,
  };
}

export function clickJob(data) {
  console.log(data);
  axios.get('/api/job', {
    params: {
      jobID: String(data.id),
    },
  });

  return {
    type: CLICK_JOB,
    job: data,
  };
}

export function closeJob() {
  return {
    type: CLOSE_JOB,
  };
}
