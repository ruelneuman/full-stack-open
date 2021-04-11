import users from './../fixtures/users.json';
import blogs from './../fixtures/blogs.json';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser(users[0]);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to Application');
    cy.get('.login-form').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      const { username, password } = users[0];

      cy.get('input[name="username-input"]').type(username);
      cy.get('input[name="password-input"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get('.blog-list').should('be.visible');
      cy.get('.notification')
        .should('contain', 'Logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      const username = 'fakeusername';
      const password = 'fakepassword';

      cy.get('input[name="username-input"]').type(username);
      cy.get('input[name="password-input"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get('.blog-list').should('not.exist');
      cy.get('.login-form').should('be.visible');
      cy.get('.notification')
        .should('contain', 'Login unsuccessful')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      const { username, password } = users[0];
      cy.login({ username, password });
    });

    it('A blog can be created', function () {
      const { title, author, url } = blogs[0];

      cy.contains('button', 'Add blog')
        .should('be.visible')
        .click();

      cy.get('input[name="title-input"]').type(title);
      cy.get('input[name="author-input"]').type(author);
      cy.get('input[name="url-input"]').type(url);
      cy.get('button[type="submit"]').click();


      cy.get('.blogs .blog')
        .should('be.visible')
        .and('contain', `${title} by ${author}`);
    });
  });
});