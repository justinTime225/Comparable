import { combineReducers } from 'redux';
import Offers from './job_offers';

const rootReducer = combineReducers({
  offers: Offers
});

export default rootReducer;
