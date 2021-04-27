const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);
let tokenForUserWithBlogs = null;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const users = await User.insertMany(helper.hashedInitialUsers);
  await Blog.insertMany(
    helper.initialBlogs.map((blog) => ({ ...blog, user: users[0]._id, }))
  );

  tokenForUserWithBlogs = jwt.sign(
    {
      username: users[0].username,
      id: users[0]._id,
    },
    process.env.SECRET
  );
});

// GET /api/blogs
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

// GET /api/blogs/:id
describe('Fetching a blog by id', () => {
  test('succeeds if a blog with that id exists', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToFetch = initialBlogs[0];

    const response = await api
      .get(`/api/blogs/${blogToFetch.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.id).toEqual(blogToFetch.id);
  });

  test('fails with status code 404 if the blog does not exist', async () => {
    const id = await helper.nonExistingId();

    await api
      .get(`/api/blogs/${id}`)
      .expect(404);
  });

  test('fails with status code 400 if the id is invalid', async () => {
    const invalidId = 'xxx';

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

// POST /api/blogs
describe('Addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.validBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAfterPost).toContainEqual(
      expect.objectContaining(helper.validBlog)
    );
  });

  test('fails with status code 401 if token not provided', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .expect(401);
  });

  test('defaults likes to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.blogWithMissingLikes);

    expect(response.body.likes).toBe(0);
  });

  test('fails with status code 400 if the title or url properties are missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.blogWithMissingTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.blogWithMissingUrl)
      .expect(400);
  });
});

// DELETE /api/blogs/:id
describe('Deletion of a blog', () => {
  test('succeeds with a valid id', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAfterDelete).not.toContainEqual(blogToDelete);
  });

  test('fails with status code 401 if token not provided', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401);
  });

  test('fails with status code 404 if the blog does not exist', async () => {
    const id = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .expect(404);
  });

  test('fails with status code 400 if the id is invalid', async () => {
    const invalidId = 'xxxxxxxxxxxxxx';

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .expect(400);
  });
});

// PUT /api/blogs/:id
describe('Update of a blog', () => {
  test('succeeds with a valid id', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogtoUpdate = initialBlogs[0];

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.validBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterUpdate = await helper.blogsInDb();
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length);
    expect(blogsAfterUpdate).toContainEqual(
      expect.objectContaining(helper.validBlog)
    );
  });

  test('fails with status code 401 if token not provided', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogtoUpdate = initialBlogs[0];

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .send(helper.validBlog)
      .expect(401);
  });

  test('fails with status code 404 if the blog does not exist', async () => {
    const nonExistingid = await helper.nonExistingId();

    await api
      .put(`/api/blogs/${nonExistingid}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.validBlog)
      .expect(404);
  });

  test('fails with status code 400 if the id is invalid', async () => {
    const invalidId = 'xxxxxxxxxxxxxx';

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(helper.validBlog)
      .expect(400);
  });
});

// POST /api/users
describe('Addition of a new user', () => {
  test('succeeds with a valid user', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Real_Batman',
      name: 'Bruce Wayne',
      password: 'robinisthebest',
    };

    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    expect(usersAtEnd).toContainEqual(
      expect.objectContaining({
        username: newUser.username,
        name: newUser.name
      })
    );
  });

  test('fails with status code 400 and apropriate error message if username is not unique', async () => {
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({
      username: 'User123',
      name: 'John Doe',
      passwordHash
    });

    await user.save();

    const userWithDuplicateUsername = {
      username: user.username,
      name: 'Bob Smith',
      password: 'mypass',
    };

    const result = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(userWithDuplicateUsername)
      .expect(400);

    expect(result.body.error).toContain('`username` to be unique');
  });

  test('fails with status code 400 and appropriate error message if the password is missing', async () => {
    const userWithoutPassword = {
      username: 'BobDoe',
      name: 'Bob Doe',
    };

    const result = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(userWithoutPassword)
      .expect(400);

    expect(result.body.error).toContain('password must be at least 3 characters');
  });

  test('fails with status code 400 and appropriate error message if the password is too short', async () => {
    const userWithShortPassword = {
      username: 'BobDoe',
      name: 'Bob Doe',
      password: 'a',
    };

    const result = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(userWithShortPassword)
      .expect(400);

    expect(result.body.error).toContain('password must be at least 3 characters');
  });

  test('fails with status code 400 and appropriate error message if the username is missing', async () => {
    const userWithoutUsername = {
      name: 'Bob Doe',
      password: 'mypassword',
    };

    const result = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(userWithoutUsername)
      .expect(400);

    expect(result.body.error).toContain('`username` is required');
  });

  test('fails with status code 400 and appropriate error message if the username is too short', async () => {
    const userWithShortUsername = {
      username: 'a',
      name: 'Bob Doe',
      password: 'mypassword',
    };

    const result = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${tokenForUserWithBlogs}`)
      .send(userWithShortUsername)
      .expect(400);

    expect(result.body.error).toContain('shorter than the minimum allowed length');
  });
});

afterAll(() => {
  mongoose.connection.close();
});