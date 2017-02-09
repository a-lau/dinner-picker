import { combineReducers } from 'redux';

import tab from './tabReducer.js';
import selectionListReducer from './selectionListReducer.js';
import eatenListReducer from './eatenListReducer.js';
import foodChoiceReducer from './foodChoiceReducer.js';

export default combineReducers({
  tab: tab,
  slist: selectionListReducer,
  elist: eatenListReducer,
  foodChoice: foodChoiceReducer,
});
