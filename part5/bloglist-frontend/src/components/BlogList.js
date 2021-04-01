import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, user }) => (
  <div>
    <h2>Blogs</h2>
    <div>{user.name} is logged in</div>
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
);

export default BlogList;