import { Pipe, PipeTransform } from '@angular/core'

import { Image, ImageSize } from '@core/models'

type ImageSizeValues = `${ImageSize}`

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(images?: Image[], size: ImageSizeValues = ImageSize.SMALL): string | undefined {
    if (!images || images.length === 0) {
      return
    }

    return images.find((image) => image.size === size)?.url
  }
}
