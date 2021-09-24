describe('Logout', () => {
  it('it should logout', () => {
    cy.loginSuccessful();
    cy.get('button[data-testid="logout"]').click();

    expect(cy.location('pathname').should('eq', '/login'));
  });

  it('it should remove the token inside the localstorage', () => {
    cy.loginSuccessful();
    cy.wait('@login').then(() =>
      expect(localStorage.getItem('reqres')).to.eq(JSON.stringify({ token: 'token' }))
    );
    cy.get('button[data-testid="logout"]').click();
    cy.wait(100).then(() => expect(localStorage.getItem('reqres')).to.eq(null));
  });
});
