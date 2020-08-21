context('Create account', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/create-account');
    cy.viewport(550, 750);
  });
  it('shows an error when invalid email is entered', () => {
    cy.get('[data-qa="email"]').type('badEmail');

    cy.contains('input is not valid email');
  });
});
