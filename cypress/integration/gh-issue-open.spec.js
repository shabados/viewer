describe('Line Options', () => {

  it('Open Source Page', () => {
    cy.visit('/sources/1/page/1/line/0')
    cy.contains('<> siq nwmu krqw purKu inrBau inrvYru; Akwl mUriq AjUnI sYBM gur pRswid ]').click()
  })

  it('Open Line Viewer', () => cy.goToLineViewer( 'Prof. Sahib Singh' ))

  it('3 Dots Menu', () => {
    cy.get( '[data-cy=menu-button-dots]' ).click()
    cy.matchValue( '.menu-item', 'Report an issue' )
  })

})
