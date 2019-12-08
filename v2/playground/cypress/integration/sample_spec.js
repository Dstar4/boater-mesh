describe('setup', () => {
  it('Gets a webpage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Dashboard')
  });
});