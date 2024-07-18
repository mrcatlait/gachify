import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'

import { canActivateUnauthorized } from './can-activate-unauthorized.guard'

import { AuthState } from '@core/state'

describe('canActivateUnauthorized', () => {
  let authState: AuthState
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthState, useValue: { isAuthenticated: vi.fn() } },
        { provide: Router, useValue: { navigate: vi.fn() } },
      ],
    })

    authState = TestBed.inject(AuthState)
    router = TestBed.inject(Router)
  })

  it('should return true if user is not authenticated', () => {
    // Arrange
    vi.spyOn(authState, 'isAuthenticated').mockReturnValue(false)
    const route = {} as ActivatedRouteSnapshot
    const state = {} as RouterStateSnapshot

    // Act
    const result = TestBed.runInInjectionContext(() => canActivateUnauthorized(route, state))

    // Assert
    expect(result).toBe(true)
    expect(router.navigate).not.toHaveBeenCalled()
  })

  it('should navigate to root if user is authenticated', () => {
    // Arrange
    vi.spyOn(authState, 'isAuthenticated').mockReturnValue(true)
    const route = {} as ActivatedRouteSnapshot
    const state = {} as RouterStateSnapshot

    // Act
    const result = TestBed.runInInjectionContext(() => canActivateUnauthorized(route, state))

    // Assert
    expect(result).toBe(false)
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })
})
