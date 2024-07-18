import { ExtendedDurationPipe } from './extended-duration.pipe'

describe('ExtendedDurationPipe', () => {
  let pipe: ExtendedDurationPipe

  beforeEach(() => {
    pipe = new ExtendedDurationPipe()
  })

  it('should transform duration of 3600 to "1 hr"', () => {
    const duration = 3600
    const transformedDuration = pipe.transform(duration)
    expect(transformedDuration).toEqual('1 hr')
  })

  it('should transform duration of 1800 to "30 min"', () => {
    const duration = 1800
    const transformedDuration = pipe.transform(duration)
    expect(transformedDuration).toEqual('30 min')
  })

  it('should transform duration of 7200 to "2 hr"', () => {
    const duration = 7200
    const transformedDuration = pipe.transform(duration)
    expect(transformedDuration).toEqual('2 hr')
  })

  it('should transform duration of 5400 to "1 hr 30 min"', () => {
    const duration = 5400
    const transformedDuration = pipe.transform(duration)
    expect(transformedDuration).toEqual('1 hr 30 min')
  })

  it('should transform duration of 0 to ""', () => {
    const duration = 0
    const transformedDuration = pipe.transform(duration)
    expect(transformedDuration).toEqual('')
  })
})
