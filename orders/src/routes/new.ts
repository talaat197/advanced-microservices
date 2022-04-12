import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth, OrderStatus, BadRequestError } from '@stgtalaat/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import Order from '../models/order'

const router = express.Router()

router.post('/api/orders', requireAuth, [
  body('ticketId').
    not().
    isEmpty().
    custom((input: string) => mongoose.Types.ObjectId.isValid(input)).
    withMessage('TicketId must be provided')
], async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError()
  }

  const isReserved = await ticket.isReserved();

  if (isReserved) {
    throw new BadRequestError("Ticket already reserved")
  }


  res.send({})
})

export { router as newOrderRouter }