import { remixListItemSelectors } from '../../../selectors'

export const assertions = {
  assertActive(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.playButton).should('exist')
    cy.get('@remixListItem').should('have.class', 'gachi-remix-list-item-active')
  },

  assertPlaying(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.playButton).contains('pause').should('exist')
  },

  assertPaused(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.playButton).contains('play_arrow').should('exist')
  },
}
