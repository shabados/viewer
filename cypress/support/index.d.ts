declare namespace Cypress {
  interface Chainable<Subject> {
    matchValue(location: string, matchValue: string): Chainable<Subject>

    goToLineViewer(matchValue: string): Chainable<Subject>

    goToNextLine(matchValue: string): Chainable<Subject>

    goToSourceView(matchValue: string): Chainable<Subject>
  }
}