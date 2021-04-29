import React from 'react';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
import { useSelector } from 'react-redux';

const BlogList = ({ updateBlog, removeBlog, user }) => {
  const blogs = useSelector((state) => {
    return state.blogs.blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  });

  return (
    <div className="blog-list">
      <h1>Blogs</h1>
      <Togglable buttonLabel="Add blog" >
        <AddBlogForm />
      </Togglable>
      <div className="blogs">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default BlogList;