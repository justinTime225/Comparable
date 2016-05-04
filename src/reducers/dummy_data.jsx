import Jobs from './reducer_jobs';
// Jobs is an a function that returns an array
// const numDataPoints = 50;
// const randomNum = () => Math.floor(Math.random() * 1000);
// const randomDataSet = () => {
//   return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
// };
// invoking Jobs returns an array to map over
var array = Jobs().map(job => {
  var mean = [Number((job.salary_min + job.salary_max)/2), (Number(job.equity_min) + Number(job.equity_max)) / 2];
  job.mean = mean;
  return job;
});
console.log('-----------');
console.log(array.length);
// export const randomizeData = () => {
//   return { data: array };
// };


export default function() {
  return array;
}