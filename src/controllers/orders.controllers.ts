import { Response, Request } from 'express'

import { createOrder, createOrderProduct, getOrdersByUser, getOrdersByUserAndStatus } from '../services/orders'


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

const getOrdersByUserAndStatusCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  const status = req.query.status
  const orders = await getOrdersByUserAndStatus(userId, status)

  return res.status(200).json({ message: 'successfully fetched orders', code: 200, error: null, data: orders })
}

const createOrderProductCtlr = async (req: Request, res: Response) => {
  const orderProduct = req.body
  const createdOrderProduct = await createOrderProduct(orderProduct)

  return res.status(201).json({ message: 'successfully created order product', code: 201, error: null, data: createdOrderProduct })
}

export { createOrderCtlr, getOrdersByUserCtlr, getOrdersByUserAndStatusCtlr, createOrderProductCtlr }