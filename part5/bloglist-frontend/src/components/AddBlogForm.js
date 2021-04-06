import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlogForm = ({ addBlog, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    };

    addBlog(blogObject);

    toggleVisibility && toggleVisibility();

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title-input">title:</label>
          <input
            type="text"
            value={title}
            name="title-input"
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author-input">author:</label>
          <input
            type="text"
            value={author}
            name="author-input"
            id="author-input"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url-input">url:</label>
          <input
            type="text"
            value={url}
            name="url-input"
            id="url-input"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default AddBlogForm;