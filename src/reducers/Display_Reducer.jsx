import { JOB_DISPLAY } from '../actions/Job_Display';

export default function (state = null, action) {
  switch(action.type) {
    case JOB_DISPLAY:
      return action.payload;
  }

  return state;
}
