import React from 'react';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';

const BlogList = ({ blogs, setBlogs, user, handleLogout, displayNotification }) => (
  <div>
    <h1>Blogs</h1>
    <div>
      <span>{user.name} is logged in</span>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
    <AddBlogForm
      blogs={blogs}
      setBlogs={setBlogs}
      displayNotification={displayNotification}
    />
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
);

export default BlogList;