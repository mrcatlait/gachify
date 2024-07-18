import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'extendedDuration',
})
export class ExtendedDurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    // const hoursDisplay = hours > 0 ? `${hours} hour${hours !== 1 && 's'}` : ''
    // const minutesDisplay = minutes > 0 ? `${minutes} minute${minutes !== 1 && 's'}` : ''

    const hoursDisplay = hours > 0 ? `${hours} hr` : ''
    const minutesDisplay = minutes > 0 ? `${minutes} min` : ''
    const separator = hoursDisplay && minutesDisplay ? ' ' : ''

    return hoursDisplay + separator + minutesDisplay
  }
}
