import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

import { RemixRepository } from './remix.repository'

import { PageOptions, PageResponse, Remix } from '@core/models'

describe('RemixRepository', () => {
  let remixRepository: RemixRepository
  let httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RemixRepository],
    })

    remixRepository = TestBed.inject(RemixRepository)
    httpClient = TestBed.inject(HttpClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should get popular remixes', () => {
    // Arrange
    const mockResponse: PageResponse<Partial<Remix>> = {
      data: [
        { id: '1', title: 'Remix 1' },
        { id: '2', title: 'Remix 2' },
      ],
      meta: { limit: 2, offset: 2, total: 2, count: 2 },
    }

    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    remixRepository.getPopular().subscribe((remixes) => {
      // Assert
      expect(remixes).toEqual(mockResponse.data)
    })
  })

  it('should get remixes with page options', () => {
    // Arrange
    const pageOptions: PageOptions = { limit: 10, offset: 0 }
    const mockResponse: PageResponse<Partial<Remix>> = {
      data: [
        { id: '1', title: 'Remix 1' },
        { id: '2', title: 'Remix 2' },
      ],
      meta: { limit: 2, offset: 2, total: 2, count: 2 },
    }

    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    remixRepository.get(pageOptions).subscribe((response) => {
      // Assert
      expect(response).toEqual(mockResponse)
    })
  })
})
