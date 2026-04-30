const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')

const createApiError = (message, status, payload) => {
  const error = new Error(message)
  error.status = status
  error.payload = payload
  return error
}

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}))

  if (!response.ok || payload.success === false) {
    const message = payload.message ?? 'Request failed. Please try again.'
    throw createApiError(message, response.status, payload)
  }

  return payload
}

export const signupRequest = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  return parseResponse(response)
}

export const loginRequest = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  return parseResponse(response)
}

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const updateProfileRequest = async ({ token, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ email, password }),
  })

  return parseResponse(response)
}

export const listUsersRequest = async ({ token }) => {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return parseResponse(response)
}

export const createUserRequest = async ({ token, email, password, role, name }) => {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ email, password, role, name }),
  })

  return parseResponse(response)
}

export const deleteUserRequest = async ({ token, userId }) => {
  const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })

  return parseResponse(response)
}
