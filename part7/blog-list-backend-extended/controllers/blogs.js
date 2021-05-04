const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(200).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 });

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  const blogPosterIsUser = (blog.user.toString() === user._id.toString());

  if (!blogPosterIsUser) {
    return response.status(401).json({ error: 'user not authorized to delete this blog' });
  }

  await blog.delete();
  response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.title = body.title;
  blog.author = body.author;
  blog.url = body.url;
  blog.likes = body.likes;

  const updatedBlog = await blog.save();
  await updatedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();

  response.json(updatedBlog);
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Blog.findById(request.params.id, { comments: 1 });

  if (comments) {
    response.json(comments.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.comments = blog.comments.concat(body.comment);

  const savedBlog = await blog.save();
  await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();

  response.json(savedBlog);
});

module.exports = blogsRouter;