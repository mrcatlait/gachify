import { registrationSelectors, textFieldSelectors } from '../../selectors'

export const actions = {
  setUsername(username: string) {
    cy.getBySelector(registrationSelectors.usernameTextField).within(() => {
      if (username) {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().type(username).blur()
      } else {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().click().blur()
      }
    })
  },

  setPassword(password: string) {
    cy.getBySelector(registrationSelectors.passwordTextField).within(() => {
      if (password) {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().type(password).blur()
      } else {
        cy.getBySelector(textFieldSelectors.fieldInput).clear().click().blur()
      }
    })
  },

  setEmail(email: string) {
    cy.getBySelector(registrationSelectors.emailTextField).within(() => {
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

    cy.getBySelector(registrationSelectors.submitButton).click()
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
