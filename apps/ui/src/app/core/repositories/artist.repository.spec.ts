import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

import { ArtistRepository } from './artist.repository'

import { Artist, PageResponse, Remix } from '@core/models'

describe('ArtistRepository', () => {
  let artistRepository: ArtistRepository
  let httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistRepository],
    })

    artistRepository = TestBed.inject(ArtistRepository)
    httpClient = TestBed.inject(HttpClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should get popular artists', () => {
    // Arrange
    const mockResponse: PageResponse<Artist> = {
      data: [
        { id: '1', name: 'Artist 1' },
        { id: '2', name: 'Artist 2' },
      ],
      meta: { limit: 2, offset: 2, total: 2, count: 2 },
    }
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    artistRepository.getPopular().subscribe((artists) => {
      // Assert
      expect(artists).toEqual(mockResponse.data)
    })
  })

  it('should get artist details', () => {
    // Arrange
    const artistId = '1'
    const mockResponse: Artist = { id: artistId, name: 'Artist 1' }
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    artistRepository.getDetails(artistId).subscribe((artist) => {
      // Assert
      expect(artist).toEqual(mockResponse)
    })
  })

  it('should get artist remixes', () => {
    // Arrange
    const artistId = '1'
    const mockResponse: PageResponse<Partial<Remix>> = {
      data: [
        { id: '1', title: 'Remix 1' },
        { id: '2', title: 'Remix 2' },
      ],
      meta: { limit: 2, offset: 2, total: 2, count: 2 },
    }
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    artistRepository.getRemixes(artistId).subscribe((remixes) => {
      // Assert
      expect(remixes).toEqual(mockResponse)
    })
  })

  it('should get similar artists', () => {
    // Arrange
    const mockResponse: PageResponse<Artist> = {
      data: [
        { id: '1', name: 'Artist 1' },
        { id: '2', name: 'Artist 2' },
      ],
      meta: { limit: 2, offset: 2, total: 2, count: 2 },
    }
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse))

    // Act
    artistRepository.getSimilarArtists().subscribe((artists) => {
      // Assert
      expect(artists).toEqual(mockResponse.data)
    })
  })
})
