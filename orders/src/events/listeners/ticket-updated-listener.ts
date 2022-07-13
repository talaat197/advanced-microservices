import { Message } from "node-nats-streaming";
import {Subjects, EventListener, TicketUpdatedEvent} from '@stgtalaat/common'
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends EventListener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(parsedData: TicketUpdatedEvent['data'], msg: Message) {
    const {id, title, price} = parsedData

    const ticket = await Ticket.findById(id)
    
    if(!ticket) { 
      throw new Error('Ticket not found')
    }
    ticket.set({title, price})
    await ticket.save()

    msg.ack()
  }

}