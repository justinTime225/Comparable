export const JOB_DISPLAY = 'JOB_DISPLAY';

export function displayJob(job) {
  return {
    type: JOB_DISPLAY,
    payload: job,
  };
}
