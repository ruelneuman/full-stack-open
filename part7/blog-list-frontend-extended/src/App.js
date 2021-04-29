import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotificationWithTimeout } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import loginService from './services/login';
import handleError from './utils/handleError';

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogsStatus = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (blogsStatus === 'idle') {
      dispatch(initializeBlogs());
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

      const message = 'Logged in';
      dispatch(showNotificationWithTimeout(message, 'success'));
    } catch (error) {
      const message = `Login unsuccessful: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'failure'));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);

    const message = 'Logged out';
    dispatch(showNotificationWithTimeout(message, 'success'));
  };

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Notification />
      <UserInfo user={user} handleLogout={handleLogout} />
      <BlogList user={user} />
    </>
  );
};

export default App;