import { Router } from 'express'
import usersRoutes from './api/users.routes'
import ordersRoutes from './api/orders.routes'
import productsRoutes from './api/products.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/orders', ordersRoutes)
router.use('/products', productsRoutes)

export default router