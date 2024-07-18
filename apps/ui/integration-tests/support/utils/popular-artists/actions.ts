export const actions = {
  mock() {
    cy.intercept('GET', '/artists/popular', { fixture: 'popular-artists.json' }).as('getPopularArtists')
  },
}
