import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'

import doteenv from 'dotenv'

doteenv.config()

import { createUser, getAllUsers, getUser, updateUser, deleteUser, authenticateUser } from '../services/users'

const loginCtlr = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authenticateUser(email, password)

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string)

  if (!user) {
    return res.status(401).json({ message: 'email and password do not match please try again', code: 401, error: 'user not authenticated', data: null })
  }

  return res.status(200).json({ message: 'user successfully authenticated ', code: 200, error: null, data: { ...user, token } })
}

const createUsersCtlr = async (req: Request, res: Response) => {
  const user = req.body
  const createdUser = await createUser(user)

  return res.status(201).json({ message: 'successfully created user ', code: 201, error: null, data: createdUser })
}

const getUsersCtlr = async (req: Request, res: Response) => {
  const users = await getAllUsers()

  return res.status(200).json({ message: 'users successfully recovered ', code: 200, error: null, data: users })
}

const getUserCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  const user = await getUser(userId)

  return res.status(200).json({ message: 'user successfully recovered ', code: 200, error: null, data: user })
}

const updateUserCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  const user = req.body
  const updatedUser = await updateUser(userId, user)

  return res.status(200).json({ message: 'user successfully updated ', code: 200, error: null, data: updatedUser })
}

const deleteUserCtlr = async (req: Request, res: Response) => {
  const userId = +req.params.id
  await deleteUser(userId)

  return res.status(200).json({ message: 'user successfully deleted ', code: 200, error: null, data: null })
}

export { loginCtlr, createUsersCtlr, getUsersCtlr, getUserCtlr, updateUserCtlr, deleteUserCtlr }