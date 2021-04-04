import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const details = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button type="button" onClick={likeBlog}>like</button>
        </div>
        <div>{blog.author}</div>
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