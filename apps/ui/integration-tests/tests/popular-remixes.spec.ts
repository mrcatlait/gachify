import { routes } from '../support/routes'
import { player, popularRemixes, visualizer } from '../support/utils'

describe('Popular Remixes', () => {
  beforeEach(() => {
    popularRemixes.mock()
    cy.visit(routes.HOME)
  })

  it('should display popular remixes', () => {
    popularRemixes.assertVisible()
  })

  it('should display remixes', () => {
    popularRemixes.assertRemixes([
      'Король и шут - Кукла ♂Billy♂на (Right version; Gachi Remix; GachiBass)',
      'Кипелов - я свободен ♂right version♂ (gachi remix)',
      '♂Король и Шут - Фокусник♂ (Right version; Gachi Remix; GachiBass)',
      'Ляпис Трубецкой - ♂Воины Света♂(GachiRemix; GachiBass)',
      "Gachi Riki Martin - Livin' lavida loca",
      'Мышь - Twitch (Right Version♂)',
      'Король и Шут - Танец Злобного ♂Gay♂ния (Right Version)',
      'Eiffel 65 - Blue (Da Ba Dee) (right version♂) Gachi Remix',
      'GAYAZOV$ BROTHER$ - Увезите меня на Дип-хаус (Right Version) ♂ Gachi Remix',
      '♂ Firewatch Palace - Loan Digger ♂',
      '♂ Leave the Gachimuchi on ♂',
      '♂ Hentai - S3RL ♂',
    ])
  })

  it('should display active remix in the list', () => {
    popularRemixes.playRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
    player.pause()
    visualizer.assertQueueTitle('Popular remixes')
    player.toggleVisualizer()
    popularRemixes.assertActiveRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
  })
})
