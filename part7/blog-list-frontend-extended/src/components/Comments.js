import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  const comments = blog.comments;

  return (
    <div>
      <h3>Comments:</h3>
      <CommentForm blog={blog} />
      <ul>
        {comments.map((comment) => {
          return <li key={uuidv4()}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Comments;