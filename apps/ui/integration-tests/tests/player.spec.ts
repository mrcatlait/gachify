import { routes } from '../support/routes'
import { player, popularRemixes, visualizer } from '../support/utils'

describe('Player', () => {
  beforeEach(() => {
    popularRemixes.mock()

    cy.visit(routes.HOME)

    popularRemixes.playRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
    player.pause()
  })

  it('should play a song', () => {
    player.play()
    player.assertPlaying()
  })

  it('should pause a song', () => {
    player.play()
    player.pause()
    player.assertPaused()
  })

  it('should skip to the next song', () => {
    player.skipToNextSong()
    player.assertPlaying()
    player.assertRemix('Eiffel 65 - Blue (Da Ba Dee) (right version♂) Gachi Remix')
  })

  it('should skip to the previous song', () => {
    player.skipToPreviousSong()
    player.assertPlaying()
    player.assertRemix('Мышь - Twitch (Right Version♂)')
  })

  it('should toggle shuffle mode on', () => {
    player.toggleShuffle()
    player.assertShuffleOn()
  })

  it('should toggle shuffle mode off', () => {
    player.toggleShuffle()
    player.toggleShuffle()
    player.assertShuffleOff()
  })

  it('should toggle repeat all mode on', () => {
    player.toggleRepeat()
    player.assertRepeatAllOn()
  })

  it('should toggle repeat single mode on', () => {
    player.toggleRepeat()
    player.toggleRepeat()
    player.assertRepeatSingleOn()
  })

  it('should toggle repeat mode off', () => {
    player.toggleRepeat()
    player.toggleRepeat()
    player.toggleRepeat()
    player.assertRepeatOff()
  })

  it('should toggle visualizer mode on', () => {
    player.assertVisualizerOn()
    visualizer.assertVisible()
  })

  it('should toggle visualizer mode off', () => {
    player.toggleVisualizer()
    player.assertVisualizerOff()
    visualizer.assertHidden()
  })

  it('should set the volume', () => {
    const volume = 50
    player.setVolume(volume)
    player.assertVolume(volume)
  })

  it('should set volume to 0 if muted', () => {
    player.mute()
    player.assertVolume(0)
  })

  it('should mute if volume is set to 0', () => {
    player.setVolume(0)
    player.assertMuted()
  })

  it('should set the playback time', () => {
    const time = 120
    player.setPlaybackTime(time)
    player.assertPlaybackTime(time)
  })

  it('should display the current time', () => {
    const currentTime = '0:00'
    player.assertCurrentTime(currentTime)
  })

  it('should display the total time', () => {
    const totalTime = '3:18'
    player.assertTotalTime(totalTime)
  })

  it('should display the remix', () => {
    player.assertRemix('Король и Шут - Танец Злобного ♂Gay♂ния')
  })

  it('should display the artist', () => {
    player.assertArtist('GachiMafia')
  })
})
