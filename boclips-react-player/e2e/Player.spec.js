describe('Player with thumbnail', () => {
  it('Plays video when click on thumbnail', function() {
    cy.visit('http://localhost:8080/');

    cy.get('#video-2 img').then(img => {
      img[0].click();
    });

    cy.wait(2000);

    cy.get('#video-2 [data-qa="video-playback"]').then(video => {
      video[0].pause();
    });

    cy.get('#video-2 [data-qa="segment-start"]').then(segmentStart => segmentStart.text()).should('equal', '0');
    cy.get('#video-2 [data-qa="segment-end"]').then(segmentEnd => segmentEnd.text()).should('be.above', 0);
    cy.get('#video-2 [data-qa="player-id"]').then(node => node.text()).should('not.be.empty');
    cy.get('#video-2 [data-qa="capture-time"]').then(node => node.text()).should('not.be.empty');
  });
});
