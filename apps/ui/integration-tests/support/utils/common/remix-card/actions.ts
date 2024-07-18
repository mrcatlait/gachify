import { remixCardSelectors } from '../../../selectors'

export const actions = {
  play(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.playButton).click({ force: true })
  },

  pause(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.playButton).click({ force: true })
  },

  openMenu(remix: string) {
    cy.containsBySelector(remixCardSelectors.remixCard, remix).as('remixCard')
    cy.get('@remixCard').findBySelector(remixCardSelectors.menuButton).click({ force: true })
  }
}
