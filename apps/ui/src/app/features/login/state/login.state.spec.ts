import { TestBed } from '@angular/core/testing'
import { HttpErrorResponse } from '@angular/common/http'
import { of, throwError } from 'rxjs'

import { LoginService } from '../services'
import { LoginState } from './login.state'

import { AuthState } from '@core/state'
import { User } from '@core/models'

describe('LoginState', () => {
  let loginState: LoginState
  let loginService: LoginService
  let authState: AuthState

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginState,
        { provide: LoginService, useValue: { login: vi.fn() } },
        { provide: AuthState, useValue: { login: vi.fn() } },
      ],
    })

    loginState = TestBed.inject(LoginState)
    loginService = TestBed.inject(LoginService)
    authState = TestBed.inject(AuthState)
  })

  it('should call login service and set loading to false and call authState.login on success', () => {
    // Arrange
    const payload = { email: 'test@example.com', password: 'password', redirectUrl: '/dashboard' }
    const user: User = { uuid: '1', username: 'Test User', email: 'test@example.com' }
    vi.spyOn(loginService, 'login').mockReturnValue(of(user))

    // Act
    loginState.login(payload)

    // Assert
    expect(loginService.login).toHaveBeenCalledWith(payload)
    expect(loginState.loading()).toBe(false)
    expect(authState.login).toHaveBeenCalledWith({ user, redirectUrl: payload.redirectUrl })
  })

  it('should set invalidCredentials to true and loading to false on 401 error', () => {
    // Arrange
    const payload = { email: 'test@example.com', password: 'password', redirectUrl: '/dashboard' }
    const error = new HttpErrorResponse({ status: 401 })
    vi.spyOn(loginService, 'login').mockReturnValue(throwError(() => error))

    // Act
    loginState.login(payload)

    // Assert
    expect(loginState.invalidCredentials()).toBe(true)
    expect(loginState.loading()).toBe(false)
  })
})
