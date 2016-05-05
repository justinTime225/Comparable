import {JOB_MATCH} from '../actions/Job_Matches';
// console.log(JOB_MATCH + '-------');
export default function(state = [], action) {
  // action.type is undefined for some reason
  switch(action.type) {
  case JOB_MATCH: 

    console.log('-------');
    console.log(action);
    var current = [...action.payload.data];
    var array = current.map(job => {
      var mean = [Number((job.salary_min + job.salary_max)/2), (Number(job.equity_min) + Number(job.equity_max)) / 2];
      job.mean = mean;
      return job;
    });
    var userData = {
      mean: [action.meta.salary, action.meta.equity],
      title: action.meta.title,
      user: true
    };

    array.push(userData);
    return array;
  }
  return state;
}