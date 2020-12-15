import { SetMetadata } from '@nestjs/common'

export function RouterEvent(type: string, action: string): MethodDecorator {
  return SetMetadata('emitter:event', { type, action })
}
