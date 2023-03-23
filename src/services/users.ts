import client from '../database'
import { UserType } from '../models/user'

const createUser = async (user: UserType): Promise<UserType> => {
  try {
    const connection = await client.connect()
    const sql = 'INSERT INTO users (email, username, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const result = await connection.query(sql, [
      user.email,
      user.userName,
      user.firstName,
      user.lastName,
      user.password,
    ])

    connection.release()
    return await result.rows[0]

  } catch (error) {
    throw new Error(
      `Faild to insert user data with the following error: ${(error as Error).message
      }`
    )
  }
}

const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM users'
    const result = await connection.query(sql)

    connection.release()
    return await result.rows

  } catch (error) {
    throw new Error(
      `Error when retrieving users, error: ${(error as Error).message
      }`
    )
  }
}

const getUser = async (id: number): Promise<UserType> => {
  try {
    const connection = await client.connect()
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const result = connection.query(sql, [id])

    connection.release()
    return (await result).rows[0]

  } catch (error) {
    throw new Error(
      `Error when retrieving user, error: ${(error as Error).message
      }`
    )
  }
}

const updateUser = async (id: number, user: UserType): Promise<UserType> => {
  try {
    const connection = await client.connect()
    const sql = 'UPDATE users SET email=($1), username=($2), firstname=($3), lastname=($4), password=($5) WHERE id=($6) RETURNING *'
    const result = await connection.query(sql, [
      user.email,
      user.userName,
      user.firstName,
      user.lastName,
      user.password,
      id,
    ])

    connection.release()
    return await result.rows[0]

  } catch (error) {
    throw new Error(`Error when updating user: ${(error as Error).message}`)
  }
}

const deleteUser = async (id: number): Promise<UserType> => {
  try {
    const connection = await client.connect()
    const sql = 'DELETE FROM users WHERE id=($1)'
    const result = connection.query(sql, [id])

    connection.release()
    return (await result).rows[0]

  } catch (error) {
    throw new Error(`Error when deleting user, error: ${(error as Error).message}`)
  }
}

export { createUser, getAllUsers, getUser, updateUser, deleteUser }