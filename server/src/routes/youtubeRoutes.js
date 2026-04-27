import { Router } from 'express'
import { getLatestYoutubeVideos } from '../controllers/youtubeController.js'

const router = Router()

router.get('/latest', getLatestYoutubeVideos)

export default router
