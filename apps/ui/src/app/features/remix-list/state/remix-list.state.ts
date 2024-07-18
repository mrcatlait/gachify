import { Injectable, computed, inject, signal } from '@angular/core'
import { take } from 'rxjs'

import { RemixRepository } from '@core/repositories'
import { FetchStatus, PageResponse, Remix, StateModel } from '@core/models'

interface RemixListStateModel {}

@Injectable()
export class RemixListState implements StateModel<RemixListStateModel> {
  private readonly LIMIT = 50

  private readonly repository = inject(RemixRepository)

  readonly remixes = signal<Remix[] | null>(null)
  readonly total = signal<number | null>(null)
  readonly status = signal(FetchStatus.Pending)
  readonly error = signal<string | null>(null)

  readonly loading = computed(() => this.status() === FetchStatus.Loading)

  readonly hasNextPage = computed(() => {
    const remixes = this.remixes()
    const total = this.total()

    return remixes && total && remixes.length < total
  })

  fetch(): void {
    this.status.set(FetchStatus.Loading)

    const offset = this.remixes()?.length ?? 0

    this.repository
      .get({ offset, limit: this.LIMIT })
      .pipe(take(1))
      .subscribe({
        next: (response) => this.fetchSuccess({ ...response }),
        error: (error) => this.fetchError({ error }),
      })
  }

  private fetchSuccess(payload: PageResponse<Remix>): void {
    this.remixes.update((remixes) => (remixes ? remixes.concat(payload.data) : payload.data))
    this.total.set(payload.meta.total)
    this.status.set(FetchStatus.Success)
  }

  private fetchError(payload: { error: Error }): void {
    this.error.set(payload.error.message)
    this.status.set(FetchStatus.Error)
  }
}
