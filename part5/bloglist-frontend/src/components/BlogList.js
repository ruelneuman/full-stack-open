import React, { useRef } from 'react';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, addBlog }) => {
  const addBlogFormRef = useRef(null);

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="Add blog" ref={addBlogFormRef}>
        <AddBlogForm addBlog={addBlog} addBlogFormRef={addBlogFormRef} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );
}

export default BlogList;