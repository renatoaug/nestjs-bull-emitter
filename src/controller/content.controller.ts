import { Controller, HttpCode, Logger, Param, Put } from '@nestjs/common'
import { UpdateContentService } from '../service'

@Controller('contents')
export class ContentController {
  constructor(private readonly updateContentService: UpdateContentService) {}
  
  @Put(':id')
  @HttpCode(204)
  async updateContent(@Param('id') id: string,): Promise<void> {
    Logger.log(`Updating content ${id}`, ContentController.name)

    await this.updateContentService.perform(id)
  }
}