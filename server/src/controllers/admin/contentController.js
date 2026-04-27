import { ApiError } from '../../utils/ApiError.js'
import { sendSuccess } from '../../utils/apiResponse.js'
import {
  getContent,
  updateContentSection,
} from '../../services/admin/contentService.js'
import { uploadFileToStorage, uploadImageToStorage } from '../../services/admin/storageService.js'

const editableSections = new Set(['visitors', 'events', 'media', 'contact', 'aboutUs', 'donate'])

export const fetchContent = async (_req, res, next) => {
  try {
    const content = await getContent()
    return sendSuccess(res, 'Content fetched successfully.', content)
  } catch (error) {
    return next(error)
  }
}

export const updateSection = async (req, res, next) => {
  try {
    const { section } = req.params
    const { data } = req.body

    if (!editableSections.has(section)) {
      throw new ApiError(400, 'Invalid section for update.')
    }

    if (data == null) {
      throw new ApiError(400, 'Request body must include data.')
    }

    const updated = await updateContentSection(section, data)

    return sendSuccess(res, 'Content updated successfully.', updated)
  } catch (error) {
    return next(error)
  }
}

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'Image file is required.')
    }

    if (!req.file.mimetype?.startsWith('image/')) {
      throw new ApiError(400, 'Only image uploads are allowed.')
    }

    const section = (req.body?.section || 'events').trim()
    const result = await uploadImageToStorage({ file: req.file, section })

    return sendSuccess(res, 'Image uploaded successfully.', result)
  } catch (error) {
    return next(error)
  }
}

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'File is required.')
    }

    const section = (req.body?.section || 'aboutUs/files').trim()
    const result = await uploadFileToStorage({ file: req.file, section })

    return sendSuccess(res, 'File uploaded successfully.', result)
  } catch (error) {
    return next(error)
  }
}
