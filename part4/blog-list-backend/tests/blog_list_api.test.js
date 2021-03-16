const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const blogPromises = blogObject.map((blog) => blog.save());
  await Promise.all(blogPromises);
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs have the id property and not the _id property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBeUndefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});