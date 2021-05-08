import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const CommentForm = ({ blog }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const { isLoggedIn } = useSelector((state) => state.authentication);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(addComment(blog.id, comment));

    setComment('');
  };

  if (!isLoggedIn) return null;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Enter Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">Add Comment</Button>
    </form>
  );
};

export default CommentForm;