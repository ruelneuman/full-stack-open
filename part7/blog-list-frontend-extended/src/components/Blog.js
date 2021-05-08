import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import Comments from './Comments';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1)
  },
}));

const Blog = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const id = useParams().id;
  const history = useHistory();

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
      history.push('/');
    }
  };

  if (!blog) return null;

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <Link
        href={blog.url.startsWith('http') ? blog.url : `http://${blog.url}`}
        target="_blank"
        rel="noreferrer"
      >
        {blog.url}
      </Link>
      <div>
        {blog.likes} likes
        {isLoggedIn &&
          <Button className={classes.button} color="primary" size="small" onClick={handleLike}>
            like
          </Button>}
      </div>
      <div>
        Added by {blog.user.name}
        {user && user.username === blog.user.username && (
          <Button className={classes.button} color="secondary" size="small" onClick={confirmRemoveBlog}>
            Remove
          </Button>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;