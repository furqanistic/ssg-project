import { Router } from 'express'
import multer from 'multer'
import {
  fetchContent,
  updateSection,
  uploadImage,
} from '../../controllers/admin/contentController.js'

const adminContentRouter = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
})

adminContentRouter.get('/', fetchContent)
adminContentRouter.put('/:section', updateSection)
adminContentRouter.post('/upload-image', upload.single('image'), uploadImage)

export default adminContentRouter
