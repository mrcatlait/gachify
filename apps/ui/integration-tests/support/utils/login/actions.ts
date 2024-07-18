import { loginSelectors, textFieldSelectors } from '../../selectors'

export const actions = {
  setPassword(password: string) {
    cy.getBySelector(loginSelectors.passwordTextField).within(() => {
      if (password) {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().type(password).blur()
      } else {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().click().blur()
      }
    })
  },

  setEmail(email: string) {
    cy.getBySelector(loginSelectors.emailTextField).within(() => {
      if (email) {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().type(email).blur()
      } else {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().click().blur()
      }
    })
  },

  login(payload: { email: string; password: string }) {
    this.setEmail(payload.email)
    this.setPassword(payload.password)

    if (payload.email.includes('invalid')) {
      mockInvalidCredentials()
    } else {
      mockValidCredentials()
    }

    cy.getBySelector(loginSelectors.submitButton).click()
  },
}

function mockInvalidCredentials() {
  cy.intercept('POST', '/auth/login', {
    statusCode: 401,
    body: {
      message: 'Invalid credentials',
    },
  }).as('login')
}

function mockValidCredentials() {
  cy.intercept('POST', '/auth/login', {
    statusCode: 200,
    body: {
      username: 'User',
    },
  }).as('login')
}
