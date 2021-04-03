import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const setInitialBlogs = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const blogs = await blogService.getAll();

        setBlogs(blogs);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    setInitialBlogs();
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
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

      const message = `Logged in`;
      displayNotification(message, 'success');
    } catch (error) {
      console.error(error);

      const message = `Incorrect username or password`;
      displayNotification(message, 'failure');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);

    const message = `Logged out`;
    displayNotification(message, 'success');
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);

      setBlogs(blogs.concat(response));
      
      const message = `${response.title} by ${response.author} was added`;
      displayNotification(message, 'success');
    } catch (error) {
      console.error(error);

      const message = 'Could not add blog';
      displayNotification(message, 'failure');
    }
  }

  const displayNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  if (!user) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  if (isError) return (<div>Error: Could not load blog list</div>);

  if (isLoading) return (<div>Loading...</div>);

  return (
    <>
      <Notification notification={notification} />
      <UserInfo user={user} handleLogout={handleLogout} />
      <BlogList blogs={blogs} addBlog={addBlog} />
    </>
  )
};

export default App;