import { Processor, Process } from '@nestjs/bull'
import * as Bull from 'bull'
import { Job } from 'bull'
import { Logger } from '@nestjs/common'
import { EventDocument } from '../document'

@Processor('router')
export class RouterProcessor {
  constructor(private readonly eventDocument: EventDocument) {}

  @Process('send')
  async send(job: Job): Promise<void> {
    Logger.log(`Routing event ${JSON.stringify(job.data)}`, RouterProcessor.name)

    const events = this.eventDocument.findAllEvents()
    const promises = []

    for (const event of events) {
      const queue = new Bull(event.type, {
        prefix: 'receiver',
        redis: {
          host: process.env.REDIS_URL, 
          port: Number(process.env.REDIS_PORT), 
          password: process.env.REDIS_PASSWORD,
        }
      })

      promises.push(queue.add(event.action, job.data))
    }

    await Promise.all(promises)
  }
}