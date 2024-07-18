import { TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'

import { RemixListState } from './remix-list.state'

import { RemixRepository } from '@core/repositories'
import { Artist, FetchStatus, PageResponse, Remix } from '@core/models'

describe('RemixListState', () => {
  let remixListState: RemixListState
  let remixRepository: RemixRepository

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemixListState,
        {
          provide: RemixRepository,
          useValue: {
            get: vi.fn(),
          },
        },
      ],
    })

    remixListState = TestBed.inject(RemixListState)
    remixRepository = TestBed.inject(RemixRepository)
  })

  it('should call the get method of the remix repository with the correct parameters', () => {
    // Arrange
    const offset = 0
    const limit = remixListState['LIMIT']
    const response: PageResponse<Remix> = { data: [], meta: { limit: 0, offset: 0, total: 0, count: 0 } }
    vi.spyOn(remixRepository, 'get').mockReturnValue(of(response))

    // Act
    remixListState.fetch()

    // Assert
    expect(remixRepository.get).toHaveBeenCalledWith({ offset, limit })
  })

  it('should update remixes, total anb status on fetch success', () => {
    // Arrange
    const artist: Artist = { id: '123', name: 'Artist' }
    const remixes: Remix[] = [
      { id: '1', title: 'Remix 1', images: [], artist, duration: 0 },
      { id: '2', title: 'Remix 2', images: [], artist, duration: 0 },
    ]
    const response: PageResponse<Remix> = { data: remixes, meta: { limit: 2, offset: 2, total: 2, count: 2 } }
    vi.spyOn(remixRepository, 'get').mockReturnValue(of(response))

    // Act
    remixListState.fetch()

    // Assert
    expect(remixListState.remixes()).toEqual(remixes)
    expect(remixListState.status()).toBe(FetchStatus.Success)
    expect(remixListState.total()).toBe(2)
  })

  it('should set the status to Error on fetch error', () => {
    // Arrange
    const error = new Error('An error occurred')
    vi.spyOn(remixRepository, 'get').mockReturnValue(throwError(() => error))

    // Act
    remixListState.fetch()

    // Assert
    expect(remixListState.status()).toBe(FetchStatus.Error)
    expect(remixListState.error()).toBe(error.message)
  })
})
