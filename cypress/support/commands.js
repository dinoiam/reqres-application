import users from '../fixtures/users.json';

Cypress.Commands.add('loginSuccessful', () => {
  cy.visit('/login');
  cy.intercept('POST', `*/login`, {
    statusCode: 200,
    body: { token: 'token' }
  }).as('login');
  cy.get("[type='email']").type('myemail@domain.com');
  cy.get("[type='password']").type('test');
  cy.get('button[data-testid="login"]').click();
});

Cypress.Commands.add('loginFail', () => {
  cy.intercept('POST', `*/login`, {
    statusCode: 400,
    body: { error: 'login error' }
  });

  cy.get("[type='email']").type('myemail@domain.com');
  cy.get("[type='password']").type('test');
  cy.get('button[data-testid="login"]').click();
});

Cypress.Commands.add('mockFetchUsers', () => {
  cy.intercept('GET', `*/users*`, {
    statusCode: 200,
    body: users
  });
});
