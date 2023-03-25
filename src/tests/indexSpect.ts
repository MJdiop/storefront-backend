import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../index'
import doteenv from 'dotenv'
import { authenticateUser } from '../services/users'

doteenv.config()

const request = supertest(app)

describe('Test', () => {
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
          userName: 'mbaye baba',
          firstName: 'baba',
          lastName: 'test test',
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
          email: 'mbaye232@test.com',
          userName: 'mbaye baba',
          firstName: 'baba',
          lastName: 'test test',
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