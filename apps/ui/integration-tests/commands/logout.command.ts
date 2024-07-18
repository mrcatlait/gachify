declare global {
  namespace Cypress {
    interface Chainable {
      logout: typeof logout
    }
  }
}

export const logout = (): void => {
  cy.intercept('GET', '/auth/whoami', { statusCode: 401 }).as('WhoAmI')
}
