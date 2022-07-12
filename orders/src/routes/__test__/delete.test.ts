import request from 'supertest'
import { app } from '../../app'
import Order, {OrderStatus} from '../../models/order'
import { Ticket } from '../../models/ticket'

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'test',
    price: 20
  })
  await ticket.save()

  return ticket
}

it('cancel order for particular user', async () => {
  const ticket = await buildTicket()

  const user = global.signin()

  const { body: order } = await request(app).post('/api/orders').set('Cookie', user).send({ ticketId: ticket.id }).expect(201)

  await request(app).delete('/api/orders/' + order.id).set('Cookie', user).send().expect(200)

  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it.todo('emits order cancel event');