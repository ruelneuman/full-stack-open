import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  if (!user) return (<Login setUser={setUser} />);

  if (isError) return (<div>Error: Could not load blog list</div>);

  if (isLoading) return (<div>Loading...</div>);

  return (<BlogList blogs={blogs} user={user} />)
};

export default App;