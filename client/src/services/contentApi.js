import { axiosInstance } from '../lib/axiosInstance'

const parsePayload = (payload) => {
  if (payload.success === false) {
    throw new Error(payload.message ?? 'Request failed')
  }
  return payload.data
}

export const getPublicContent = async () => {
  const { data } = await axiosInstance.get('/admin/content')
  return parsePayload(data)
}

export const updateContentSection = async (section, dataBody) => {
  const { data } = await axiosInstance.put(`/admin/content/${section}`, { data: dataBody })
  return parsePayload(data)
}

export const uploadContentImage = async (file, section = 'events') => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('section', section)

  const { data } = await axiosInstance.post('/admin/content/upload-image', formData)
  return parsePayload(data)
}

export const uploadContentFile = async (file, section = 'aboutUs/files', onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('section', section)

  const { data } = await axiosInstance.post('/admin/content/upload-file', formData, {
    onUploadProgress: (event) => {
      if (!event.total || typeof onProgress !== 'function') {
        return
      }
      onProgress(Math.round((event.loaded / event.total) * 100))
    },
  })

  return parsePayload(data)
}
