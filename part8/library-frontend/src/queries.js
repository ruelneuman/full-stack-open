import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
      born
      bookCount
      id
    }
    id
  }
`;

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors  {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author)  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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

export const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;