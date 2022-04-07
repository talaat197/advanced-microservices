import { EventPublisher, Subjects, TicketCreatedEvent } from "@stgtalaat/common";

export class TicketCreatedPublisher extends EventPublisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated
}