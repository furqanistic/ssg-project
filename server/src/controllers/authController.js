import {
  loginWithEmailPassword,
  updateProfile,
  createUserWithRole,
  listManagedUsers,
} from '../services/authService.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/apiResponse.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required.')
    }

    const data = await loginWithEmailPassword({ email, password })

    return sendSuccess(res, 'Login successful.', data)
  } catch (error) {
    return next(error)
  }
}

export const updateCurrentProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email && !password) {
      throw new ApiError(400, 'Please provide email and/or password to update.')
    }

    const data = await updateProfile({
      authToken: req.authToken,
      email: email?.trim(),
      password: password?.trim(),
    })

    return sendSuccess(res, 'Profile updated successfully.', data)
  } catch (error) {
    return next(error)
  }
}

export const createManagedUser = async (req, res, next) => {
  try {
    const { email, password, role = 'user', name = '' } = req.body
    const normalizedRole = role.trim().toLowerCase() || 'user'

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required.')
    }

    const data = await createUserWithRole({
      email: email.trim(),
      password: password.trim(),
      role: normalizedRole,
      name: name.trim(),
    })

    return sendSuccess(res, 'User created successfully.', data, 201)
  } catch (error) {
    return next(error)
  }
}

export const listUsers = async (_req, res, next) => {
  try {
    const data = await listManagedUsers()
    return sendSuccess(res, 'Users fetched successfully.', data)
  } catch (error) {
    return next(error)
  }
}
