import { EMPTY, Observable, of, throwError } from 'rxjs'

import { EntityState } from './entity.state'

import { FetchStatus } from '@core/models'

class TestState extends EntityState<unknown, void> {
  fetchFn = vi.fn((): Observable<unknown> => EMPTY)
}

describe('EntityState', () => {
  let state: TestState

  beforeEach(() => {
    state = new TestState()
  })

  it('should set status to Loading when fetch is called', () => {
    // Act
    state.fetch()

    // Assert
    expect(state.status()).toBe(FetchStatus.Loading)
    expect(state.fetchFn).toHaveBeenCalled()
  })

  it('should set data and status to Success when fetch is successful', () => {
    // Arrange
    const responseData = { id: 1, name: 'Entity' }
    state.fetchFn.mockReturnValue(of(responseData))

    // Act
    state.fetch()

    // Assert
    expect(state.data()).toBe(responseData)
    expect(state.status()).toBe(FetchStatus.Success)
    expect(state.fetchFn).toHaveBeenCalled()
  })

  it('should set error and status to Error when fetch encounters an error', () => {
    // Arrange
    const error = new Error('Fetch error')
    state.fetchFn.mockReturnValue(throwError(() => error))

    // Act
    state.fetch()

    // Assert
    expect(state.error()).toBe(error.message)
    expect(state.status()).toBe(FetchStatus.Error)
    expect(state.fetchFn).toHaveBeenCalled()
  })
})
