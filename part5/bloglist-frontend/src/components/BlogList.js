import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, user, handleLogout }) => (
  <div>
    <h2>Blogs</h2>
    <div>
      <span>{user.name} is logged in</span>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
);

export default BlogList;