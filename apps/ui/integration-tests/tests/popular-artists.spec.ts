import { routes } from '../support/routes'
import { popularArtists } from '../support/utils'

describe('Popular Artists', () => {
  beforeEach(() => {
    popularArtists.mock()
    cy.visit(routes.HOME)
  })

  it('should display popular artists', () => {
    popularArtists.assertVisible()
  })

  it('should display artists', () => {
    popularArtists.assertArtists(['4lka', 'GachiBasser', 'Deep Dark College Boy', 'GachiMafia', 'duyui'])
  })

  it('should navigate to artist page', () => {
    popularArtists.assertArtistLink('GachiBasser')
  })
})
