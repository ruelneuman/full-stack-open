const { JWT_SECRET } = require('./utils/config');
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: (root, args, { loaders }) => {
      return loaders.bookCount.load(root.id);
    }
  },
  Query: {
    bookCount: () => Book.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        query.author = author?._id;
      }

      if (args.genre) {
        query.genres = args.genre;
      }

      return Book.find(query).populate('author');
    },
    authorCount: () => Author.countDocuments(),
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const name = args.author;

      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });

        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      const savedBook = await book.populate('author').execPopulate();

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });

      return savedBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return user;
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'password') {
        throw new UserInputError('Invalid username or password');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

module.exports = { resolvers };