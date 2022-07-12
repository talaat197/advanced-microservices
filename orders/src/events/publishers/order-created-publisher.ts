import {EventPublisher, OrderCreatedEvent, Subjects} from '@stgtalaat/common'

export class OrderCreatedPublisher extends EventPublisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}