import { remixCard } from '../common'

import { popularRemixesSelectors, remixCardSelectors } from '@selectors'

export const assertions = {
  assertVisible() {
    cy.getBySelector(popularRemixesSelectors.titleLabel).contains('Popular remixes').should('be.visible')
    cy.getBySelector(popularRemixesSelectors.remixContainer).should('be.visible')
  },

  assertRemixes(remixes: string[]) {
    cy.getBySelector(popularRemixesSelectors.remixContainer).within(() => {
      cy.getBySelector(remixCardSelectors.remixCard).should('have.length', remixes.length)

      remixes.forEach((remix, index) => {
        cy.getBySelector(remixCardSelectors.remixLabel).eq(index).contains(remix).should('be.visible')
      })
    })
  },

  assertActiveRemix(title: string) {
    cy.getBySelector(popularRemixesSelectors.remixContainer).within(() => {
      remixCard.assertActive(title)
    })
  },
}
