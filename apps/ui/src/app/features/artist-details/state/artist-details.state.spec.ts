import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { ArtistDetailsState } from './artist-details.state'

import { Artist, PageResponse, Remix } from '@core/models'
import { ArtistRepository } from '@core/repositories'

describe('ArtistDetailsState', () => {
  let state: ArtistDetailsState
  let artistRepositoryMock: Partial<ArtistRepository>

  beforeEach(() => {
    artistRepositoryMock = {
      getDetails: vi.fn(),
      getRemixes: vi.fn(),
    }

    TestBed.configureTestingModule({
      providers: [ArtistDetailsState, { provide: ArtistRepository, useValue: artistRepositoryMock }],
    })

    state = TestBed.inject(ArtistDetailsState)
  })

  it('should fetch artist details and remixes', () => {
    // Arrange
    const artistId = '123'
    const total = 2
    const artist: Artist = { id: artistId, name: 'Artist' }
    const remixes: Remix[] = [
      { id: '1', title: 'Remix 1', images: [], artist, duration: 0 },
      { id: '2', title: 'Remix 2', images: [], artist, duration: 0 },
    ]
    const mockResponse: PageResponse<Remix> = {
      data: remixes,
      meta: { limit: 2, offset: 2, total, count: 2 },
    }

    vi.spyOn(artistRepositoryMock, 'getDetails').mockReturnValue(of(artist))
    vi.spyOn(artistRepositoryMock, 'getRemixes').mockReturnValue(of(mockResponse))

    // Act
    state.fetch({ artistId })

    // Assert
    expect(state.data()).toEqual({ artist, remixes, total })

    expect(artistRepositoryMock.getDetails).toHaveBeenCalledWith(artistId)
    expect(artistRepositoryMock.getRemixes).toHaveBeenCalledWith(artistId)
  })

  it('should compute the queue', () => {
    // Arrange
    const artistId = '123'
    const artist: Artist = { id: artistId, name: 'Artist' }
    const remixes: Remix[] = [
      { id: '1', title: 'Remix 1', images: [], artist, duration: 0 },
      { id: '2', title: 'Remix 2', images: [], artist, duration: 0 },
    ]
    state.data.set({ artist, remixes, total: 2 })

    // Act
    const queue = state.queue()

    // Assert
    expect(queue).toEqual({
      remixes,
      source: { entityId: artistId, name: artist.name },
    })
  })
})
