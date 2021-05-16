const { MONGODB_URI } = require('./utils/config');
const { ApolloServer, gql } = require('apollo-server');
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, { author, genre }) => {
      if (!author && !genre) return Book.find({}).populate('author');

      // IMPLEMENT FILTER LIKE BELOW, BUT WITH MONGODB:
      // const filteredBooks = books.filter((book) => {
      //   if (author && book.author !== author) return false;

      //   if (genre && !book.genres.includes(genre)) return false;

      //   return true;
      // });

      // return filteredBooks;
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    // IMPLEMENT TO WORK WITH DB:
    // bookCount: (root) => {
    //   const bookCount = books.reduce((count, book) => {
    //     return book.author === root.name
    //       ? count + 1
    //       : count;
    //   }, 0);
    //   return bookCount;
    // }
  },
  Mutation: {
    addBook: async (root, args) => {
      const name = args.author;
      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      return await book.populate('author').execPopulate();
    },
    // IMPLEMENT TO WORK WITH DB:
    // editAuthor: (root, { name, setBornTo }) => {
    //   const author = authors.find((author) => author.name === name);

    //   if (!author) return null;

    //   const updatedAuthor = { ...author, born: setBornTo };

    //   authors = authors.map((author) => {
    //     return author.id !== updatedAuthor.id
    //       ? author
    //       : updatedAuthor;
    //   });

    //   return updatedAuthor;
    // },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});