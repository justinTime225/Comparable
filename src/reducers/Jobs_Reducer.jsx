import { JOB_MATCH, GET_USERS } from '../actions/Job_Matches';
// console.log(JOB_MATCH + '-------');
export default function (state = [], action) {
  // action.type is undefined for some reason
  switch(action.type) {
    case JOB_MATCH:
      // take all objects payload.data and put it into a new array
      const current = [...action.payload.data];
      console.log('Payload data', action.payload.data);
      console.log('Payload', action.payload);
      // map over the object and create a mean array
      const array = current.map(job => {
        const mean = [Number((job.salary_min + job.salary_max) / 2), (Number(job.equity_min) + Number(job.equity_max)) / 2];
        var lowerRange = {
          x: job.salary_min,
          y: Number(job.equity_min),
          r: 5
        }
        var upperRange = {
          x: job.salary_max,
          y: Number(job.equity_max),
          r: 5
        }
        var midRange = {
          x: (job.salary_max + job.salary_min)/2,
          y: (Number(job.equity_min) + Number(job.equity_max)) / 2,
          r: 5
        }
        // job.mean = mean;
        job.lowerRange = lowerRange;
        job.upperRange = upperRange;
        job.midRange = midRange;
        return job;
      });

      // create the user data based on the offer input from meta
      const userData = {
        mean: [action.meta.salary, action.meta.equity],
        title: action.meta.title,
        user: true,
        x: action.meta.salary,
        y: action.meta.equity,
        r: 10
      };

      array.push(userData);
      return array;

    case GET_USERS:
      console.log(action.payload.data);
      return action.payload.data;
  }
  return state;
}
