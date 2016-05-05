export const JOB_DISPLAY = "JOB_DISPLAY";

export function displayJob(job) {
  console.log('inside action display')
  return {
    type: JOB_DISPLAY,
    payload: job
  };
}