import { remixListItem } from '../common/remix-list-item'

import { artistDetailsSelectors } from '@selectors'

export const actions = {
  mock() {
    cy.intercept(
      {
        method: 'GET',
        url: /artists\/((\w|\d)+-)+(\w|\d)+$/,
        headers: {
          accept: 'application/json',
        },
      },
      { fixture: 'artist-details.json' },
    ).as('getArtistDetails')
    cy.intercept('GET', /artists\/((\w|\d)+-)+(\w|\d)+\/remixes$/, { fixture: 'artist-remixes.json' }).as(
      'getArtistRemixes',
    )
  },

  play() {
    cy.getBySelector(artistDetailsSelectors.playButton).click()
  },

  playRemix(remix: string) {
    cy.getBySelector(artistDetailsSelectors.remixContainer).within(() => {
      remixListItem.play(remix)
    })
  },
}
