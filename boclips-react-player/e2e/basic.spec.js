describe('Boclips Video Player', function () {
  it('Plays video when click on thumbnail', function () {
    cy.visit('http://localhost:8080/');
    cy.get('#video-1 [data-qa="video-thumbnail"]').click();

    cy.get('#video-1 video').should('exist')
  });

  it('Plays video when no thumbnail defined', function () {
    cy.visit('http://localhost:8080/');

    cy.get('#video-2 [data-qa="video-thumbnail"]').should('not.exist');
    cy.get('#video-2 video').should('exist')
  });
});
