# Full Stack Open 2021
This repository contains my projects and solutions for parts 0 through 9 of the [Full Stack Open 2021](https://fullstackopen.com/en/) course from the University of Helsinki.

The course covers many important topics of full stack web development such as:
- React
- Redux
- Node.js
- Express
- REST APIs
- GraphQL
- MongoDB
- TypeScript

The course was estimated to take about 20 hours per part to complete. However, to maximize my learning potential I generally spent anywhere from 25 to 40 hours per part. I found this extra time to be very beneficial. I was able to review my code and refator it for better readablity and ease of maintenance.

A summary of the course contents is found below:

## Part 0 - [Fundamentals of Web Apps](https://fullstackopen.com/en/part0)

Topics:
- HTML/CSS
- HTTP requests
- JSON
- The Document Object Model (DOM)
- JavaScript libraries

Projects:
- [Sequence diagrams](https://github.com/ruelneuman/full-stack-open/tree/master/part0) - Diagrams to illustrate the chain of events during network communication for single page apps and for traditional apps

## Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

Topics:
- React
- Props
- Event handlers
- State management using hooks

Projects:
- [Course Info](https://github.com/ruelneuman/full-stack-open/tree/master/part1/courseinfo) - A simple page to display course information.
- [Unicafe](https://github.com/ruelneuman/full-stack-open/tree/master/part1/unicafe) - A feedback page and statistics page to demonstrate state using React hooks.
- [Anecdotes](https://github.com/ruelneuman/full-stack-open/tree/master/part1/anecdotes) - A page that shows the user random anecdotes that can be voted upon.

## Part 2 - [Communicating with the Server](https://fullstackopen.com/en/part2)

Topics:
- HTTP requests using [axios](https://github.com/axios/axios)
- 3rd party APIs
- Forms
- Rendering collections of data from the server

Projects:
- [Course Info 2](https://github.com/ruelneuman/full-stack-open/tree/master/part2/courseinfo2) - A continuation of the project from the part 1 that has been refactored into a more maintainable structure
- [Countries](https://github.com/ruelneuman/full-stack-open/tree/master/part2/countries) - A page that pulls country and weather data from 3rd party APIs as the user searches for country names.
- [Phonebook Frontend](https://github.com/ruelneuman/full-stack-open/tree/master/part2/phonebook) - A phonebook frontend that displays and filters phonebook entries. New entries can be added, deleted, or modified. [JSON server](https://github.com/typicode/json-server) is used as a mock REST API.

## Part 3 - [Programming a Server with Node.js and Express](https://fullstackopen.com/en/part3)

Topics:
- REST APIs using [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- Express middleware for logging, error handling, etc.
- [ESlint](https://eslint.org/)

Projects:
- [Phonebook Backend](https://github.com/ruelneuman/full-stack-open/tree/master/part3/phonebook-backend) - An RESTful backend in Express for the phonebook frontend from the previous part. Uses Mongoose and a MongoDB database.

## Part 4 - [Testing Express Servers, User Administration](https://fullstackopen.com/en/part4)

Topics:
- Unit testing and integration testing [Express](https://expressjs.com/) backends with [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest)
- User authentication using using [JSON web tokens](https://jwt.io/)
- Password hashing using [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

Projects:
- [Blog List Backend](https://github.com/ruelneuman/full-stack-open/tree/master/part4/blog-list-backend) - A RESTful backend in Express for adding, editing or fetching blog post data. Certain endpoints are limited to authenticated users only. Unit and integration tests were done using Jest and SuperTest.

## Part 5 - [Testing React Apps](https://fullstackopen.com/en/part5)

Topics:
- Unit testing of React components using [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library)
- End-to-end testing of full stack applications using [Cypress](https://www.cypress.io/)
- Handling login on the frontend using [JSON web tokens](https://jwt.io/)
- Defining props using [PropTypes](https://github.com/facebook/prop-types)

Projects:
- [Blog List Frontend](https://github.com/ruelneuman/full-stack-open/tree/master/part5/bloglist-frontend) - A React frontend for the blog list backend from the previous part. Users can add or like their favourite blog posts. Unit testing of React components was done using Jest and React Testing Library. End-to-End testing of the full stack application was done using Cypress.

## Part 6 - [State Management with Redux](https://fullstackopen.com/en/part6)

Topics:
- [Redux](https://redux.js.org/) for state management (using both hooks and connect)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) middleware for asynchronous actions

Projects:
- [Unicafe Redux](https://github.com/ruelneuman/full-stack-open/tree/master/part6/unicafe-redux) - A revisiting of the unicafe app from part 1 with Redux for state management. Tests for the reducer were implemented using Jest.
- [Redux Anecdotes](https://github.com/ruelneuman/full-stack-open/tree/master/part6/redux-anecdotes) - A revisiting of the anecdotes app from part 1 with Redux for state management. Uses reducers for notifications, filtering data, and initializing/adding/voting for anecodtes. Uses Redux Thunk middleware for for asynchronous actions.

## Part 7 - [React Router, Custom Hooks, Styling Apps with CSS and webpack](https://fullstackopen.com/en/part7)

Topics:
- [React Router](https://reactrouter.com/)
- Custom React hooks
- React class components
- UI libraries including [React-Bootstrap](https://react-bootstrap.github.io/) and [Material-UI](https://material-ui.com/)
- [styled-components](https://styled-components.com/)
- [webpack](https://webpack.js.org/)

## Part 8 - [GraphQL](https://fullstackopen.com/en/part8)

## Part 9 - [TypeScript](https://fullstackopen.com/en/part9)




