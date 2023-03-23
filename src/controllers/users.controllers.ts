import { Response, Request } from 'express'
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../services/users'

const createUsersCtlr = async (req: Request, res: Response) => {
  const user = req.body
  const createdUser = await createUser(user)

  return res.status(200).json({ message: 'successfully created user ', code: 200, error: null, data: createdUser })
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

export { createUsersCtlr, getUsersCtlr, getUserCtlr, updateUserCtlr, deleteUserCtlr }