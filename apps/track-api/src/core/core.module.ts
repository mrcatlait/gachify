import { Module } from '@nestjs/common'

import { ConfigService } from './services'

@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CoreModule {}
