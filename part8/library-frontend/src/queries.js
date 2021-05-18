import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author)  {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook (
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor (
      name: $name
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOG_IN = gql`
mutation login(
  $username: String!
  $password: String!
) {
  login (
    username: $username
    password: $password
  ) {
    value
  }
}
`;

export const ME = gql`
  query me {
    me  {
      username
      favoriteGenre
      id
    }
  }
`;