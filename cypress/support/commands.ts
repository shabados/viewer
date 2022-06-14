/**
 * Match values at a location
 * @param {string} location target where to search for string.
 * @param {string} matchValue target area string to compare with.
 */
Cypress.Commands.add( 'matchValue', ( location, matchValue ) => {
  cy.get( location ).should( 'contain', matchValue )
} )

Cypress.Commands.add( 'goToNextLine', ( matchValue ) => {
  cy.get( '[data-cy=go-to-next-line-button]' ).click()
  cy.matchValue( '[data-cy=source-line]', matchValue )
} )

Cypress.Commands.add( 'goToSourceView', ( matchValue ) => {
  cy.get( '[data-cy=go-to-home-button]' ).click()
  cy.matchValue( '[data-cy=go-to-home-value]', matchValue )
} )

Cypress.Commands.add( 'goToLineViewer', ( matchValue ) => {
  cy.url().should( 'include', '/view' )
  cy.matchValue( ':nth-child(1) > .cy-source-name', matchValue )
} )
