import { navigationSelectors } from '../../../selectors'

export const actions = {
  goToHome() {
    cy.getBySelector(navigationSelectors.homeLink).click()
  },

  goToExplore() {
    cy.getBySelector(navigationSelectors.exploreLink).click()
  },

  goToSearch() {
    cy.getBySelector(navigationSelectors.searchLink).click()
  },

  goToLibrary() {
    cy.getBySelector(navigationSelectors.libraryLink).click()
  },
}
