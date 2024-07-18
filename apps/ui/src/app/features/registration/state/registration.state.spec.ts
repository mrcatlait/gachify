import { HttpErrorResponse } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'

import { RegistrationService } from '../services'
import { RegistrationState } from './registration.state'

describe('RegistrationState', () => {
  let registrationState: RegistrationState
  let registrationService: RegistrationService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationState,
        {
          provide: RegistrationService,
          useValue: {
            register: vi.fn(),
          },
        },
      ],
    }).compileComponents()

    registrationState = TestBed.inject(RegistrationState)
    registrationService = TestBed.inject(RegistrationService)
  })

  it('should call registration service and set loading to false on success', () => {
    // Arrange
    const payload = { username: 'test', email: '', password: 'qwerty' }
    vi.spyOn(registrationService, 'register').mockReturnValue(of(null))

    // Act
    registrationState.register(payload)

    // Assert
    expect(registrationService.register).toHaveBeenCalledWith(payload)
    expect(registrationState.loading()).toBe(false)
  })

  it('should set emailTaken and usernameTaken to true and loading to false on 400 error', () => {
    // Arrange
    const payload = { username: 'test', email: '', password: 'qwerty' }
    const error = new HttpErrorResponse({ status: 400, error: { emailTaken: true, usernameTaken: true } })
    vi.spyOn(registrationService, 'register').mockReturnValue(throwError(() => error))

    // Act
    registrationState.register(payload)

    // Assert
    expect(registrationState.emailTaken()).toBe(true)
    expect(registrationState.usernameTaken()).toBe(true)
    expect(registrationState.loading()).toBe(false)
  })
})
