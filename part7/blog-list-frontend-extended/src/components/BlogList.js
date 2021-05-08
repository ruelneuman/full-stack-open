import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs.blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  });

  const status = useSelector((state) => state.blogs.status);

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (status === 'failed') return <div>Error: Could not load blogs</div>;

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      <h1>Blogs</h1>
      {isLoggedIn && <Togglable buttonLabel="Add blog" >
        <AddBlogForm />
      </Togglable>}
      <List>
        {blogs.map((blog) => {
          return (
            <ListItem button component={Link} to={`/blogs/${blog.id}`} key={blog.id}>
              {blog.title}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default BlogList;