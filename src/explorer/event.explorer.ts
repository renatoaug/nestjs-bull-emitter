import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { EventDocument } from '../document'

@Injectable()
export class EventExplorer implements OnModuleInit {
  constructor(
    private readonly eventDocument: EventDocument,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async onModuleInit(): Promise<void> {
    const providers = await this.discoveryService.providerMethodsWithMetaAtKey('emitter:event')

    Logger.log(`Found ${providers.length} event to router`, EventExplorer.name)

    this.eventDocument.attachProvidersToEvents(providers)
  }
}
