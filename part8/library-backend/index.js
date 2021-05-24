const { MONGODB_URI, JWT_SECRET } = require('./utils/config');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const DataLoader = require('dataloader');
const { batchBookCounts } = require('./loaders');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

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