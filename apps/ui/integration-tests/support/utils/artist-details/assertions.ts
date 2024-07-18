import { remixListItem } from '../common/remix-list-item'

import { artistDetailsSelectors, remixListItemSelectors } from '@selectors'

export const assertions = {
  assertVisible() {
    cy.getBySelector(artistDetailsSelectors.artistImage).should('be.visible')
    cy.getBySelector(artistDetailsSelectors.artistNameLabel).should('be.visible')
    cy.getBySelector(artistDetailsSelectors.artistMetadataLabel).should('be.visible')
    cy.getBySelector(artistDetailsSelectors.playButton).should('be.visible')
    // cy.getBySelector(artistDetailsSelectors.followButton).should('be.visible')
  },

  assertArtist(artist: string) {
    cy.getBySelector(artistDetailsSelectors.artistNameLabel).contains(artist).should('be.visible')
  },

  assertMetadata(metadata: string) {
    cy.getBySelector(artistDetailsSelectors.artistMetadataLabel).contains(metadata).should('be.visible')
  },

  assertRemixes(remixes: string[]) {
    cy.getBySelector(artistDetailsSelectors.remixContainer).within(() => {
      cy.getBySelector(remixListItemSelectors.remixListItemContainer).should('have.length', remixes.length)

      remixes.forEach((remix, index) => {
        cy.getBySelector(remixListItemSelectors.remixLabel).eq(index).contains(remix).should('be.visible')
      })
    })
  },

  assertActiveRemix(title: string) {
    cy.getBySelector(artistDetailsSelectors.remixContainer).within(() => {
      remixListItem.assertActive(title)
    })
  },

  // assertFollowOn() {
  //   cy.getBySelector(artistDetailsSelectors.followButton).contains('Follow').should('be.visible')
  //   cy.getBySelector(artistDetailsSelectors.followButton).contains('heart_plus')
  // },

  // assertFollowOff() {
  //   cy.getBySelector(artistDetailsSelectors.followButton).contains('Unfollow').should('be.visible')
  //   cy.getBySelector(artistDetailsSelectors.followButton).contains('heart_minus')
  // },

  //   assertRemixes(remixes: string[]) {
  //     cy.getBySelector(artistDetailsSelectors.remixContainer).within(() => {
  //       cy.getBySelector(artistDetailsSelectors.remixCard).should('have.length', remixes.length)

  //       remixes.forEach((remix, index) => {
  //         cy.getBySelector(artistDetailsSelectors.remixLabel).eq(index).contains(remix).should('be.visible')
  //       })
  //     })
  //   },

  //   assertActiveRemix(title: string) {
  //     cy.getBySelector(artistDetailsSelectors.remixContainer).within(() => {
  //       cy.getBySelector(artistDetailsSelectors.remixCard).contains(title).should('have.class', 'active')
  //     })
  //   },
}
