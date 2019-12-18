/// <reference types="Cypress" />
const URL = 'http://localhost:3001'
context('Querying', () => {
  beforeEach(() => {
    cy.visit(URL)
  })

  it('cy.get() - query DOM elements', () => {
    cy.get('#dashboard')
      .should('contain', 'Boater')
      .should('contain', 'Search')
      .should('contain', 'Name')
      .should('contain', 'Timestamp')
      .should('contain', 'Reading')
  })
  it('cy.get() - query DOM elements in readings', () => {
    cy.contains('LINVILLE RIVER NEAR NEBO, NC').click()
    cy.get('#readings-dashboard')
      .should('contain', 'Boater')
      .should('contain', 'Search')
      .should('contain', 'Timestamp')
      .should('contain', 'Reading')
  })
})
