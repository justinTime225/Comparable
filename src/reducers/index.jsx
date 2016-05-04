import { combineReducers } from 'redux';
import Auth from './Auth_Reducers';
import DummyData from './dummy_data';
import Jobs from './Jobs_Reducer';
import { reducer as formReducer } from 'redux-form';
import OfferReducers from './OfferReducers.jsx';

const rootReducer = combineReducers({
  auth: Auth,
  form: formReducer,
  data: DummyData,
  job: Jobs,
  offer: OfferReducers
});

export default rootReducer;
