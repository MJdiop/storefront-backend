import { Response, Request } from 'express'
import { createdProduct, getAllProducts, getOneProduct } from '../services/products'

const createProductCtlr = async (req: Request, res: Response) => {
  const product = req.body
  const productCreated = await createdProduct(product)

  return res.status(201).json({ message: 'successfully created product', code: 201, error: null, data: productCreated })
}

const getAllProductsCtlr = async (req: Request, res: Response) => {
  const products = await getAllProducts()

  return res.status(200).json({ message: 'successfully get all products', code: 200, error: null, data: products })
}

const getOneProductCtlr = async (req: Request, res: Response) => {
  const product = await getOneProduct(+req.params.id)

  return res.status(200).json({ message: 'successfully get product', code: 200, error: null, data: product })
}

export { createProductCtlr, getAllProductsCtlr, getOneProductCtlr }