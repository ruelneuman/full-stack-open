const Book = require('./models/book');

const batchBookCounts = async (authorIds) => {
  const books = await Book.find({});

  const bookCounts = books.reduce((bookCounts, book) => {
    const authorId = book.author;

    bookCounts[authorId] = (bookCounts[authorId] || 0) + 1;

    return bookCounts;
  }, {});

  return authorIds.map((authorId) => bookCounts[authorId] || 0);
};

module.exports = { batchBookCounts };