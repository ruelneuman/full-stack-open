import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Notification />
      <UserInfo />
      <BlogList />
    </>
  );
};

export default App;