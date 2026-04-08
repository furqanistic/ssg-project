import { ApiError } from '../utils/ApiError.js'

export const notFoundHandler = (_req, res) => {
  return res.status(404).json({ success: false, message: 'Route not found.' })
}

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: error.message || 'Internal server error.',
  })
}
