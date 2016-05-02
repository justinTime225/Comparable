import { combineReducers } from 'redux';
import Offers from './job_offers';
import Auth from './Auth_Reducers';

const rootReducer = combineReducers({
  offers: Offers,
  auth: Auth
});

export default rootReducer;
