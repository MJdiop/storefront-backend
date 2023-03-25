import { Response, Request } from 'express'
import { createdProduct } from '../services/products'

const createProductCtlr = async (req: Request, res: Response) => {
  const product = req.body
  const productCreated = await createdProduct(product)

  return res.status(201).json({ message: 'successfully created product', code: 201, error: null, data: productCreated })
}

export { createProductCtlr }