import { EventPublisher, Subjects, TicketUpdatedEvent } from "@stgtalaat/common";

export class TicketUpdatedPublisher extends EventPublisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated
}