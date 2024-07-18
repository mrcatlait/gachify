import { routes } from '../support/routes'
import { artistDetails, player, visualizer } from '../support/utils'

describe('Artist Details', () => {
  beforeEach(() => {
    artistDetails.mock()
    cy.visit(routes.ARTIST_DETAILS)
  })

  it('should display artist details', () => {
    artistDetails.assertVisible()
  })

  it('should display the artist', () => {
    artistDetails.assertArtist('4lka')
  })

  it('should display metadata', () => {
    artistDetails.assertMetadata('7 remixes')
  })

  it('should display remixes', () => {
    artistDetails.assertRemixes([
      'Depeche Mode - Never Let Me Down Again ♂Right Version♂ Gachi Remix',
      'Huey Lewis and the News - Hip To Be Square (Right version) ♂Gachi remix♂',
      "Savage - Don't Cry Tonight ♂Right Version♂ Gachi Remix",
      'ДДТ - Просвистела (♂Right Version♂) Gachi Remix',
      'Mandy Smith - Positive Reaction (♂Right Version♂) Gachi Remix',
      "Modern Talking - Geronimo's Cadillac (♂Right Version♂) Gachi Remix",
    ])
  })

  it('should play remixs from play button', () => {
    artistDetails.play()
    player.pause()
    visualizer.assertQueueTitle('4lka')
    player.toggleVisualizer()
    artistDetails.assertActiveRemix('Depeche Mode - Never Let Me Down Again ♂Right Version♂ Gachi Remix')
  })

  it('should play remix from the list', () => {
    artistDetails.playRemix('ДДТ - Просвистела (♂Right Version♂) Gachi Remix')
    player.pause()
    visualizer.assertQueueTitle('4lka')
    player.toggleVisualizer()
    artistDetails.assertActiveRemix('ДДТ - Просвистела (♂Right Version♂) Gachi Remix')
  })
})
