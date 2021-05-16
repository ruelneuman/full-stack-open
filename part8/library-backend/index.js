const { MONGODB_URI } = require('./utils/config');
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

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
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String 
        genre: String
      ): [Book!]!
    allAuthors: [Author!]!
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
  },
  Author: {
    bookCount: (root) => {
      return Book.countDocuments({ author: root.id });
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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

      return await book.populate('author').execPopulate();
    },
    editAuthor: async (root, { name, setBornTo }) => {
      const author = await Author.findOne({ name });

      if (!author) return null;

      author.born = setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { name, setBornTo }
        });
      }

      return author;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});