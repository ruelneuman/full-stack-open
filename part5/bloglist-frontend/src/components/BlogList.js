import React from 'react';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';

const BlogList = ({ blogs, addBlog }) => (
  <div>
    <h1>Blogs</h1>
    <AddBlogForm addBlog={addBlog}/>
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
);

export default BlogList;