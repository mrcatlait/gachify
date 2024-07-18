import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(duration?: number | null): string {
    if (!duration && duration !== 0) {
      return ''
    }

    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)

    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${returnedSeconds}`
  }
}
