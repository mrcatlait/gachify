import { popularArtistsSelectors } from '@selectors'

export const assertions = {
  assertVisible() {
    cy.getBySelector(popularArtistsSelectors.titleLabel).contains('Popular artists').should('be.visible')
    cy.getBySelector(popularArtistsSelectors.artistContainer).should('be.visible')
  },

  assertArtists(artists: string[]) {
    cy.getBySelector(popularArtistsSelectors.artistCard).should('have.length', artists.length)

    artists.forEach((artist, index) => {
      cy.getBySelector(popularArtistsSelectors.artistCard).eq(index).should('have.text', artist)
    })
  },

  assertArtistLink(artist: string) {
    cy.getBySelector(popularArtistsSelectors.artistCard).contains(artist).should('have.attr', 'href')
  },
}
