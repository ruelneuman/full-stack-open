# Full Stack Open 2021
This repository contains my projects and solutions for the [Full Stack Open](https://fullstackopen.com/en/) course from the University of Helsinki. Parts 0 to 9 are contained within this repository. Parts 10 to 13 are contained in separate repositories (links are in the associated sections below).

The course covers many topics of full stack web development such as:
- React
- Redux
- Node.js
- Express
- REST APIs
- GraphQL
- MongoDB
- Relational Databases
- TypeScript
- React Native
- Unit testing, integration testing, and end-to-end testing
- CI/CD

The course was estimated to take about 20 hours per part to complete. However, to maximize my learning potential I generally spent anywhere from 25 to 40 hours per part. I found this extra time to be very beneficial. I was able to review my code and refator it for better readablity and ease of maintenance.

## Summary of Course Contents and Projects

### Part 0 - [Fundamentals of Web Apps](https://fullstackopen.com/en/part0)

Topics:
- HTML/CSS
- HTTP requests
- JSON
- The Document Object Model (DOM)
- JavaScript libraries

Projects:
- [Sequence diagrams](https://github.com/ruelneuman/full-stack-open/tree/master/part0) - Diagrams to illustrate the chain of events during network communication for single page apps and for traditional apps

### Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

Topics:
- React
- Props
- Event handlers
- State management using hooks

Projects:
- [Course Info](https://github.com/ruelneuman/full-stack-open/tree/master/part1/courseinfo) - A simple page to display course information.
- [Unicafe](https://github.com/ruelneuman/full-stack-open/tree/master/part1/unicafe) - A feedback page and statistics page to demonstrate state using React hooks.
- [Anecdotes](https://github.com/ruelneuman/full-stack-open/tree/master/part1/anecdotes) - A page that shows the user random anecdotes that can be voted upon.

### Part 2 - [Communicating with the Server](https://fullstackopen.com/en/part2)

Topics:
- HTTP requests using [axios](https://github.com/axios/axios)
- 3rd party APIs
- Forms
- Rendering collections of data from the server

Projects:
- [Course Info 2](https://github.com/ruelneuman/full-stack-open/tree/master/part2/courseinfo2) - A continuation of the project from the part 1 that has been refactored into a more maintainable structure
- [Countries](https://github.com/ruelneuman/full-stack-open/tree/master/part2/countries) - A page that pulls country and weather data from 3rd party APIs as the user searches for country names.
- [Phonebook Front End](https://github.com/ruelneuman/full-stack-open/tree/master/part2/phonebook) - A phonebook front end that displays and filters phonebook entries. New entries can be added, deleted, or modified. [JSON server](https://github.com/typicode/json-server) is used as a mock REST API.

### Part 3 - [Programming a Server with Node.js and Express](https://fullstackopen.com/en/part3)

Topics:
- REST APIs using [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- Express middleware for logging, error handling, etc.
- [ESlint](https://eslint.org/)

Projects:
- [Phonebook Back End](https://github.com/ruelneuman/full-stack-open/tree/master/part3/phonebook-backend) - An RESTful back end in Express for the phonebook front end from the previous part. Uses Mongoose and a MongoDB database.

### Part 4 - [Testing Express Servers, User Administration](https://fullstackopen.com/en/part4)

Topics:
- Unit testing and integration testing [Express](https://expressjs.com/) back ends with [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest)
- User 
entication using using [JSON web tokens](https://jwt.io/)
- Password hashing using [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

Projects:
- [Blog List Back End](https://github.com/ruelneuman/full-stack-open/tree/master/part4/blog-list-backend) - A RESTful back end in Express for creating, reading, and updating blog post data. Certain endpoints are limited to authenticated users only. Unit and integration tests were done using Jest and SuperTest.

### Part 5 - [Testing React Apps](https://fullstackopen.com/en/part5)

Topics:
- Unit testing of React components using [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library)
- End-to-end testing of full stack applications using [Cypress](https://www.cypress.io/)
- Handling login on the front end using [JSON web tokens](https://jwt.io/)
- Defining props using [PropTypes](https://github.com/facebook/prop-types)

Projects:
- [Blog List Front End](https://github.com/ruelneuman/full-stack-open/tree/master/part5/bloglist-frontend) - A React front end for the blog list back end from the previous part. Users can add or like their favourite blog posts. Unit testing of React components was done using Jest and React Testing Library. End-to-End testing of the full stack application was done using Cypress.

### Part 6 - [State Management with Redux](https://fullstackopen.com/en/part6)

Topics:
- [Redux](https://redux.js.org/) for state management (using both hooks and connect)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) middleware for asynchronous actions

Projects:
- [Unicafe Redux](https://github.com/ruelneuman/full-stack-open/tree/master/part6/unicafe-redux) - A revisiting of the unicafe app from part 1 with Redux for state management. Tests for the reducer were implemented using Jest.
- [Redux Anecdotes](https://github.com/ruelneuman/full-stack-open/tree/master/part6/redux-anecdotes) - A revisiting of the anecdotes app from part 1 with Redux for state management. Uses reducers for notifications, filtering data, and initializing/adding/voting for anecodtes. Uses Redux Thunk middleware for for asynchronous actions.

### Part 7 - [React Router, Custom Hooks, Styling Apps with CSS and webpack](https://fullstackopen.com/en/part7)

Topics:
- [React Router](https://reactrouter.com/)
- Custom React hooks
- React class components
- UI libraries including [React-Bootstrap](https://react-bootstrap.github.io/) and [Material-UI](https://material-ui.com/)
- [styled-components](https://styled-components.com/)
- [webpack](https://webpack.js.org/)

Projects:
- [Routed Anecdotes](https://github.com/ruelneuman/full-stack-open/tree/master/part7/routed-anecdotes) - A revisiting of the anecdotes app from part 1 with React Router and custom hooks. Routes were implemented for viewing each anecdote and for the anecdote creation form. Notifications were also implemented. A custom hook was created for handling form fields.
- [Country Hook](https://github.com/ruelneuman/full-stack-open/tree/master/part7/country-hook) - A revisiting of the country app from part 2 with a custom hook for getting country information from a 3rd party API.
- [Ultimate Hooks](https://github.com/ruelneuman/full-stack-open/tree/master/part7/ultimate-hooks) - Created a custom hook for communicating with the back end and maintaining the state of retrieved resources
- [Extended Blog List Front End](https://github.com/ruelneuman/full-stack-open/tree/master/part7/blog-list-frontend-extended) / [Extended Blog List Back End](https://github.com/ruelneuman/full-stack-open/tree/master/part7/blog-list-backend-extended) - A full stack application that was extended from the blog app from parts 4 and 5. It is used to share blog post with friends who can then like or comment on them. Redux is used for state management and React Router for routing. Improved styling is accomplished with Material-UI. There is a RESTful back end made with Express. Data is stored using MongoDB. Users are authenticated with JSON web tokens and only authenticated users can comment on or like posts. [Screenshots](https://github.com/ruelneuman/full-stack-open/tree/master/part7/blog-list-frontend-extended)

### Part 8 - [GraphQL](https://fullstackopen.com/en/part8)

Topics:
- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/)
- [DataLoader](https://github.com/graphql/dataloader)

Projects:
- [Library Front End](https://github.com/ruelneuman/full-stack-open/tree/master/part8/library-frontend) / [Library Back End](https://github.com/ruelneuman/full-stack-open/tree/master/part8/library-backend) - A full stack app that provides book and author information and allows users to post new books to the database. Uses Apollo Server in the back end to handle GraphQL queries, and uses Apollo Client in the front end for sending GraphQL queries and to cache results. Uses DataLoader to batch GraphQL queries together, and subscriptions to ensure the front end stays up to date as the MongoDB database is updated.

### Part 9 - [TypeScript](https://fullstackopen.com/en/part9)

Topics:
- [TypeScript](https://www.typescriptlang.org/)
- [Formik](https://formik.org/docs/overview)
- [Yup](https://github.com/jquense/yup)
- [Semantic UI React](https://react.semantic-ui.com/)

Projects:
- [BMI](https://github.com/ruelneuman/full-stack-open/tree/master/part9/bmi) - A simple Express back end to demonstrate the utility of TypeScript. Provides some simple BMI and exercise calculators.
- [Course Info Typescript](https://github.com/ruelneuman/full-stack-open/tree/master/part9/courseinfo-typescript) - A simple app to demonstrate the use of TypeScript with React. It is an extension of the course info app from part 1.
- [Patientor Front End](https://github.com/ruelneuman/full-stack-open/tree/master/part9/patientor-frontend) / [Patientor Back End](https://github.com/ruelneuman/full-stack-open/tree/master/part9/patientor-backend) - A medical record app that provides and updates patient details and medical records. The front end and back end were coded using TypeScript to ensure proper handling of widely varying data types for the medical records. There is a RESTful back end with endpoints for fetching and updating medical records. The provided front end was expanded to add pages for displaying patient details and medical records. Formik and Yup were used to create a maintainable form for adding medical records. Semantic UI React was also used. [Screenshots](https://github.com/ruelneuman/full-stack-open/tree/master/part9/patientor-frontend).

### Part 10 - [React Native](https://fullstackopen.com/en/part10)

Topics:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

Projects:
- [Rate Repository App](https://github.com/ruelneuman/full-stack-open-part10) - A React Native frontend for a pre-made GraphQL back end. The app displays a list of GitHub repositories that users have rated and reviewed. The list can be filtered and sorted, and it can be infinitely scrolled. Signed-in users can create reviews for any public GitHub repository. They can see a list of all repositories they've reviewed and delete any of their reviews. The app utilized Formik and Yup for forms and form data validation. [Screenshots](https://github.com/ruelneuman/full-stack-open-part10)

### Part 11 - [CI/CD](https://fullstackopen.com/en/part11)

Topics:
- CI/CD using [GitHub Actions](https://docs.github.com/en/actions)

Projects:
- [CI/CD pipeline for a Pokedex App](https://github.com/ruelneuman/full-stack-open-pokedex) - Created a CI/CD pipeline using GitHub actions for a pre-built Pokedex app. The pipeline includes linting, building, unit tests, end-to-end tests, deployment to Heroku, version tagging, and Slack notifications.
- [CI/CD pipeline for the Redux Anecdotes App](https://github.com/ruelneuman/full-stack-open-part11-pipeline/tree/main/src) - Created a CI/CD pipeline using GitHub actions for a the Redux Anecdotes app from part 6. The pipeline includes linting, building, unit tests, end-to-end tests, deployment to Heroku, and version tagging.

### Part 12 - [Containers](https://fullstackopen.com/en/part12)

To be completed.

### Part 13 - [Using Relational Databases](https://fullstackopen.com/en/part13)

Topics:
- [Sequelize](https://github.com/sequelize/sequelize) ORM
- [PostgreSQL](https://www.postgresql.org/)
- Database migrations

Projects:
- [Blog List Back End (SQL)](https://github.com/ruelneuman/full-stack-open-part13) - A recreation and extension of the previously created RESTful back end from Parts 4 and 7, but using PostgreSQL instead of MongoDB. The application is used for creating, reading, updating or deleting blog post and author data. Users can also create reading lists and mark blogs posts as read. User authentication is accomplished using JSON web tokens. Tokens can also be blacklisted to prevent further use and users can be disabled entirely. Complex data are returned using table joins, query strings to specify data subsets, and aggregate SQL functions to provide data summaries. Sequelize migrations are used to make database changes and to keep a log of those changes.
