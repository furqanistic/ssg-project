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

export const uploadContentFile = async (file, section = 'aboutUs/files', onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('section', section)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE_URL}/admin/content/upload-file`)
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || typeof onProgress !== 'function') {
        return
      }
      const percent = Math.round((event.loaded / event.total) * 100)
      onProgress(percent)
    }

    xhr.onload = () => {
      try {
        const payload = JSON.parse(xhr.responseText || '{}')
        if (xhr.status < 200 || xhr.status >= 300 || payload.success === false) {
          reject(new Error(payload.message || 'File upload failed'))
          return
        }
        resolve(payload.data)
      } catch {
        reject(new Error('Invalid upload response'))
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network error while uploading file'))
    }

    xhr.send(formData)
  })
}
