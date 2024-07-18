import { login } from '../support/utils'
import { routes } from '../support/routes'

describe('Login', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit(routes.LOGIN)
  })

  it('should display the login form', () => {
    login.assertVisible()
  })

  it('should display an error message when invalid credentials are provided', () => {
    login.login({
      email: 'invalid-email@example.com',
      password: 'invalid-password',
    })

    login.assertCredentialsErrorVisible()
  })

  it('should navigate to homepage after login', () => {
    login.login({
      email: 'valid-email@example.com',
      password: 'valid-password',
    })

    cy.url().should('eq', Cypress.config().baseUrl)
  })

  it('should navigate to the registration page', () => {
    login.assertRegistrationLink()
  })

  describe('Email', () => {
    it('should display an error message when the email is empty', () => {
      login.setEmail('valid-email@example.com')
      login.setEmail('')
      login.assertEmailError('Email is required')
    })

    it('should display an error message when the email is invalid', () => {
      login.setEmail('invalid-email')
      login.assertEmailError('Email must be in the format name@example.com')
    })
  })

  describe('Password', () => {
    it('should display an error message when the password is empty', () => {
      login.setPassword('valid-password')
      login.setPassword('')
      login.assertPasswordError('Password is required')
    })
  })
})
