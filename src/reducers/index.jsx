import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Auth from './Auth_Reducers';
import Jobs from './Jobs_Reducer';
import OfferReducers from './OfferReducers.jsx';
import DisplayedJob from './Display_Reducer';

// Combine our reducers into one root reducer
const rootReducer = combineReducers({
  auth: Auth,
  form: formReducer,
  job: Jobs,
  offer: OfferReducers,
  display: DisplayedJob,
});

export default rootReducer;
