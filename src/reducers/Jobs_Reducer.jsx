import { JOB_MATCH, GET_USERS } from '../actions/Job_Matches';
const colorArray = ["#FFAB6E", "#E8718A", "#E8718A", "#6492E8", "#65FFDB", "#90FF75", "#FFE26E"];
export default function (state = [], action) {
  // action.type is undefined for some reason
  switch(action.type) {
    case JOB_MATCH:
      // take all objects payload.data and put it into a new array
      const current = [...action.payload.data];
      // map over the object and create a mean array
      const array = current.map(job => {
        const mean = [Number((job.salary_min + job.salary_max) / 2), (Number(job.equity_min) + Number(job.equity_max)) / 2];
        const color = colorArray[Math.floor(Math.random() * 7)];
        var lowerRange = {
          x: job.salary_min,
          y: Number(job.equity_min),
          r: 5,
          color: color
        }
        var upperRange = {
          x: job.salary_max,
          y: Number(job.equity_max),
          r: 5,
          color: color
        }
        var midRange = {
          x: (job.salary_max + job.salary_min)/2,
          y: (Number(job.equity_min) + Number(job.equity_max)) / 2,
          r: 5,
          color: color
        }
        job.lowerRange = lowerRange;
        job.upperRange = upperRange;
        job.midRange = midRange;
        return job;
      }).filter(job => {
        if (job.lowerRange.x > 10000 && job.upperRange.y <= 7) {
          return job;
        }
      });
      const userData = {
        mean: [action.meta.salary, action.meta.equity],
        title: action.meta.title,
        user: true,
        x: action.meta.salary,
        y: action.meta.equity,
        r: 10,
        color: "#1060D6"
      };
      array.push(userData);
      return array;

    case GET_USERS:
      // console.log(action.payload.data);
      return action.payload.data;
  }
  return state;
}
