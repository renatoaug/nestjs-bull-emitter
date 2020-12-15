import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { UpdateContentService } from './service'
import { RouterProcessor } from './processor'
import { ContentController } from './controller'
import { EventExplorer } from './explorer'
import { EventDocument } from './document'
import { ReceiverModule } from '@renatoaug/nestjs-bull-receiver'

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
    BullModule.registerQueueAsync(
      { name: 'router' }, 
      { name: 'content' }
    ),
    DiscoveryModule,
    ReceiverModule,
  ],
  controllers: [ContentController],
  providers: [UpdateContentService, RouterProcessor, EventExplorer, EventDocument],
})
export class AppModule {}
