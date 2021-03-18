const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(200).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);
  if (result === null) {
    response.status(404).end();
  } else {
    response.status(204).end();
  }
});

module.exports = blogsRouter;