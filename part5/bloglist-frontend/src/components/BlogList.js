import React from 'react';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, addBlog, updateBlog }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="Add blog" >
        <AddBlogForm addBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
          />
        )}
      </div>
    </div>
  );
}

export default BlogList;