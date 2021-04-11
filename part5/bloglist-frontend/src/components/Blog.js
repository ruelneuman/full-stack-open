import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ownedByUser = (user.username === blog.user.username);

  const blogStyle = {
    border: '1px solid black',
    margin: '5px 0px',
    padding: '4px',
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const likeBlog = () => {
    const newBlog = { ...blog, likes: (blog.likes + 1) };

    updateBlog(blog.id, newBlog);
  };

  const confirmRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  const details = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button type="button" onClick={likeBlog}>like</button>
        </div>
        {ownedByUser && (
          <button type="button" onClick={confirmRemoveBlog}>
            Remove
          </button>
        )}
      </>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleExpansion}>
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {isExpanded && details()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;