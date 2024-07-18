import { RequestMock } from '../support/types'

declare global {
  namespace Cypress {
    interface Chainable {
      mockRequest: typeof mockRequest
    }
  }
}

export const mockRequest = (newMocks: RequestMock[]): void => {
  updateMocks(newMocks)

  cy.intercept({ url: Cypress.config().baseUrl + '/api/**' }, (request) => {
    const mocks = Cypress.env('requestMocks') as RequestMock[]

    const matchedMock = mocks.find((mock) => mock.url === request.url && mock.method === request.method.toLowerCase())

    if (matchedMock) {
      request.reply(matchedMock)
      return
    }

    const message = `No mock found for ${request.method} "${request.url}" request`
    throw new Error(message)
  }).as('RequestMock')
}

const updateMocks = (mocks: RequestMock[]): void => {
  const newMocks = [...mocks]
  const oldMocks = Cypress.env('requestMocks') as RequestMock[] | undefined

  if (oldMocks) {
    const filteredOldMocks = oldMocks.filter(
      (oldMock) => !mocks.find((newMock) => newMock.url === oldMock.url && newMock.method === oldMock.method),
    )
    newMocks.push(...filteredOldMocks)
  }

  Cypress.env('requestMocks', newMocks)
}
