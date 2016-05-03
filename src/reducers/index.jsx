import { combineReducers } from 'redux';
import Auth from './Auth_Reducers';
import DummyData from './dummy_data';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: Auth,
  form: formReducer,
  data: DummyData,
});

export default rootReducer;
