import { Test } from '@nestjs/testing'
import * as dotenv from 'dotenv'

import { ConfigService } from './config.service'

describe('Config Service', () => {
  dotenv.config()
  const OLD_ENV = process.env

  const initService = async (): Promise<ConfigService> => {
    const module = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile()
    return module.get<ConfigService>(ConfigService)
  }

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should be defined', async () => {
    const configService = await initService()
    expect(configService).toBeDefined()
  })

  describe('validate', () => {
    it('should throw an error if PORT is not a number', async () => {
      process.env.PORT = 'three thousand'
      await expect(initService()).rejects.toThrow()
    })
  })

  describe('get', () => {
    it('should return variable by key', async () => {
      const configService = await initService()
      expect(configService.get('PORT')).toEqual(4000)
    })
  })

  describe('getString', () => {
    it('should return string by key', async () => {
      const configService = await initService()
      expect(configService.get('PORT')).toEqual(4000)
    })
  })

  describe('getNumber', () => {
    it('should return number by key', async () => {
      const configService = await initService()
      expect(configService.get('PORT')).toEqual(4000)
    })
  })
})
