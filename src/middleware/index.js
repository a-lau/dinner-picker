import { applyMiddleware }	from 'redux';
import promise			from 'redux-promise-middleware';
import logger			from 'redux-logger';

const middleware = applyMiddleware(promise(), thunk, logger());

export default middleware;
