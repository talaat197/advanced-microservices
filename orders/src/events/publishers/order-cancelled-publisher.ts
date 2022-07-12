import {EventPublisher, OrderCancelledEvent, Subjects} from '@stgtalaat/common'

export class OrderCancelledPublisher extends EventPublisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}