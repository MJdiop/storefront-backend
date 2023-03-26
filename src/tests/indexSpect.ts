import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../index'
import doteenv from 'dotenv'
import { authenticateUser, createUser, deleteUser, getAllUsers, getUser, updateUser } from '../services/users'
import { UserType } from '../models/user'
import { Product } from '../models/product'
import { createdProduct, getAllProducts, getOneProduct } from '../services/products'
import { OrderProduct } from '../models/order'
import { createOrder, createOrderProduct, getOrdersByUserAndStatus } from '../services/orders'

doteenv.config()

const request = supertest(app)

describe('Test end point', () => {
  let token: string
  beforeAll(async () => {
    const user = await authenticateUser('diopmbayejacques@gmail.com', 'passer123')
    token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string)
  })

  // Test Users

  describe('get All Users', () => {
    it('should be returned all users with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('GET User', () => {
    it('should be returned user with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/users/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('POST Create User', () => {
    it('should be created if user', async () => {
      const user = await request
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: `mbaye${Math.floor(Math.random() * 10)}@test.com`,
          username: 'mbaye baba',
          firstname: 'baba',
          lastname: 'test test',
          password: 'paseer123',
        })
      if (user.body.status !== 409) {
        expect(user.status).toBe(201)
      }
    })
  })

  describe('patch Update User', () => {
    it('should be updated if user is authenticated with a token', async () => {
      const res = await request
        .patch('/api/users/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: `mbayee${Math.floor(Math.random() * 10)}@test.com`,
          username: 'mbaye baba',
          firstname: 'baba',
          lastname: 'test test',
          password: 'passer1234'
        })
      if (res.body.status !== 409) {
        expect(res.status).toBe(200)
      }
    })
  })

  describe('delete User', () => {
    it('should be deleted if user is authenticated with a token', async () => {
      const res = await request
        .delete('/api/users/12')
        .set('Authorization', `Bearer ${token}`)
      if (res.body.status !== 409) {
        expect(res.status).toBe(200)
      }
    })
  })

  // Test Products

  describe('get All Products', () => {
    it('should be returned all products with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('GET Product', () => {
    it('should be returned product with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('POST Create Product', () => {
    it('should be created if user is authenticated with a token', async () => {
      const product = await request
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          price: 1000,
          description: 'test',
          quantity: 10,
          category: 'test',
        })
      if (product.body.status !== 409) {
        expect(product.status).toBe(201)
      }
    })
  })

  // Test Orders

  describe('get All Orders', () => {
    it('should be returned all orders with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/orders/1/find')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('GET Order by status', () => {
    it('should be returned order with a status 200 if user is authenticated with a token', async () => {
      await request
        .get('/api/orders/1/find-by-status?status=active')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })

  describe('POST Create Order', () => {
    it('should be created if user is authenticated with a token', async () => {
      const order = await request
        .post('/api/orders/1/create')
        .set('Authorization', `Bearer ${token}`)
      if (order.body.status !== 409) {
        expect(order.status).toBe(201)
      }
    })
  })

  describe('POST Create Order product', () => {
    it('should be created if user is authenticated with a token', async () => {
      const order = await request
        .post('/api/orders/1/create-product')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 2,
          productId: 1,
          quantity: 20,
        })
      if (order.body.status !== 409) {
        expect(order.status).toBe(201)
      }
    })
  })

})

// Users Model


const user: UserType = {
  email: `teste${Math.floor(Math.random() * 100)}@test.com`,
  username: 'user test',
  firstname: 'test',
  lastname: 'test test',
  password: 'test1234'
}


describe('User model', () => {
  describe('Create users', () => {
    it('Create user must be exist', () => {
      expect(createUser).toBeDefined()
    })
    it('User should be created if it not exist', async () => {
      const result = await createUser(user)

      if (result !== null) {
        expect(result.email).toEqual(user.email)
        expect(result.firstname).toEqual(user.firstname)
        expect(result.lastname).toEqual(user.lastname)
      }
    })
  })

  describe('Find user', () => {
    it('Find user must be exist', () => {
      expect(getAllUsers).toBeDefined()
    })

    it('Should be returned all users', async () => {
      const result = await getAllUsers()
      expect(result).toBeDefined()
    })
  })

  describe('Find user by id', () => {
    it('Find user by id must be exist', () => {
      expect(getUser).toBeDefined()
    })

    it('Should be returned user by id', async () => {
      const result = await getUser(1)
      expect(result).toBeDefined()
    })
  })

  describe('Update user', () => {
    it('Update user must be exist', () => {
      expect(updateUser).toBeDefined()
    })

    it('Should be updated user', async () => {
      const result = await updateUser(13, user)
      expect(result).toBeDefined()
    })
  })

  describe('Delete user', () => {
    it('Delete user must be exist', () => {
      expect(deleteUser).toBeDefined()
    })

    it('Should be deleted user', async () => {
      const result = await deleteUser(10)
      expect(result).toBeDefined()
    })
  })
})

// Products Model

const product: Product = {
  id: 1,
  name: 'test',
  price: 1000,
  description: 'test',
  category: 'test',
}

describe('Product model', () => {
  describe('Find product', () => {
    it('Find product must be exist', () => {
      expect(getAllProducts).toBeDefined()
    })

    it('Should be returned all products', async () => {
      const result = await getAllProducts()
      expect(result).toBeDefined()
    })
  })

  describe('Find product by id', () => {
    it('Find product by id must be exist', () => {
      expect(getOneProduct).toBeDefined()
    })

    it('Should be returned product by id', async () => {
      const result = await getOneProduct(1)
      expect(result).toBeDefined()
    })
  })

  describe('Create product', () => {
    it('Create product must be exist', () => {
      expect(createdProduct).toBeDefined()
    })

    it('Should be created product', async () => {
      const result = await createdProduct(product)
      expect(result).toBeDefined()
    })
  })
})

// Orders Model

const orderProduct: OrderProduct = {
  id: 1,
  orderId: 1,
  productId: 1,
  quantity: 10,
}

describe('Order model', () => {

  describe('Find order by status', () => {
    it('Find order by status must be exist', () => {
      expect(getOrdersByUserAndStatus).toBeDefined()
    })

    it('Should be returned order by status', async () => {
      const result = await getOrdersByUserAndStatus(1, 'active')
      expect(result).toBeDefined()
    })
  })

  describe('Create order', () => {
    it('Create order must be exist', () => {
      expect(createOrder).toBeDefined()
    })

    it('Should be created order', async () => {
      const result = await createOrder(1, 'active')
      expect(result).toBeDefined()
    })
  })

  describe('Create order product', () => {
    it('Create order product must be exist', () => {
      expect(createOrderProduct).toBeDefined()
    })

    it('Should be created order product', async () => {
      const result = await createOrderProduct(orderProduct)
      expect(result).toBeDefined()
    })
  })
})