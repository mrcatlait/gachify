import { Injectable, computed, inject } from '@angular/core'

import { RemixRepository } from '@core/repositories'
import { Queue, Remix } from '@core/models'
import { EntityState } from '@core/state'

@Injectable()
export class RemixPopularState extends EntityState<Remix[], void> {
  private readonly repository = inject(RemixRepository)

  readonly remixes = computed(() => this.data() || [])
  readonly queue = computed<Queue>(() => {
    const remixes = this.remixes()

    return {
      remixes,
      source: { entityId: 'popular', name: 'Popular remixes' },
    }
  })

  protected fetchFn = () => this.repository.getPopular()
}
