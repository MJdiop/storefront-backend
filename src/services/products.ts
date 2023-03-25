import client from '../database'
import { Product } from '../models/product'

const createdProduct = async (product: Product): Promise<Product> => {
  try {
    const connection = await client.connect()
    const sql = 'INSERT INTO products (name, price,description, category) VALUES ($1, $2, $3, $4) RETURNING *'

    const result = await connection.query(sql, [product.name, product.price, product.description, product.category])

    connection.release()
    return await result.rows[0]
  } catch (error) {
    throw new Error(`Error when creating product: ${(error as Error).message}`)
  }
}

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM products'

    const result = await connection.query(sql)

    connection.release()
    return await result.rows
  } catch (error) {
    throw new Error(`Error when getting all products error: ${(error as Error).message}`)
  }
}

const getOneProduct = async (id: number): Promise<Product> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM products WHERE id=($1)'

    const result = await connection.query(sql, [id])

    connection.release()
    return await result.rows[0]
  } catch (error) {
    throw new Error(`Error when getting one product ${(error as Error).message}`)
  }
}

export { createdProduct, getAllProducts, getOneProduct }