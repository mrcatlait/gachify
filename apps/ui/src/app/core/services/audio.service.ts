import { Injectable, Injector, OnDestroy, inject } from '@angular/core'

import { AudioState, PlaybackState } from '@core/state'

enum AudioEvents {
  TIME_UPDATE = 'timeupdate',
  DURATION_CHANGE = 'durationchange',
  LOADED_DATA = 'loadeddata',
  LOADED_METADATA = 'loadedmetadata',
  ENDED = 'ended',
}

@Injectable({
  providedIn: 'root',
})
export class AudioService implements OnDestroy {
  private readonly audio = new Audio()
  private readonly injector = inject(Injector)

  constructor() {
    this.registerEvents()
  }

  ngOnDestroy() {
    this.removeEvents()
    this.audio.remove()
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  // Buffer implementation
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges
  seek(seconds: number) {
    this.audio.currentTime = seconds
  }

  setVolume(volume: number) {
    if (this.audio.muted) {
      this.audio.muted = false
    }

    if (this.audio.volume === 0) {
      this.audio.muted = true
    }

    this.audio.volume = Number((volume / 100).toFixed(2))
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted
  }

  load(songId: string) {
    this.audio.src = `/assets/mocks/${songId}.mp3`
    this.audio.load()
  }

  private registerEvents() {
    this.audio.addEventListener(AudioEvents.LOADED_DATA, this.onLoadedData)
    this.audio.addEventListener(AudioEvents.TIME_UPDATE, this.onTimeUpdate)
    this.audio.addEventListener(AudioEvents.LOADED_METADATA, this.onLoadedMetadata)
    this.audio.addEventListener(AudioEvents.ENDED, this.onEnded)
  }

  private removeEvents() {
    this.audio.removeEventListener(AudioEvents.LOADED_DATA, this.onLoadedData)
    this.audio.removeEventListener(AudioEvents.TIME_UPDATE, this.onTimeUpdate)
    this.audio.removeEventListener(AudioEvents.LOADED_METADATA, this.onLoadedMetadata)
    this.audio.removeEventListener(AudioEvents.ENDED, this.onEnded)
  }

  private readonly onLoadedData = () => {
    this.injector.get(AudioState).play()
  }

  private readonly onTimeUpdate = () => {
    this.injector.get(AudioState).setTime({ time: Math.floor(this.audio.currentTime) })
  }

  private readonly onLoadedMetadata = () => {
    // this.store.dispatch(new AudioActions.SetDuration({ duration: Math.floor(this.audio.duration) }))
  }

  private readonly onEnded = () => {
    this.injector.get(PlaybackState).ended()
  }
}
