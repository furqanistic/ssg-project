const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8800/api'

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}))

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message ?? 'Request failed')
  }

  return payload.data
}

export const getPublicContent = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/content`)
  return parseResponse(response)
}

export const updateContentSection = async (section, data) => {
  const response = await fetch(`${API_BASE_URL}/admin/content/${section}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })

  return parseResponse(response)
}

export const uploadContentImage = async (file, section = 'events') => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('section', section)

  const response = await fetch(`${API_BASE_URL}/admin/content/upload-image`, {
    method: 'POST',
    body: formData,
  })

  return parseResponse(response)
}
