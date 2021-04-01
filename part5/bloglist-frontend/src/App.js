import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setInitialBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }

    setInitialBlogs();
  }, []);

  return (
    <>
      {
        !user
          ? <Login setUser={setUser} />
          : <BlogList blogs={blogs} user={user} />
      }
    </>
  )
};

export default App;