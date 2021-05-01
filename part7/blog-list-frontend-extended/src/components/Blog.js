import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();

  const id = useParams().id;

  const blog = useSelector((state) => {
    return state.blogs.blogs.find((blog) => {
      return blog.id === id;
    });
  });

  const user = useSelector((state) => {
    return state.authentication.user;
  });

  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const confirmRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (!blog || !user) return null;

  const ownedByUser = (user.username === blog.user.username);

  return (
    <div className="blog">
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url.startsWith('http') ? blog.url : `http://${blog.url}`}>
        {blog.url}
      </a>
      <div>
        {blog.likes} likes
        <button type="button" onClick={handleLike}>like</button>
      </div>
      <div>
        Added by {user.name}
        {ownedByUser && (
          <button type="button" onClick={confirmRemoveBlog}>
            Remove
          </button>
        )}
      </div>

    </div>
  );
};

export default Blog;