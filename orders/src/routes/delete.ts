import { NotAuthorizeError, NotFoundError, OrderStatus, requireAuth } from '@stgtalaat/common'
import express, {Request, Response} from 'express'
import Order from '../models/order'

const router = express.Router()

router.delete('/api/orders/:orderId',requireAuth, async (req: Request, res: Response) => {
  const orderId = req.params.orderId

  const order = await Order.findById(orderId)

  if (!order) {
    throw new NotFoundError()
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizeError()
  }

  order.status = OrderStatus.Cancelled
  await order.save()

  // todo: publish cancel event

  res.send(order)
})

export {router as deleteOrderRouter}