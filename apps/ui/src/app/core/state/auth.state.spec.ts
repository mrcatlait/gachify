import { TestBed } from '@angular/core/testing'
import { Router, RouterModule } from '@angular/router'

import { AuthState } from './auth.state'

describe('AuthState', () => {
  let authState: AuthState
  let routerMock: Partial<Router>

  beforeEach(() => {
    routerMock = {
      navigate: vi.fn(),
    }

    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [AuthState, { provide: Router, useValue: routerMock }],
    })

    authState = TestBed.inject(AuthState)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should set user and navigate to home on successful login', () => {
    // Arrange
    const uuid = '123'
    const username = 'testuser'
    const email = 'user@example.com'

    // Act
    authState.login({ user: { uuid, username, email } })

    // Assert
    expect(authState.user()?.uuid).toBe(uuid)
    expect(authState.user()?.username).toBe(username)
    expect(authState.user()?.email).toBe(email)
    expect(routerMock.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should set user to null and navigate to login on logout', () => {
    // Arrange
    const uuid = '123'
    const username = 'testuser'
    const email = 'user@example.com'
    authState.user.set({ uuid, username, email })

    // Act
    authState.logout()

    expect(authState.user()).toBeNull()
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login'])
  })
})
