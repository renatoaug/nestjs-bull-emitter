import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class UpdateContentService {
  constructor(@InjectQueue('router') private routerQueue: Queue) {}
  
  async perform(): Promise<void> {
    await this.routerQueue.add('send', { type: 'io.skore.content', action: 'updated' })
  }
}
