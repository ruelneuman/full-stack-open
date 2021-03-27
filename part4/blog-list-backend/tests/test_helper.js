const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
];

const plaintextInitialUsers = [
  {
    username: 'Real_Batman123',
    name: 'Bruce Wayne',
    password: 'robinisthebest'
  },
  {
    username: 'JohnDoe85',
    name: 'John Doe',
    password: 'letmein123'
  },
  {
    username: 'BobBarker78',
    name: 'Bob Barker',
    password: 'thepriceisright'
  }
];

const hashedInitialUsers = plaintextInitialUsers.map((user) => {
  const passwordHash = bcrypt.hashSync(user.password, 10);
  return {
    username: user.username,
    name: user.name,
    passwordHash
  };
});

const validBlog = {
  title: 'My Blog Post',
  author: 'John Doe',
  url: 'http://example.com/example/2021/03/15/example.html',
  likes: 12
};

const blogWithMissingTitle = {
  author: 'John Doe',
  url: 'http://example.com/example/2021/03/15/example.html',
  likes: 12
};

const blogWithMissingUrl = {
  title: 'My Blog Post',
  author: 'John Doe',
  likes: 12
};

const blogWithMissingLikes = {
  title: 'My Blog Post',
  author: 'John Doe',
  url: 'http://example.com/example/2021/03/15/example.html'
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will Remove This Soon',
    author: 'Will Remove',
    url: 'http://example.com/will-remove/2021/03/15/will-remove.html',
    likes: 0,
  });

  await blog.save();
  await blog.delete();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  plaintextInitialUsers,
  hashedInitialUsers,
  validBlog,
  blogWithMissingTitle,
  blogWithMissingUrl,
  blogWithMissingLikes,
  nonExistingId,
  blogsInDb,
  usersInDb,
};