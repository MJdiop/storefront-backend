import { Response, Request } from 'express'

import { createOrder, getOrdersByUser } from '../services/orders'


const createOrderCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  const createdOrder = await createOrder(userId, 'active')

  return res.status(201).json({ message: 'successfully created order ', code: 201, error: null, data: createdOrder })
}

const getOrdersByUserCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  const orders = await getOrdersByUser(userId)

  return res.status(200).json({ message: 'successfully fetched orders', code: 200, error: null, data: orders })
}

export { createOrderCtlr, getOrdersByUserCtlr }