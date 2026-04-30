import { axiosInstance } from '../lib/axiosInstance'

const createApiError = (message, status, payload) => {
  const error = new Error(message)
  error.status = status
  error.payload = payload
  return error
}

const request = async (config) => {
  try {
    const { data, status } = await axiosInstance.request(config)
    if (data?.success === false) {
      const message = data.message ?? 'Request failed. Please try again.'
      throw createApiError(message, status, data)
    }
    return data
  } catch (err) {
    if (err.response) {
      const payload = err.response.data ?? {}
      const message = payload.message ?? 'Request failed. Please try again.'
      throw createApiError(message, err.response.status, payload)
    }
    throw err
  }
}

export const signupRequest = async ({ name, email, password }) => {
  return request({
    url: '/auth/signup',
    method: 'POST',
    data: { name, email, password },
  })
}

export const loginRequest = async ({ email, password }) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { email, password },
  })
}

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
})

export const updateProfileRequest = async ({ token, email, password }) => {
  return request({
    url: '/auth/profile',
    method: 'PUT',
    headers: authHeaders(token),
    data: { email, password },
  })
}

export const listUsersRequest = async ({ token }) => {
  return request({
    url: '/auth/users',
    method: 'GET',
    headers: authHeaders(token),
  })
}

export const createUserRequest = async ({ token, email, password, role, name }) => {
  return request({
    url: '/auth/users',
    method: 'POST',
    headers: {
      ...authHeaders(token),
    },
    data: { email, password, role, name },
  })
}

export const deleteUserRequest = async ({ token, userId }) => {
  return request({
    url: `/auth/users/${userId}`,
    method: 'DELETE',
    headers: authHeaders(token),
  })
}
