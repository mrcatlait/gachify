import { registrationSelectors, textFieldSelectors } from '../../selectors'

export const assertions = {
  assertVisible() {
    cy.getBySelector(registrationSelectors.titleLabel).contains('Sign up to Gachify').should('be.visible')

    cy.getBySelector(registrationSelectors.usernameTextField).within(() => {
      cy.getBySelector(textFieldSelectors.fieldLabel).should('be.visible')
      cy.getBySelector(textFieldSelectors.fieldInput).should('be.visible')
    })

    cy.getBySelector(registrationSelectors.emailTextField).within(() => {
      cy.getBySelector(textFieldSelectors.fieldLabel).should('be.visible')
      cy.getBySelector(textFieldSelectors.fieldInput).should('be.visible')
    })

    cy.getBySelector(registrationSelectors.passwordTextField).within(() => {
      cy.getBySelector(textFieldSelectors.fieldLabel).should('be.visible')
      cy.getBySelector(textFieldSelectors.fieldInput).should('be.visible')
    })

    cy.getBySelector(registrationSelectors.submitButton).should('be.visible')
    cy.getBySelector(registrationSelectors.hasAccountLabel).should('be.visible')
  },

  assertUsernameError(error: string) {
    cy.getBySelector(registrationSelectors.usernameTextField).within(() => {
      cy.getBySelector(textFieldSelectors.errorLabel).contains(error).should('be.visible')
    })
  },

  assertEmailError(error: string) {
    cy.getBySelector(registrationSelectors.emailTextField).within(() => {
      cy.getBySelector(textFieldSelectors.errorLabel).contains(error).should('be.visible')
    })
  },

  assertPasswordError(error: string) {
    cy.getBySelector(registrationSelectors.passwordTextField).within(() => {
      cy.getBySelector(textFieldSelectors.errorLabel).contains(error).should('be.visible')
    })
  },

  assertLoginLink() {
    cy.getBySelector(registrationSelectors.loginLink).should('be.visible').should('have.attr', 'href')
  },
}
