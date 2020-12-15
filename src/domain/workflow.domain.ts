import { Type } from 'class-transformer'
import { Event } from './event.domain'

export class Workflow {
  @Type(() => Event)
  events: Event[] = []

  attachToEvent(
    eventType: string,
    eventAction: string,
  ): void {
    const event = new Event(eventType, eventAction)
    
    if (this.canAttachEvent(eventType, eventAction)) this.events.push(event)
  }

  canAttachEvent(type: string, action: string): boolean {
    return this.events.filter(event => event.action === action && event.type === type).length === 0
  }
}
