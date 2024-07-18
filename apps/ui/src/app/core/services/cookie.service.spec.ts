import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'
import { MockInstance } from 'vitest'

import { CookieService } from './cookie.service'

describe('CookieService', () => {
  let cookieService: CookieService
  let doc: Document
  let documentCookieSetterSpy: MockInstance

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService],
    })

    cookieService = TestBed.inject(CookieService)
    doc = TestBed.inject(DOCUMENT)

    documentCookieSetterSpy = vi.spyOn(doc, 'cookie', 'set')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should get cookie value', () => {
    // Arrange
    const cookieName = 'testCookie'
    const cookieValue = 'testValue'
    doc.cookie = `gachi_${cookieName}=${encodeURIComponent(cookieValue)}`

    // Act
    const result = cookieService.get(cookieName)

    // Assert
    expect(result).toBe(cookieValue)
  })

  it('should set cookie', () => {
    // Arrange
    const cookieName = 'testCookie'
    const cookieValue = 'testValue'
    const expires = 7 // 7 days
    const secure = true

    // Act
    cookieService.set({ name: cookieName, value: cookieValue, expires, secure })

    // Assert
    expect(documentCookieSetterSpy).toHaveBeenCalledWith(
      [
        `gachi_${cookieName}=${encodeURIComponent(cookieValue)}`,
        `Expires=${new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString()}`,
        'Secure',
        'SameSite=Strict;',
      ].join(';'),
    )
  })

  it('should delete cookie', () => {
    // Arrange
    const cookieName = 'testCookie'
    const cookieValue = 'testValue'
    doc.cookie = `gachi_${cookieName}=${encodeURIComponent(cookieValue)}`

    // Act
    cookieService.delete(cookieName)

    // Assert
    expect(documentCookieSetterSpy).toHaveBeenCalledWith(
      [`gachi_${cookieName}=`, 'Expires=Thu, 01 Jan 1970 00:00:01 GMT', 'SameSite=Strict;'].join(';'),
    )
  })

  // Add more tests for other methods if needed
})
