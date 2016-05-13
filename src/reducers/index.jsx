import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Auth from './Auth_Reducers';
import Jobs from './Jobs_Reducer';
import OfferReducers from './OfferReducers.jsx';
import DisplayedJob from './Display_Reducer';
import ProfileOffer from './ProfileOffer_Reducer';
import Skills from './Skills_Reducers';
import ProfileReducers from './Profile_Reducer';
// Combine our reducers into one root reducer
const rootReducer = combineReducers({
  auth: Auth,
  form: formReducer,
  job: Jobs,
  offer: OfferReducers,
  profileOffer: ProfileOffer,
  skill: Skills,
  profileInfo: ProfileReducers,
});

export default rootReducer;
