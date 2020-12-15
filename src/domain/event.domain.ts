export class Event {
  constructor(type: string, action: string) {
    this.type = type
    this.action = action
  }

  type: string
  action: string
}
