import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const User = () => {
  const id = useParams().id;

  const user = useSelector((state) => {
    return state.users.users.find((user) => {
      return user.id === id;
    });
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Blogs Added:</h2>
      <List>
        {user.blogs.map((blog) => {
          return <ListItem key={blog.id}>{blog.title}</ListItem>;
        })}
      </List>
    </div>
  );
};

export default User;