import Joi from 'joi'
import * as dotenv from 'dotenv'
import { Injectable, Logger } from '@nestjs/common'

interface Config {
  NODE_ENV: string
  PORT: number
  UI_URL: string
}

@Injectable()
export class ConfigService {
  private readonly envConfig: Config
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(this.constructor.name)

    dotenv.config()
    const config = process.env
    this.envConfig = this.validateInput(config)
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: { [key: string]: unknown }): Config {
    const envVarsSchema = Joi.object<Config>({
      NODE_ENV: Joi.any().allow('development', 'production', 'test', 'provision').default('development'),
      PORT: Joi.number().default(4000),
      UI_URL: Joi.string().uri().required(),
    }).unknown()

    const { error, value } = envVarsSchema.validate(envConfig)

    if (error) {
      this.logger.error(`Config validation error: ${error.message}`)
      process.exit(1)
    }

    return value
  }

  get<Key extends keyof Config>(key: Key): Config[Key] {
    return this.envConfig[key]
  }
}
