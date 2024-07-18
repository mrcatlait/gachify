import { visualizerSelectors } from '../../selectors'
import { remixCard } from '../common'

export const assertions = {
  assertBackgroundVisible() {
    cy.getBySelector(visualizerSelectors.mediaBackgroundImage).shouldBeVisible()
  },

  assertBackgroundHidden() {
    cy.getBySelector(visualizerSelectors.mediaBackgroundImage).should('not.be.visible')
  },

  assertQueueTitle(title: string) {
    cy.getBySelector(visualizerSelectors.queueTitleLabel).should('contain', title)
  },

  assertVisible() {
    cy.getBySelector(visualizerSelectors.mediaRemixImage).should('be.visible')
    cy.getBySelector(visualizerSelectors.queueTitleLabel).should('be.visible')
  },

  assertHidden() {
    cy.getBySelector(visualizerSelectors.mediaRemixImage).should('not.be.visible')
    cy.getBySelector(visualizerSelectors.queueTitleLabel).should('not.be.visible')
  },

  assertActiveRemix(title: string) {
    cy.getBySelector(visualizerSelectors.queueContainer).within(() => {
      remixCard.assertActive(title)
    })
  },
}
