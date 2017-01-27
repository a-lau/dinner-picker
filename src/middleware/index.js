import { applyMiddleware }	from 'redux';
import promise			from 'redux-promise-middleware';
import logger			from 'redux-logger';

const middleware = applyMiddleware(promise(), logger());

export default middleware;
