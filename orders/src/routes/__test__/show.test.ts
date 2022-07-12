import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import Order from '../../models/order'
import { Ticket } from '../../models/ticket'

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'test',
    price: 20
  })
  await ticket.save()

  return ticket
}

const buildOrder = async () => {
  const ticket = Ticket.build({
    title: 'test',
    price: 20
  })
  await ticket.save()

  return ticket
}

it('fetches order for particular user by order id', async () => {
  const ticketOne = await buildTicket()

  const user = global.signin()

  const { body: order } = await request(app).post('/api/orders').set('Cookie', user).send({ ticketId: ticketOne.id }).expect(201)

  const { body: fetchedOrder } = await request(app).get('/api/orders/' + order.id).set('Cookie', user).send().expect(200)

  expect(fetchedOrder.id).toEqual(order.id)
})

it('returns an error if user tries to fetch order not created by him', async () => {
  const ticketOne = await buildTicket()

  const user = global.signin()

  const { body: order } = await request(app).post('/api/orders').set('Cookie', global.signin()).send({ ticketId: ticketOne.id }).expect(201)

  await request(app).get('/api/orders/' + order.id).set('Cookie', user).send().expect(401)
})