import { createStore } from 'redux';

import middleware from '../middleware/index.js';
import reducers from '../reducers/index.js';

export default createStore(reducers, middleware);
