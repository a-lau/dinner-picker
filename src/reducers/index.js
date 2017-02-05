import { combineReducers } 		from 'redux';
import { reducer as reduxFormReducer } 	from 'redux-form';

import tab from './tabReducer.js';
import selectionListReducer from './selectionListReducer.js';
import eatenListReducer from './eatenListReducer.js';

export default combineReducers({
  tab: tab,
  slist: selectionListReducer,
  elist: eatenListReducer,
  form: reduxFormReducer
});
