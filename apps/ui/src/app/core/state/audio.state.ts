import { Injectable, computed, inject, signal } from '@angular/core'

import { PlayerStatus, Remix, StateModel } from '@core/models'
import { AudioService, CookieService, SeoService } from '@core/services'

const VOLUME_COOKIE = 'volume'

interface AudioStateModel {
  remix: Remix | null
  status: PlayerStatus
  muted: boolean
  volume: number
  currentTime: number
}

@Injectable({
  providedIn: 'root',
})
export class AudioState implements StateModel<AudioStateModel> {
  private readonly seoService = inject(SeoService)
  private readonly cookieService = inject(CookieService)
  private readonly audioService = inject(AudioService)

  readonly remix = signal<Remix | null>(null)
  readonly status = signal(PlayerStatus.Pending)
  readonly muted = signal(false)
  readonly volume = signal(50)
  readonly currentTime = signal(0)

  readonly active = computed(() => this.status() !== PlayerStatus.Pending)
  readonly playing = computed(() => this.status() === PlayerStatus.Playing)
  readonly duration = computed(() => this.remix()?.duration ?? 0)

  constructor() {
    const volume = this.cookieService.get(VOLUME_COOKIE)

    if (volume) {
      this.setVolume({ volume: Number(volume) })
    }
  }

  load(payload: { remix: Remix }): void {
    this.status.set(PlayerStatus.Loading)
    this.currentTime.set(0)
    this.remix.set(payload.remix)

    this.audioService.load(payload.remix.id)
  }

  play(): void {
    this.status.set(PlayerStatus.Playing)

    this.seoService.setTitle(this.remix()?.title)
    this.audioService.play()
  }

  pause(): void {
    this.status.set(PlayerStatus.Paused)

    this.seoService.resetTitle()
    this.audioService.pause()
  }

  togglePlay(): void {
    switch (this.status()) {
      case PlayerStatus.Playing:
        return this.pause()
      case PlayerStatus.Paused:
        return this.play()
      default:
        return
    }
  }

  seek(payload: { time: number }): void {
    this.currentTime.set(payload.time)

    this.audioService.seek(payload.time)
  }

  setTime(payload: { time: number }): void {
    this.currentTime.set(payload.time)
  }

  setVolume(payload: { volume: number }): void {
    this.cookieService.set({ name: VOLUME_COOKIE, value: String(payload.volume), expires: 30 })

    this.volume.set(payload.volume)
    this.muted.set(payload.volume === 0)

    this.audioService.setVolume(payload.volume)
  }

  toggleMute(): void {
    this.muted.set(!this.muted() || this.volume() === 0)

    this.audioService.toggleMute()
  }
}
