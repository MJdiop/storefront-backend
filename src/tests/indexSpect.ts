import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../index'
import doteenv from 'dotenv'
import { authenticateUser } from '../services/users'

doteenv.config()

const request = supertest(app)

describe('Test users', () => {
  let token: string
  beforeAll(async () => {
    const user = await authenticateUser('diopmbayejacques@gmail.com', 'passer123')
    token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string)
  })

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
          email: 'mbaye212@test.com',
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
          email: 'mbaye2132@test.com',
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
})