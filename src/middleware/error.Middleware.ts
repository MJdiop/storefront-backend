import { Request, Response, NextFunction } from 'express'

export type ErrorProps = {
  status?: number
  message?: string
  stack?: string
  name?: string
}

export default (err: ErrorProps, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  res.status(status).send({
    status,
    message,
  })

  next()
}