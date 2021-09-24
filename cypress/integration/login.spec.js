describe('Login', () => {
  it('it should open the login page', () => {
    cy.visit('/login');
  });

  it('it should show the error message', () => {
    cy.loginFail();
    expect(cy.contains('div', 'login error'));
  });

  it('it should login', () => {
    cy.loginSuccessful();
    expect(cy.location('pathname').should('eq', '/'));
  });

  it('it should set the token inside the localstorage', () => {
    cy.loginSuccessful();

    cy.wait('@login').then(() =>
      expect(localStorage.getItem('reqres')).to.eq(JSON.stringify({ token: 'token' }))
    );
  });
});
