import users from './../fixtures/users.json';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser(users[0]);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to Application');
    cy.get('#login-form').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      const { username, password } = users[0];

      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get('#blog-list').should('be.visible');
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      const username = 'fakeusername';
      const password = 'fakepassword';

      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get('#blog-list').should('not.exist');
      cy.get('#login-form').should('be.visible');
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});