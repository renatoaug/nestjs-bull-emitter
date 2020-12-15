import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class UpdateContentService {
  constructor(@InjectQueue('router') private routerQueue: Queue) {}
  
  async perform(contentId: string): Promise<void> {
    await this.routerQueue.add('send', { content_id: contentId })
  }
}
