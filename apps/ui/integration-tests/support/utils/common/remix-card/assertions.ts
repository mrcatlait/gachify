import { remixCardSelectors } from '../../../selectors'

export const assertions = {
  assertActive(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.playButton).should('exist')
    cy.get('@remixCard').should('have.class', 'gachi-remix-card-active')
  },

  assertPlaying(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.playButton).contains('pause').should('exist')
  },

  assertPaused(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.playButton).contains('play_arrow').should('exist')
  },
}
