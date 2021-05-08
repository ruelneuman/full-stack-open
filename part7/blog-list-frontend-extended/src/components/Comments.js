import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Comments = ({ blog }) => {
  const comments = blog.comments;

  return (
    <div>
      <h3>Comments:</h3>
      <List>
        {comments.map((comment) => <ListItem key={uuidv4()}>{comment}</ListItem>)}
      </List>
      <CommentForm blog={blog} />
    </div>
  );
};

export default Comments;