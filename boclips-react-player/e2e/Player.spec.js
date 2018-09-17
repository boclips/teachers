describe('Player with thumbnail', () => {
  it('Plays video when click on thumbnail', function() {
    cy.visit('http://localhost:8080/');

    cy.get('#video-2 [data-qa="no-events"]').should('exist');

    cy.get('#video-2 img').then(img => {
      img[0].click();
    });

    cy.get('#video-2 [data-qa="player-identifier"]').should('exist');

    cy.get('#video-2 [data-qa="is-playing"]').should('contain', 'true');
    cy.get('#video-2 [data-qa="last-event"]').should('contain', 'play');
    cy.get('#video-2 [data-qa="number-of-events"]').should('contain', '1');
  });
});
