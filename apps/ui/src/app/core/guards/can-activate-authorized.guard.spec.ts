import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'

import { canActivateAuthorized } from './can-activate-authorized.guard'

import { AuthState } from '@core/state'
import { REDIRECT_URL_PARAM } from '@core/constants'

describe('canActivateAuthorized', () => {
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

  it('should return true if user is authenticated', () => {
    // Arrange
    vi.spyOn(authState, 'isAuthenticated').mockReturnValue(true)
    const route = {} as ActivatedRouteSnapshot
    const state = {} as RouterStateSnapshot

    // Act
    const result = TestBed.runInInjectionContext(() => canActivateAuthorized(route, state))

    // Assert
    expect(result).toBe(true)
    expect(authState.isAuthenticated).toHaveBeenCalled()
    expect(router.navigate).not.toHaveBeenCalled()
  })

  it('should navigate to SSO page with redirect URL if user is not authenticated', () => {
    // Arrange
    vi.spyOn(authState, 'isAuthenticated').mockReturnValue(false)
    const route = { url: ['some', 'route'] } as unknown as ActivatedRouteSnapshot
    const state = {} as RouterStateSnapshot

    // Act
    const result = TestBed.runInInjectionContext(() => canActivateAuthorized(route, state))

    // Assert
    expect(result).toBe(false)
    expect(authState.isAuthenticated).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/sso'], {
      queryParams: { [REDIRECT_URL_PARAM]: 'some/route' },
    })
  })
})
