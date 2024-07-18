export enum ImageSize {
  SMALL = 'small', // 56x56
  MEDIUM = 'medium', // 256x256
  LARGE = 'large', // 720x720
}

export interface Image {
  url: string
  size: ImageSize
}
