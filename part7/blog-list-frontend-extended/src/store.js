import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authenticationReducer from './reducers/authenticationReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  authentication: authenticationReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;