import { Router } from 'express'
import { createUsersCtlr, getUsersCtlr, getUserCtlr, updateUserCtlr, deleteUserCtlr } from '../../controllers/users.controllers'

const router = Router()

router.post('/', createUsersCtlr)
router.get('/', getUsersCtlr)
router.get('/:id', getUserCtlr)
router.patch('/:id', updateUserCtlr)
router.delete('/:id', deleteUserCtlr)

export default router