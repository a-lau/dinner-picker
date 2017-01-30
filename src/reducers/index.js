import { combineReducers } 		from 'redux';
import { reducer as reduxFormReducer } 	from 'redux-form';

import tab from './tabReducer.js';
import selectionlistReducer from './selectionlistReducer.js';

export default combineReducers({
  tab: tab,
  slist: selectionlistReducer,
  form: reduxFormReducer
});
