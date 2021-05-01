import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Switch, Redirect } from 'react-router-dom';


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
      <UserInfo />

      <Switch>
        <UnauthenticatedRoute path="/login" component={LoginForm} />
        <AuthenticatedRoute path="/blogs" component={BlogList} />
        <AuthenticatedRoute path="/users" component={UserList} />
        <Redirect to="/blogs" />
      </Switch>
    </>
  );
};

export default App;