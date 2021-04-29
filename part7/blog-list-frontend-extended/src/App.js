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

  const updateBlog = async (id, blogObject) => {
    id, blogObject;
    // try {
    //   const response = await blogService.update(id, blogObject);

    //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));

    //   const message = `Liked ${response.title} by ${response.author}`;
    //   dispatch(showNotificationWithTimeout(message, 'success'));
    // } catch (error) {
    //   const message = `Unable to like: ${handleError(error)}`;
    //   dispatch(showNotificationWithTimeout(message, 'failure'));
    // }
  };

  const removeBlog = async (id) => {
    id;
    // try {
    //   await blogService.remove(id);

    //   setBlogs(blogs.filter((blog) => (blog.id !== id)));

    //   dispatch(showNotificationWithTimeout('Blog removed', 'success'));
    // } catch (error) {
    //   const message = `Unable to remove blog: ${handleError(error)}`;
    //   dispatch(showNotificationWithTimeout(message, 'failure'));
    // }
  };

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  // if (isError) return (<div>Error: Could not load blogs</div>);

  // if (isLoading) return (<div>Loading...</div>);

  return (
    <>
      <Notification />
      <UserInfo user={user} handleLogout={handleLogout} />
      <BlogList
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        user={user}
      />
    </>
  );
};

export default App;