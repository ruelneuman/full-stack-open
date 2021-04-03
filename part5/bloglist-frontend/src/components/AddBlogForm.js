import React, { useState } from 'react';
import blogService from '../services/blogs';

const AddBlogForm = ({ blogs, setBlogs, displayNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const AddBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    }

    try {
      const response = await blogService.create(blogObject);

      setBlogs(blogs.concat(response));
      setTitle('');
      setAuthor('');
      setUrl('');
      
      const message = `${response.title} by ${response.author} was added`;
      displayNotification(message, 'success');
    } catch (error) {
      console.error(error);
      displayNotification(error, 'failure');
    }
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={AddBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
};

export default AddBlogForm;