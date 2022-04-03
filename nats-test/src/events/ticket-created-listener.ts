import { Message } from 'node-nats-streaming'
import { EventListener } from "./base-listener"
import { Subjects } from './subjects'
import { TicketCreatedEvent } from './ticket-created-event'

export class TickerCreatedListener extends EventListener<TicketCreatedEvent>{
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = 'listener-queue-group'

  onMessage(parsedData: TicketCreatedEvent['data'], msg: Message): void {
      console.log('ticket created', parsedData)

      msg.ack()
  }
}