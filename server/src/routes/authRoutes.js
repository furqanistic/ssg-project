import { Router } from 'express'
import {
  createManagedUser,
  deleteManagedUser,
  listUsers,
  login,
  updateCurrentProfile,
} from '../controllers/authController.js'
import { requireAdmin, requireAuth } from '../middlewares/authMiddleware.js'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.put('/profile', requireAuth, updateCurrentProfile)
authRouter.get('/users', requireAuth, requireAdmin, listUsers)
authRouter.post('/users', requireAuth, requireAdmin, createManagedUser)
authRouter.delete('/users/:userId', requireAuth, requireAdmin, deleteManagedUser)

export default authRouter
