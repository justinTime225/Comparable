import {JOB_MATCH} from '../actions/Job_Matches';
// console.log(JOB_MATCH + '-------');
export default function(state = [], action) {
  // action.type is undefined for some reason
  switch(action.type) {
  case JOB_MATCH: 
    // return state.concat([action.payload.data]);
    // return [ action.payload.data, ...state ]; 
    // console.log('job matched');
    console.log('-------');
    console.log([...action.payload.data]);
    return [...action.payload.data];
  }
  return state;
}