import doteenv from 'dotenv'
import db from '../database'
import { UserType } from '../models/user'
import { authenticateUser, createUser, deleteUser, getAllUsers, getUser, updateUser } from '../services/users'

doteenv.config()

describe('Test end point', () => {
  const user = {
    email: `test${Math.floor(Math.random() * 10)}@test.com`,
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
    const authUser = await authenticateUser(user.email, user.password)

    expect(authUser?.email).toEqual(user.email)
    expect(authUser?.username).toEqual(user.username)
    expect(authUser?.firstname).toEqual(user.firstname)
    expect(authUser?.lastname).toEqual(user.lastname)
  })

  it('User fail to Authenticate', async () => {
    const authUser = await authenticateUser(user.email, 'test')

    expect(authUser).toBe(null)
  })

  describe('User Model', () => {
    describe('Test Methods', () => {
      it('Get Many Users', () => {
        expect(getAllUsers).toBeDefined()
      })

      it('Get One User', () => {
        expect(getUser).toBeDefined()
      })

      it('Create User', () => {
        expect(createUser).toBeDefined()
      })

      it('Update User', () => {
        expect(updateUser).toBeDefined()
      })

      it('Delete User', () => {
        expect(deleteUser).toBeDefined()
      })

      it('Authenticate User', () => {
        expect(authenticateUser).toBeDefined()
      })
    })
  })

  describe('User Model logic', () => {
    const user = {
      email: `test${Math.floor(Math.random() * 10)}@test.com`,
      username: 'user test',
      firstname: 'test',
      lastname: 'test test',
      password: 'test1234'
    } as UserType

    beforeAll(async () => {
      const createdUser = await createUser(user)
      user.id = createdUser?.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users;'
      connection.query(sql)
      connection.release()
    })

    it('Create methods sould be return a new user', async () => {
      const createdUser = await createUser(
        {
          email: 'newuser@test.com',
          username: 'user test',
          firstname: 'test',
          lastname: 'test test',
          password: 'test1234'
        }
      )
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'newuser@test.com',
        username: 'user test',
        firstname: 'test',
        lastname: 'test test',
        password: createdUser.password
      } as UserType)
    })

    it('Get Many should be return all availaible Users', async () => {
      const users = await getAllUsers()
      expect(users.length).toEqual(3)
    })

    it('Get One should be return a user with ID', async () => {
      const userData = await getUser(user.id)
      expect(userData).toEqual({
        id: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        password: userData.password
      })
    })

    it('Update should be return a user with updated data', async () => {
      const updatedUser = await updateUser(user.id, {
        ...user,
        username: 'new username'
      })

      expect(updatedUser).toEqual({
        id: user.id,
        email: user.email,
        username: 'new username',
        firstname: user.firstname,
        lastname: user.lastname,
        password: updatedUser.password
      })
    })
  })
})