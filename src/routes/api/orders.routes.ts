import { Router } from 'express'
import { createOrderCtlr, getOrdersByUserCtlr } from '../../controllers/orders.controllers'

import { authenticateToken } from '../../middleware/authentication.middleware'

const router = Router()


router.get('/:id/find', authenticateToken, getOrdersByUserCtlr)
router.post('/:id/create', authenticateToken, createOrderCtlr)

export default router