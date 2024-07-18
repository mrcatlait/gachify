import { remixListItemSelectors } from '../../../selectors'

export const actions = {
  play(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.playButton).click({ force: true })
  },

  pause(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.playButton).click({ force: true })
  },

  openMenu(remix: string) {
    cy.containsBySelector(remixListItemSelectors.remixListItemContainer, remix).as('remixListItem')
    cy.get('@remixListItem').findBySelector(remixListItemSelectors.menuButton).click({ force: true })
  },
}
