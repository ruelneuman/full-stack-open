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

  const { user, isLoggedIn } = useSelector((state) => state.authentication);

  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const confirmRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (!blog) return null;

  return (
    <div className="blog">
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a
        href={blog.url.startsWith('http') ? blog.url : `http://${blog.url}`}
        target="_blank"
        rel="noreferrer"
      >
        {blog.url}
      </a>
      <div>
        {blog.likes} likes
        {isLoggedIn && <button type="button" onClick={handleLike}>like</button>}
      </div>
      <div>
        Added by {blog.user.name}
        {user && user.username === blog.user.username && (
          <button type="button" onClick={confirmRemoveBlog}>
            Remove
          </button>
        )}
      </div>

    </div>
  );
};

export default Blog;