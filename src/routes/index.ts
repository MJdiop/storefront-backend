import { Router } from 'express'
import usersRoutes from './api/users.routes'
import ordersRoutes from './api/orders.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/orders', ordersRoutes)

export default router