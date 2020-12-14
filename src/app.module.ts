import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { UpdateContentService } from './service'
import { RouterProcessor } from './processor'
import { ContentController } from './controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      prefix: 'emitter',
      redis: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
      },
    }),
    BullModule.registerQueueAsync({
      name: 'router',
      imports: [],
    }),
  ],
  controllers: [ContentController],
  providers: [UpdateContentService, RouterProcessor],
})
export class AppModule {}
