import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

import { UserRepository } from './user.repository'

import { User } from '@core/models'

describe('UserRepository', () => {
  let userRepository: UserRepository
  let httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepository],
    })

    userRepository = TestBed.inject(UserRepository)
    httpClient = TestBed.inject(HttpClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should get user details', () => {
    // Arrange
    const mockResponse: User = { uuid: '1', username: 'John Doe', email: 'example@example.com' }
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    userRepository.whoAmI().subscribe((user) => {
      // Assert
      expect(user).toEqual(mockResponse)
    })
  })
})
