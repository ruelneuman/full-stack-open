import React, { useState } from 'react';

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
  }

  const confirmRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  }

  const details = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button type="button" onClick={likeBlog}>like</button>
        </div>
        <div>{blog.author}</div>
        {ownedByUser && (
          <button type="button" onClick={confirmRemoveBlog}>
            Remove
          </button>
        )}
      </>
    );
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button type="button" onClick={toggleExpansion}>
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {isExpanded && details()}
    </div>
  );
}

export default Blog;