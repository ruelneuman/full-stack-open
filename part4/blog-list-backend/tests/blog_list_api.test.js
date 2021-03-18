const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('When there are initially some blogs saved', () => {
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

describe('Addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAfterPost).toContainEqual(response.body);
  });

  test('defaults likes to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithMissingLikes);

    expect(response.body.likes).toBe(0);
  });

  test('fails with status code 400 if the title or url properties are missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithMissingTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(helper.blogWithMissingUrl)
      .expect(400);
  });
});

describe('Deletion of a blog', () => {
  test('succeeds with a valid id', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAfterDelete).not.toContainEqual(blogToDelete);
  });

  test('fails with status code 404 if the blog does not exist', async () => {
    const id = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(404);
  });

  test.only('fails with status code 400 if the id is invalid', async () => {
    const invalidId = 'xxxxxxxxxxxxxx';

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

describe('Update of a blog', () => {
  test('succeeds with a valid id', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogtoUpdate = initialBlogs[0];

    const response = await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .send(helper.validBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterUpdate = await helper.blogsInDb();
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length);
    expect(blogsAfterUpdate).toContainEqual(response.body);
  });

  test('fails with status code 404 if the blog does not exist', async () => {
    const nonExistingid = await helper.nonExistingId();

    await api
      .put(`/api/blogs/${nonExistingid}`)
      .send(helper.validBlog)
      .expect(404);
  });

  test('fails with status code 400 if the id is invalid', async () => {
    const invalidId = 'xxxxxxxxxxxxxx';

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(helper.validBlog)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});