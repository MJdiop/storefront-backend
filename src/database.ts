import { Pool } from 'pg'
import doteenv from 'dotenv'

doteenv.config()

const client = new Pool({
  host: process.env.HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
})

client.on('error', (error: Error) => {
  console.error('Unexpected error on idle client', error)
  process.exit(-1)
})
export default client