import { Router } from 'express'
import { loginCtlr, createUsersCtlr, getUsersCtlr, getUserCtlr, updateUserCtlr, deleteUserCtlr } from '../../controllers/users.controllers'
import { authenticateToken } from '../../middleware/authentication.middleware'

const router = Router()

router.post('/login', authenticateToken, loginCtlr)

router.post('/', authenticateToken, createUsersCtlr)
router.get('/', getUsersCtlr)
router.get('/:id', authenticateToken, getUserCtlr)
router.patch('/:id', authenticateToken, updateUserCtlr)
router.delete('/:id', authenticateToken, deleteUserCtlr)

export default router