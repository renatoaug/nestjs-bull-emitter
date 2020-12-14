import { Processor, Process } from '@nestjs/bull'
import * as Bull from 'bull'
import { Job } from 'bull'
import { Logger } from '@nestjs/common'

@Processor('router')
export class RouterProcessor {
  @Process('send')
  async send(job: Job): Promise<void> {
    Logger.log(`Routing event ${job.data}`, RouterProcessor.name)

    const { type, action } = job.data

    if (type === 'io.skore.content' && action === 'updated') {
      const queue = new Bull('content', {
        prefix: 'receiver',
        redis: {
          host: process.env.REDIS_URL, 
          port: Number(process.env.REDIS_PORT), 
          password: process.env.REDIS_PASSWORD,
        }
      })
      
      await queue.add('updated', job.data)
    }
  }
}