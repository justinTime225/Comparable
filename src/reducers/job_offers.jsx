import { FETCH_POST } from '../actions/action_creators';
// const INITIAL_STATE = {all: [], job: null};

export default function(state = null, action) {
  switch(action.type) {
  case FETCH_POST:
    // action.payload.data == list of jobs 
    console.log(' i am in the reducer');
    console.log(action.payload.data);
    console.log('payload above')
    return action.payload.data;
  default: 
    return state;
  }
}