import { containsBySelector, findBySelector, getBySelector, logout, mockRequest, shouldBeVisible } from './commands'

Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
})

Cypress.Commands.addAll({
  containsBySelector,
  getBySelector,
  logout,
  mockRequest,
})

Cypress.Commands.addAll(
  { prevSubject: true },
  {
    findBySelector,
  },
)

Cypress.Commands.addAll(
  { prevSubject: true },
  {
    shouldBeVisible,
  },
)

beforeEach(() => {
  cy.intercept('GET', /\/.+\.(jpg|jpeg|png)$/, { fixture: 'image.jpg' }).as('getImage')
  cy.intercept('GET', /\/.+\.(mp3|mp4)$/, { fixture: 'audio.mp3,null' }).as('getAudio')
  cy.intercept('GET', '/auth/whoami', {
    uuid: 'uuid',
    username: 'User',
    email: 'user@example.com',
  }).as('WhoAmI')
})
