/// <reference types="cypress" />

/**
 * Match values at a location
 * @param {string} location target where to search for string.
 * @param {string} matchValue target area string to compare with.
 */
Cypress.Commands.add( 'MatchValue', ( location, matchValue ) => {
    cy.get( location ).should( 'contain', matchValue )
})

Cypress.Commands.add( 'GoToNextLine', ( matchValue ) => {
    cy.get( '[data-cy=go-to-next-line-button]' ).click()
    cy.MatchValue( 'h1', matchValue )
})

Cypress.Commands.add( 'GoToSourceView', ( matchValue ) => {
    cy.get('[data-cy=go-to-home-button]').click()
    cy.MatchValue( '.line', matchValue )
})

Cypress.Commands.add( 'GoToLineViewer' , ( matchValue ) => {
    cy.url().should( 'include', '/view' )
    cy.MatchValue( ':nth-child(1) > .source-name', matchValue )
})
