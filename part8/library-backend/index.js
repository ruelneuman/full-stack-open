const { MONGODB_URI, JWT_SECRET } = require('./utils/config');
const { ApolloServer, UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server');
const mongoose = require('mongoose');
const DataLoader = require('dataloader');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const pubsub = new PubSub();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String 
        genre: String
      ): [Book!]!
    allAuthors: [Author!]!
    me: User
    }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
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
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: (root, args, { loaders }) => {
      return loaders.bookCount.load(root.id);
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

const getUser = async (req) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), JWT_SECRET
    );
    const user = await User.findById(decodedToken.id);

    return user;
  }

  return null;
};

const batchBookCounts = async (authorIds) => {
  const books = await Book.find({});

  const bookCounts = books.reduce((bookCounts, book) => {
    const authorId = book.author;

    bookCounts[authorId] = (bookCounts[authorId] || 0) + 1;

    return bookCounts;
  }, {});

  return authorIds.map((authorId) => bookCounts[authorId] || 0);
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const currentUser = await getUser(req);
      return {
        currentUser,
        loaders: {
          bookCount: new DataLoader((AuthorId) => batchBookCounts(AuthorId)),
        },
      };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});