import { loginSelectors, textFieldSelectors } from '../../selectors'

export const assertions = {
  assertVisible() {
    cy.getBySelector(loginSelectors.titleLabel).contains('Sign in to Gachify').should('be.visible')

    cy.getBySelector(loginSelectors.emailTextField).within(() => {
      cy.getBySelector(textFieldSelectors.fieldLabel).should('be.visible')
      cy.getBySelector(textFieldSelectors.fieldInput).should('be.visible')
    })

    cy.getBySelector(loginSelectors.passwordTextField).within(() => {
      cy.getBySelector(textFieldSelectors.fieldLabel).should('be.visible')
      cy.getBySelector(textFieldSelectors.fieldInput).should('be.visible')
    })

    cy.getBySelector(loginSelectors.submitButton).should('be.visible')
    cy.getBySelector(loginSelectors.noAccountLabel).should('be.visible')
  },

  assertEmailError(error: string) {
    cy.getBySelector(loginSelectors.emailTextField).within(() => {
      cy.getBySelector(textFieldSelectors.errorLabel).contains(error).should('be.visible')
    })
  },

  assertPasswordError(error: string) {
    cy.getBySelector(loginSelectors.passwordTextField).within(() => {
      cy.getBySelector(textFieldSelectors.errorLabel).contains(error).should('be.visible')
    })
  },

  assertCredentialsErrorVisible() {
    cy.getBySelector(loginSelectors.invalidCredentialsLabel).should('be.visible')
  },

  assertRegistrationLink() {
    cy.getBySelector(loginSelectors.registrationLink).should('be.visible').should('have.attr', 'href')
  },
}
