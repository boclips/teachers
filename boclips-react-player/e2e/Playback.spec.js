describe('Playback', function() {
  it('Playback switches from playing to paused when clicking on the video', function() {
    cy.visit('http://localhost:8080/');

    cy.wait(2000);

    cy.get('#video-1 [data-qa="video-playback"]').then(video => {
      video[0].pause();
    });

    cy.get('#video-1 [data-qa="segment-start"]').then(segmentStart => segmentStart.text()).should('equal', '0');
    cy.get('#video-1 [data-qa="segment-end"]').then(segmentEnd => segmentEnd.text()).should('be.above', 0);
    cy.get('#video-1 [data-qa="player-identifier"]').then(node => node.text()).should('not.be.empty');
    cy.get('#video-1 [data-qa="capture-time"]').then(node => node.text()).should('not.be.empty');
  });
});
