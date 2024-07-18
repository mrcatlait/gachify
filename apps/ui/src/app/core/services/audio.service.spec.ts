import { TestBed } from '@angular/core/testing'
import { Injector } from '@angular/core'

import { AudioService } from './audio.service'

import { AudioState, PlaybackState } from '@core/state'

describe('AudioService', () => {
  let audioService: AudioService
  let injector: Injector
  let audioElementMock: Partial<HTMLAudioElement>

  beforeEach(() => {
    audioElementMock = {
      currentTime: 0,
      src: '',
      volume: 1,
      pause: vi.fn(),
      play: vi.fn(() => Promise.resolve()),
      load: vi.fn(() => Promise.resolve()),
      remove: vi.fn(() => Promise.resolve()),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal(
      'Audio',
      vi.fn().mockImplementation(() => audioElementMock),
    )

    TestBed.configureTestingModule({
      providers: [AudioService, Injector],
    })

    audioService = TestBed.inject(AudioService)
    injector = TestBed.inject(Injector)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should play audio', () => {
    // Act
    audioService.play()

    // Assert
    expect(audioElementMock.play).toHaveBeenCalled()
  })

  it('should pause audio', () => {
    // Act
    audioService.pause()

    // Assert
    expect(audioElementMock.pause).toHaveBeenCalled()
  })

  it('should seek to specified time', () => {
    // Arrange
    const currentTime = 30

    // Act
    audioService.seek(currentTime)

    // Assert
    expect(audioElementMock.currentTime).toBe(currentTime)
  })

  it('should set volume', () => {
    // Arrange
    const volume = 50

    // Act
    audioService.setVolume(volume)

    // Assert
    expect(audioElementMock.volume).toBe(volume / 100)
  })

  it('should toggle mute', () => {
    // Act
    audioService.toggleMute()

    // Assert
    expect(audioElementMock.muted).toBe(true)

    // Act
    audioService.toggleMute()

    // Assert
    expect(audioElementMock.muted).toBe(false)
  })

  it('should load audio', () => {
    // Arrange
    const songId = '123'

    // Act
    audioService.load(songId)

    // Assert
    expect(audioElementMock.src).toBe('/assets/mocks/123.mp3')
  })

  it('should dispatch audio play action on loaded data', () => {
    // Arrange
    const playSpy = vi.fn()
    const injectorSpy = vi.spyOn(injector, 'get').mockReturnValue({ play: playSpy })

    // Act
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(audioService as any).onLoadedData()

    // Assert
    expect(injectorSpy).toHaveBeenCalledWith(AudioState)
    expect(playSpy).toHaveBeenCalledOnce()
  })

  it('should dispatch audio set time action on time update', () => {
    // Arrange
    const currentTime = 30
    audioElementMock.currentTime = currentTime
    const setTimeSpy = vi.fn()
    const injectorSpy = vi.spyOn(injector, 'get').mockReturnValue({ setTime: setTimeSpy })

    // Act
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(audioService as any).onTimeUpdate()

    // Assert
    expect(injectorSpy).toHaveBeenCalledWith(AudioState)
    expect(setTimeSpy).toHaveBeenCalledWith({ time: currentTime })
  })

  it('should dispatch playback ended action on audio ended', () => {
    // Arrange
    const endedSpy = vi.fn()
    const injectorSpy = vi.spyOn(injector, 'get').mockReturnValue({ ended: endedSpy })

    // Act
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(audioService as any).onEnded()

    // Assert
    expect(injectorSpy).toHaveBeenCalledWith(PlaybackState)
    expect(endedSpy).toHaveBeenCalledOnce()
  })
})
