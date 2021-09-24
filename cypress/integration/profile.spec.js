import users from '../fixtures/users.json';

describe('Profile', () => {
  describe('if the email is not valid', () => {
    it('should show the error message', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();
      cy.get('input[data-testid="email"]').clear().type('updated.email@email');

      expect(cy.contains('Please enter a valid Email'));
    });
  });

  describe('if the first name is empty', () => {
    it('should show the error message', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();
      cy.get('input[data-testid="firstName"]').clear();

      expect(cy.contains('Please enter the first name'));
    });
  });

  describe('if the last name is empty', () => {
    it('should show the error message', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();
      cy.get('input[data-testid="lastName"]').clear();

      expect(cy.contains('Please enter the last name'));
    });
  });

  it('should have the first_name, the email and the last_name prefilled', () => {
    cy.loginSuccessful();
    cy.mockFetchUsers();
    cy.contains(users.data[0].first_name).click();

    expect(cy.get('input[data-testid="firstName"]').should('have.value', users.data[0].first_name));
    expect(cy.get('input[data-testid="lastName"]').should('have.value', users.data[0].last_name));
    expect(cy.get('input[data-testid="email"]').should('have.value', users.data[0].email));
  });

  describe('on click on update user', () => {
    it('should go the searh page and show the updated user', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();

      expect(cy.get('input[data-testid="firstName"]').clear().type('updated first name'));
      expect(cy.get('input[data-testid="lastName"]').clear().type('updated last name'));
      expect(cy.get('input[data-testid="email"]').clear().type('updated.email@email.com'));

      cy.get('button[data-testid="update_user"]').click();

      expect(cy.location('pathname').should('eq', '/'));
    });

    it('should show the updated user', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();

      expect(cy.get('input[data-testid="firstName"]').clear().type('updated first name'));
      expect(cy.get('input[data-testid="lastName"]').clear().type('updated last name'));
      expect(cy.get('input[data-testid="email"]').clear().type('updated.email@email.com'));

      cy.get('button[data-testid="update_user"]').click();

      expect(cy.contains('updated first name'));
      expect(cy.contains('updated last name'));
      expect(cy.contains('updated.email@email.com'));
    });
  });

  describe('on click on back button', () => {
    it('should go to the home page', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();
      cy.get('button[data-testid="back"]').click();

      expect(cy.location('pathname').should('eq', '/'));
    });
  });
});
