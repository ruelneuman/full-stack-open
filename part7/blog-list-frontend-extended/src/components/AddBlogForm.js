import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const AddBlogForm = ({ toggleVisibility }) => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    };

    dispatch(addBlog(blogObject));

    toggleVisibility && toggleVisibility();

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default AddBlogForm;