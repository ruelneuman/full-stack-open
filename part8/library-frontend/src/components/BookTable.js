import React from 'react';

const BookTable = ({ books }) => {
  if (!books || books.length <= 0) {
    return <div>No books found</div>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            Author
          </th>
          <th>
            Published
          </th>
        </tr>
        {books.map((book) =>
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;