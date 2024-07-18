import { TestBed } from '@angular/core/testing'

import { PlaybackState } from './playback.state'
import { AudioState } from './audio.state'
import { UIState } from './ui.state'

import { SeoService } from '@core/services'
import { RepeatOption, Remix, Queue } from '@core/models'

describe('PlaybackState', () => {
  let playbackState: PlaybackState
  let audioStateMock: Partial<AudioState>
  let uiStateMock: Partial<UIState>

  beforeEach(() => {
    audioStateMock = {
      togglePlay: vi.fn(),
      load: vi.fn(),
      play: vi.fn(),
      pause: vi.fn(),
    }

    uiStateMock = {
      openVisualizer: vi.fn(),
    }

    TestBed.configureTestingModule({
      providers: [
        PlaybackState,
        { provide: AudioState, useValue: audioStateMock },
        { provide: UIState, useValue: uiStateMock },
        { provide: SeoService, useValue: {} },
      ],
    })

    playbackState = TestBed.inject(PlaybackState)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should toggle play if current remix id matches payload remix id', () => {
    // Arrange
    const remixId = 'remix1'
    const sourceId = 'source1'
    const queue = { source: { name: sourceId, entityId: sourceId }, remixes: [{ id: remixId }] } as Queue

    playbackState.currentRemix.set({ id: remixId } as Remix)
    playbackState.queue.set(queue)

    // Act
    playbackState.togglePlay({ queue, remixId })

    // Assert
    expect(playbackState.currentRemix()).toEqual({ id: remixId })
    expect(audioStateMock.togglePlay).toHaveBeenCalled()
    expect(audioStateMock.load).not.toHaveBeenCalled()
    expect(uiStateMock.openVisualizer).not.toHaveBeenCalled()
  })

  it('should set current remix, queue, load audio, and open visualizer when toggling play with new remix', () => {
    // Arrange
    const remixId = 'remix2'
    const queue = { source: { name: 'source2' }, remixes: [{ id: 'remix1' }, { id: remixId }] } as Queue

    // Act
    playbackState.togglePlay({ queue, remixId })

    // Assert
    expect(playbackState.currentRemix()).toEqual({ id: remixId })
    expect(playbackState.queue()).toEqual(queue)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: { id: remixId } })
    expect(uiStateMock.openVisualizer).toHaveBeenCalled()
  })

  it('should set the next remix as current remix when calling next', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const nextRemix = { id: 'remix2' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix, nextRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)

    // Act
    playbackState.next()

    // Assert
    expect(playbackState.currentRemix()).toEqual(nextRemix)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: nextRemix })
  })

  it('should set the previous remix as current remix when calling previous', () => {
    // Arrange
    const currentRemix = { id: 'remix2' } as Remix
    const previousRemix = { id: 'remix1' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [previousRemix, currentRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)

    // Act
    playbackState.previous()

    // Assert
    expect(playbackState.currentRemix()).toEqual(previousRemix)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: previousRemix })
  })

  it('should toggle repeat option when calling toggleRepeat', () => {
    // Arrange
    playbackState.repeat.set(RepeatOption.None)

    // Act
    playbackState.toggleRepeat()
    expect(playbackState.repeat()).toEqual(RepeatOption.All)

    playbackState.toggleRepeat()
    expect(playbackState.repeat()).toEqual(RepeatOption.Single)

    playbackState.toggleRepeat()
    expect(playbackState.repeat()).toEqual(RepeatOption.None)
  })

  it('should toggle shuffle when calling toggleShuffle', () => {
    // Arrange
    playbackState.shuffle.set(false)

    // Act
    playbackState.toggleShuffle()
    expect(playbackState.shuffle()).toBe(true)

    playbackState.toggleShuffle()
    expect(playbackState.shuffle()).toBe(false)
  })

  it('should play next remix when current remix ends', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const nextRemix = { id: 'remix2' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix, nextRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)

    // Act
    playbackState.ended()

    // Assert
    expect(playbackState.currentRemix()).toEqual(nextRemix)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: nextRemix })
  })

  it('should play the same remix again when repeat option is set to Single', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)
    playbackState.repeat.set(RepeatOption.Single)

    // Act
    playbackState.ended()

    // Assert
    expect(audioStateMock.play).toHaveBeenCalled()
  })

  it('should play the next remix when repeat option is set to All', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const nextRemix = { id: 'remix2' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix, nextRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)
    playbackState.repeat.set(RepeatOption.All)

    // Act
    playbackState.ended()

    // Assert
    expect(playbackState.currentRemix()).toEqual(nextRemix)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: nextRemix })
  })

  it('should pause when current remix is the last one and repeat option is set to None', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)
    playbackState.repeat.set(RepeatOption.None)

    // Act
    playbackState.ended()

    // Assert
    expect(audioStateMock.pause).toHaveBeenCalled()
  })

  it('should play the next remix when current remix is not the last one and repeat option is set to None', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const nextRemix = { id: 'remix2' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix, nextRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)
    playbackState.repeat.set(RepeatOption.None)

    // Act
    playbackState.ended()

    // Assert
    expect(playbackState.currentRemix()).toEqual(nextRemix)
    expect(audioStateMock.load).toHaveBeenCalledWith({ remix: nextRemix })
  })

  it('should pause when current remix is the last one and repeat option is set to None', () => {
    // Arrange
    const currentRemix = { id: 'remix1' } as Remix
    const queue: Queue = { source: { name: 'source1' }, remixes: [currentRemix] }
    playbackState.currentRemix.set(currentRemix)
    playbackState.queue.set(queue)
    playbackState.repeat.set(RepeatOption.None)

    // Act
    playbackState.ended()

    // Assert
    expect(audioStateMock.pause).toHaveBeenCalled()
  })
})
