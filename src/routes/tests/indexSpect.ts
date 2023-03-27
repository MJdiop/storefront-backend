import supertest from 'supertest'
import app from '../../index'
import db from '../../database'
import { UserType } from '../../models/user'
import { createUser } from '../../services/users'

const request = supertest(app)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let token = ''

describe('Test endpoint', () => {
  const user = {
    email: 'test22@test.com',
    username: 'user test',
    firstname: 'test',
    lastname: 'test test',
    password: 'test1234'
  } as UserType

  beforeAll(async () => {
    const createdUser = createUser(user)
    user.id = (await createdUser).id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    connection.query(sql)
    connection.release()
  })

  it('Authenticate User', async () => {
    const authUser = await request.post('/api/users/login').send({
      email: 'test22@test.com',
      password: 'test1234'
    })

    expect(authUser.status).toEqual(200)

    const { id, email, token: userToken } = authUser.body.data
    expect(id).toEqual(user.id)
    expect(email).toEqual(user.email)
    expect(userToken).toBeDefined()
    token = userToken
  })

  describe('Test CRUD', () => {
    it('should create a new user', async () => {
      const res = await request.post('/api/users').set('Authorization', `Bearer ${token}`).send(
        {
          email: 'test262@test.com',
          username: 'user test',
          firstname: 'test',
          lastname: 'test test',
          password: 'test1234'
        } as UserType
      )
      expect(res.status).toBe(201)

      expect(res.body.data.email).toBe('test262@test.com')
      expect(res.body.data.username).toBe('user test')
      expect(res.body.data.firstname).toBe('test')
      expect(res.body.data.lastname).toBe('test test')
    })

    it('should be all users', async () => {
      const res = await request.get('/api/users').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should be get single user', async () => {
      const res = await request.get(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.username).toBe('user test')
      expect(res.body.data.firstname).toBe('test')
    })

    it('should be update user', async () => {
      const res = await request.patch(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`).send({
        ...user,
        firstname: 'user test updated'
      })
      expect(res.status).toBe(200)
      expect(res.body.data.firstname).toBe('user test updated')
    })

    it('should be delete user', async () => {
      const res = await request.delete(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data).toBe(null)
    })
  })
})