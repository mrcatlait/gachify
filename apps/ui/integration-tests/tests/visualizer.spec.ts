import { routes } from '../support/routes'
import { player, popularRemixes, visualizer, navigation } from '../support/utils'

describe('Visualizer', () => {
  describe('when remix is not selected', () => {
    beforeEach(() => {
      cy.visit(routes.HOME)
    })

    it('should be hidden', () => {
      visualizer.assertHidden()
    })
  })

  describe('when remix is selected', () => {
    beforeEach(() => {
      popularRemixes.mock()

      cy.visit(routes.HOME)

      popularRemixes.playRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
      player.pause()
    })

    it('should be visible', () => {
      visualizer.assertVisible()
    })

    it('should have correct queue title', () => {
      visualizer.assertQueueTitle('Popular remixes')
    })

    it('should hide background when remix is paused', () => {
      visualizer.assertBackgroundHidden()
    })

    it('should show background when remix is played', () => {
      player.play()
      visualizer.assertBackgroundVisible()
      player.pause()
    })

    it('should display active remix in the queue', () => {
      visualizer.assertActiveRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
    })

    it('should hide visualizer when page is changed', () => {
      navigation.goToExplore()
      visualizer.assertHidden()
    })
  })
})
