describe('setup', () => {
  const URL = 'http://localhost:3001'
  it('Can Navigate between Gauges and Home using the Navigation menu', () => {
    cy.visit(URL)
    cy.contains('LINVILLE RIVER NEAR NEBO, NC').click()
    cy.url().should('eq', `${URL}/readings/02138500`)
    cy.contains('Home').click()
    cy.url().should('eq', `${URL}/`)
    cy.contains('LITTLE TENNESSEE RIVER AT NEEDMORE, NC').click()
    cy.url().should('eq', `${URL}/readings/03503000`)
    cy.contains('Home').click()
    cy.url().should('eq', `${URL}/`)
  })

  it("cy.go() - go back or forward in the browser's history", () => {
    cy.visit(URL)
    cy.contains('LINVILLE RIVER NEAR NEBO, NC').click()
    cy.location('pathname').should('include', 'readings')
    cy.go('back')
    cy.location('pathname').should('not.include', 'readings')
    cy.go('forward')
    cy.location('pathname').should('include', 'readings')

    // clicking back
    cy.go(-1)
    cy.location('pathname').should('not.include', 'readings')

    // clicking forward
    cy.go(1)
    cy.location('pathname').should('include', 'readings')
  })

  it('cy.reload() - reload the page', () => {
    cy.reload()
    // reload the page without using the cache
    cy.reload(true)
  })
})
