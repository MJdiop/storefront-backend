import { Router } from 'express'
import { createOrderCtlr, createOrderProductCtlr, getOrdersByUserAndStatusCtlr, getOrdersByUserCtlr } from '../../controllers/orders.controllers'

import { authenticateToken } from '../../middleware/authentication.middleware'

const router = Router()


router.get('/:id/find', authenticateToken, getOrdersByUserCtlr)
router.get('/:id/find-by-status', authenticateToken, getOrdersByUserAndStatusCtlr)
router.post('/:id/create', authenticateToken, createOrderCtlr)
router.post('/:id/create-product', authenticateToken, createOrderProductCtlr)

export default router