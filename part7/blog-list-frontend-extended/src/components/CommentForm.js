import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/blogReducer';

const CommentForm = ({ blog }) => {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-input">title:</label>
      <input
        type="text"
        value={comment}
        name="comment-input"
        id='comment-input'
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;