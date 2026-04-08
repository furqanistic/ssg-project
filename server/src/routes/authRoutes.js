import { Router } from 'express'
import {
  createManagedUser,
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

export default authRouter
