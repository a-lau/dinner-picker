import { combineReducers } 		from 'redux';
import { reducer as reduxFormReducer } 	from 'redux-form';

import Form from './form_reducer.js';

export default combineReducers({
  Form: Form,
  form: reduxFormReducer
});
