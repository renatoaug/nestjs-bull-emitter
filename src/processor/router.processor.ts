import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('router')
export class RouterProcessor {
  @Process('updated')
  async onContentUpdated(job: Job): Promise<void> {
    console.info('Job data:', job.data)
  }
}