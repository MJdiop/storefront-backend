import express, { Application } from 'express'
import router from './routes'
import doteenv from 'dotenv'
import morgan from 'morgan'
import errorMiddleware from './middleware/error.Middleware'

doteenv.config()

const app: Application = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

export default app