import client from '../database'
import { Order, OrderProduct } from '../models/order'

const createOrder = async (id: number, status: string): Promise<Order> => {
  try {
    const connection = await client.connect()
    const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'

    const result = await connection.query(sql, [id, status])

    connection.release()
    return await result.rows[0]
  } catch (error) {
    throw new Error(`Error when creating order: ${(error as Error).message}`)
  }
}

const createOrderProduct = async (orderProduct: OrderProduct): Promise<OrderProduct> => {
  try {
    const connection = await client.connect()
    let sql = 'SELECT * FROM orders WHERE id=($1)'
    let result = await connection.query(sql, [orderProduct.id])

    if (result.rows.length && result.rows[0].status === 'active') {
      sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
      result = await connection.query(sql, [
        orderProduct.id,
        orderProduct.productId,
        orderProduct.quantity
      ])
      connection.release()
      return result.rows[0]
    } else {
      connection.release()
      throw new Error('Faild to add product to the order, order is not found or maybe completed')
    }
  } catch (error) {
    throw new Error(`Error when creating order product: ${(error as Error).message}`)
  }
}

const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM orders WHERE user_id=($1)'

    const result = await connection.query(sql, [userId])

    connection.release()
    return result.rows
  } catch (error) {
    throw new Error(`Error when getting orders by user: ${(error as Error).message}`)
  }
}

const getOrdersByUserAndStatus = async (userId: number, status: string | unknown): Promise<Order[]> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
    const result = await connection.query(sql, [userId, status])

    connection.release()
    return result.rows
  } catch (error) {
    throw new Error('Error when getting orders by user and status: ' + (error as Error).message)
  }
}

export { createOrder, createOrderProduct, getOrdersByUser, getOrdersByUserAndStatus }