import { Message } from "node-nats-streaming";
import {Subjects, EventListener, TicketCreatedEvent} from '@stgtalaat/common'
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends EventListener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(parsedData: TicketCreatedEvent['data'], msg: Message) {
    const {id, title, price} = parsedData

    const ticket = Ticket.build({
      id,
      title,
      price
    })
    await ticket.save()

    msg.ack()
  }

}