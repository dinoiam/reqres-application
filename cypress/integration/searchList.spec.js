import users from '../fixtures/users.json';

describe('SearchList', () => {
  it('it should show the user list', () => {
    cy.loginSuccessful();
    cy.mockFetchUsers();

    users.data.map((user) => {
      expect(cy.contains(user.first_name));
      expect(cy.contains(user.last_name));
      expect(cy.contains(user.email));
    });
  });

  it('it should filter the user list by email', () => {
    cy.loginSuccessful();
    cy.mockFetchUsers();
    cy.get('input').type(users.data[0].email);
    cy.get('button[data-testid="search"]').click();

    expect(cy.contains(users.data[0].first_name));
    expect(cy.contains(users.data[0].last_name));
    expect(cy.contains(users.data[0].email));
    expect(cy.contains(users.data[1].first_name).should('not.exist'));
    expect(cy.contains(users.data[1].last_name).should('not.exist'));
    expect(cy.contains(users.data[1].email).should('not.exist'));
  });

  it('it should filter the user list by first_name', () => {
    cy.loginSuccessful();
    cy.mockFetchUsers();
    cy.get('input').type(users.data[1].first_name);
    cy.get('button[data-testid="search"]').click();

    expect(cy.contains(users.data[1].first_name));
    expect(cy.contains(users.data[1].last_name));
    expect(cy.contains(users.data[1].email));
    expect(cy.contains(users.data[0].first_name).should('not.exist'));
    expect(cy.contains(users.data[0].last_name).should('not.exist'));
    expect(cy.contains(users.data[0].email).should('not.exist'));
  });

  it('it should filter the user list by last_name', () => {
    cy.loginSuccessful();
    cy.mockFetchUsers();
    cy.get('input').type(users.data[2].last_name);
    cy.get('button[data-testid="search"]').click();

    expect(cy.contains(users.data[2].first_name));
    expect(cy.contains(users.data[2].last_name));
    expect(cy.contains(users.data[2].email));
    expect(cy.contains(users.data[0].first_name).should('not.exist'));
    expect(cy.contains(users.data[0].last_name).should('not.exist'));
    expect(cy.contains(users.data[0].email).should('not.exist'));
  });

  describe('on click on the user card', () => {
    it('it should open the profile page', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.contains(users.data[0].first_name).click();

      expect(cy.location('pathname').should('eq', '/profile/1'));
    });
  });

  describe('on click add new user button', () => {
    it('it should open the profile page', () => {
      cy.loginSuccessful();
      cy.mockFetchUsers();
      cy.get('button[data-testid="add_new_user"]').click();

      expect(cy.url().should('include', '/profile'));
    });
  });
});
