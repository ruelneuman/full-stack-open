import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserLoginInfo from './components/UserLoginInfo';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import UserList from './components/UserList';
import User from './components/User';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Switch, Route, Redirect } from 'react-router-dom';


const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user); user;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  return (
    <>
      <Notification />
      <UserLoginInfo />

      <Switch>
        <UnauthenticatedRoute path="/login" component={LoginForm} />
        <AuthenticatedRoute exact path="/blogs/:id" component={Blog} />
        <AuthenticatedRoute path="/blogs" component={BlogList} />
        <AuthenticatedRoute exact path="/users/:id" component={User} />
        <AuthenticatedRoute exact path="/users" component={UserList} />
        <Route>
          <Redirect to="/blogs" />
        </Route>
      </Switch>
    </>
  );
};

export default App;