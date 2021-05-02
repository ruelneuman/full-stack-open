import React from 'react';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs.blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  });

  const status = useSelector((state) => state.blogs.status);

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (status === 'failed') return <div>Error: Could not load blogs</div>;

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="blog-list">
      <h1>Blogs</h1>
      {isLoggedIn && <Togglable buttonLabel="Add blog" >
        <AddBlogForm />
      </Togglable>}
      <div className="blogs">
        {blogs.map((blog) =>
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div>{blog.title}</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogList;