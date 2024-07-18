import { ImageUrlPipe } from './image-url.pipe'

import { Image, ImageSize } from '@core/models'

describe('ImageSizePipe', () => {
  let pipe: ImageUrlPipe

  beforeEach(() => {
    pipe = new ImageUrlPipe()
  })

  it('should return undefined if images array is empty', () => {
    // Arrange
    const images: Image[] = []

    // Act
    const transformedImage = pipe.transform(images)

    // Assert
    expect(transformedImage).toBeUndefined()
  })

  it('should return undefined if no image with specified size is found', () => {
    // Arrange
    const images: Image[] = [
      { size: ImageSize.SMALL, url: 'SMALL' },
      { size: ImageSize.MEDIUM, url: 'MEDIUM' },
    ]

    // Act
    const transformedImage = pipe.transform(images, ImageSize.LARGE)

    // Assert
    expect(transformedImage).toBeUndefined()
  })

  it('should return the first image with specified size', () => {
    // Arrange
    const images: Image[] = [
      { size: ImageSize.SMALL, url: 'SMALL' },
      { size: ImageSize.MEDIUM, url: 'MEDIUM' },
      { size: ImageSize.LARGE, url: 'LARGE' },
    ]

    // Act
    const transformedImage = pipe.transform(images, ImageSize.MEDIUM)

    // Assert
    expect(transformedImage).toEqual('MEDIUM')
  })
})
