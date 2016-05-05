import { JOB_DISPLAY } from '../actions/Job_Display';

export default function(state = null, action) {
  switch(action.type) {
  case JOB_DISPLAY:
    console.log('logging from display_reducer');
    console.log(action.payload);
<<<<<<< 02ff921c817fdc5bac80f9e45e26bb926e9f469a
    return action.payload;
=======
    return {display: action.payload};
>>>>>>> (feat)
  }

  return state;
}