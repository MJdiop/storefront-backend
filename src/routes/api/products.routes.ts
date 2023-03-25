import { Router } from 'express'
import { createProductCtlr, getAllProductsCtlr, getOneProductCtlr } from '../../controllers/products.controllers'


import { authenticateToken } from '../../middleware/authentication.middleware'

const router = Router()

router.post('/', authenticateToken, createProductCtlr)
router.get('/', authenticateToken, getAllProductsCtlr)
router.get('/:id', authenticateToken, getOneProductCtlr)

export default router