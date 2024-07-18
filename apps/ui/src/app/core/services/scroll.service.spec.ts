import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'
import { MockInstance } from 'vitest'

import { ScrollService } from './scroll.service'

describe('ScrollService', () => {
  let scrollService: ScrollService
  let doc: Document
  let addEventListenerSpy: MockInstance
  let removeEventListenerSpy: MockInstance

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollService],
    })

    scrollService = TestBed.inject(ScrollService)
    doc = TestBed.inject(DOCUMENT)

    addEventListenerSpy = vi.spyOn(doc, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(doc, 'removeEventListener')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should disable scrolling', () => {
    // Act
    scrollService.disable()

    // Assert
    expect(addEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function), { passive: false })
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: false })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), { passive: false })
  })

  // always returns true
  it('should prevent default event handling', () => {
    // Arrange
    const wheelEvent = new WheelEvent('wheel')
    const touchEvent = new TouchEvent('touchmove')
    const keydownEvent = new KeyboardEvent('keydown')

    // Act
    scrollService.disable()

    const wheelPrevented = doc.dispatchEvent(wheelEvent)
    const touchPrevented = doc.dispatchEvent(touchEvent)
    const keydownPrevented = doc.dispatchEvent(keydownEvent)

    // Assert
    expect(wheelPrevented).toBe(true)
    expect(touchPrevented).toBe(true)
    expect(keydownPrevented).toBe(true)
  })

  it('should enable scrolling', () => {
    // Act
    scrollService.disable()
    scrollService.enable()

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
