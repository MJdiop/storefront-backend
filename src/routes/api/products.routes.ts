import { Router } from 'express'
import { createProductCtlr } from '../../controllers/products.controllers'


import { authenticateToken } from '../../middleware/authentication.middleware'

const router = Router()

router.post('/', authenticateToken, createProductCtlr)

export default router