describe('Playback', function() {
  it('Playback switches from playing to paused when clicking on the video', function() {
    cy.visit('http://localhost:8080/');

    cy.get('#video-1 [data-qa="is-playing"]').should('contain', 'true');
    cy.get('#video-1 [data-qa="is-paused"]').should('contain', 'false');
    cy.get('#video-1 [data-qa="last-event"]').should('contain', 'play');

    cy.get('#video-1 [data-qa="video-playback"]').then(video => {
      video[0].pause();
    });

    cy.get('#video-1 [data-qa="is-playing"]').should('contain', 'false');
    cy.get('#video-1 [data-qa="is-paused"]').should('contain', 'true');
    cy.get('#video-1 [data-qa="last-event"]').should('contain', 'pause');
  });
});
