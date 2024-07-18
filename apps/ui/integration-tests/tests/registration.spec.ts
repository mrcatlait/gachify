import { registration } from '../support/utils'
import { routes } from '../support/routes'

describe('Registration', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit(routes.REGISTRATION)
  })

  it('should display the login form', () => {
    registration.assertVisible()
  })

  it('should navigate to the login page', () => {
    registration.assertLoginLink()
  })

  describe('Username', () => {
    it('should display an error message when the password is empty', () => {
      registration.setUsername('valid-username')
      registration.setUsername('')
      registration.assertUsernameError('Username is required')
    })
  })

  describe('Email', () => {
    it('should display an error message when the email is empty', () => {
      registration.setEmail('valid-email@example.com')
      registration.setEmail('')
      registration.assertEmailError('Email is required')
    })

    it('should display an error message when the email is invalid', () => {
      registration.setEmail('invalid-email')
      registration.assertEmailError('Email must be in the format name@example.com')
    })
  })

  describe('Password', () => {
    it('should display an error message when the password is empty', () => {
      registration.setPassword('valid-password')
      registration.setPassword('')
      registration.assertPasswordError('Password is required')
    })

    it('should display an error message when the password is too short', () => {
      registration.setPassword('short')
      registration.assertPasswordError('Password must be at least 6 characters long')
    })
  })
})
