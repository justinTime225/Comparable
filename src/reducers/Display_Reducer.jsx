import { JOB_DISPLAY } from '../actions/Job_Display';

export default function(state = null, action) {
  switch(action.type) {
  case JOB_DISPLAY:
    console.log('logging from display_reducer');
    console.log(action.payload);
    return action.payload;
  }

  return state;
}