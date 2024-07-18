import { remixCard } from '../common'

import { popularRemixesSelectors } from '@selectors'

export const actions = {
  mock() {
    cy.intercept('GET', '/remixes/popular?take=12&page=1', { fixture: 'popular-remixes.json' }).as('getPopularRemixes')
  },

  playRemix(remix: string) {
    cy.getBySelector(popularRemixesSelectors.remixContainer).within(() => {
      remixCard.play(remix)
    })
  },
}
