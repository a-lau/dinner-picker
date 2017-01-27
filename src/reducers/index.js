import { combineReducers } 		from 'redux';
import { reducer as reduxFormReducer } 	from 'redux-form';

import Tab from './tabReducer.js';

export default combineReducers({
  Tab: Tab,
  form: reduxFormReducer
});
