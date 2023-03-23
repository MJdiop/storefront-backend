import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import doteenv from 'dotenv'

doteenv.config()

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'token is missing', code: 401, error: 'user not authenticated', data: null })
      }

      if (bearer === 'Bearer' && token) {
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string, (error) => {
          if (error) return res.status(403).json({ message: 'token is invalid', code: 403, error: 'user not authenticated', data: null })
          next()
        })
      }
    }
  } catch (error) {
    throw new Error('Error when authenticating user error: ' + (error as Error).message)
  }
}