import { DiscoveredMethodWithMeta } from '@golevelup/nestjs-discovery'
import { Injectable } from '@nestjs/common'
import { Workflow, Event } from '../domain'

@Injectable()
export class EventDocument {
  private workflow: Workflow

  attachProvidersToEvents(
    providerMethods: DiscoveredMethodWithMeta<any>[],
  ): void {
    this.workflow = new Workflow()

    providerMethods
      .filter(provider => provider.meta.type && provider.meta.action)
      .forEach(provider => {
        this.workflow.attachToEvent(provider.meta.type, provider.meta.action)
      })
  }

  findAllEvents(): Event[] {
    return this.workflow.events
  }
}
