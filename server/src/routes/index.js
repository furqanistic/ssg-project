import { Router } from 'express'
import authRouter from './authRoutes.js'
import adminContentRouter from './admin/contentRoutes.js'

const router = Router()

router.get('/health', (_req, res) => {
  return res.status(200).json({ success: true, message: 'Server is running' })
})

router.use('/auth', authRouter)
router.use('/admin/content', adminContentRouter)

export default router
