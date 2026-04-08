import { supabasePublic } from '../config/supabaseClient.js'
import { ApiError } from '../utils/ApiError.js'

const extractBearerToken = (headerValue = '') => {
  if (!headerValue.toLowerCase().startsWith('bearer ')) {
    return null
  }
  return headerValue.slice(7).trim() || null
}

export const requireAuth = async (req, _res, next) => {
  try {
    const token = extractBearerToken(req.headers.authorization)

    if (!token) {
      throw new ApiError(401, 'Authorization token is required.')
    }

    const { data, error } = await supabasePublic.auth.getUser(token)

    if (error || !data?.user) {
      throw new ApiError(401, 'Invalid or expired authorization token.')
    }

    req.authToken = token
    req.user = data.user
    next()
  } catch (error) {
    next(error)
  }
}

export const requireAdmin = (req, _res, next) => {
  const role = req.user?.user_metadata?.role ?? req.user?.app_metadata?.role ?? null

  // Backward-compatible: if role is not set yet, allow existing admins to continue.
  if (role && role !== 'admin') {
    return next(new ApiError(403, 'Only admins can perform this action.'))
  }

  return next()
}
