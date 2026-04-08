import crypto from 'crypto'
import { supabase } from '../../config/supabaseClient.js'
import { env } from '../../config/env.js'
import { ApiError } from '../../utils/ApiError.js'

const sanitizeFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const ensureBucketExists = async (bucket) => {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()

  if (listError) {
    throw new ApiError(
      500,
      `Unable to verify Supabase bucket "${bucket}". ${listError.message}`,
    )
  }

  if (buckets?.some((item) => item.name === bucket)) {
    return
  }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
  })

  if (createError) {
    throw new ApiError(
      500,
      `Bucket "${bucket}" was not found and could not be created automatically. ${createError.message}. Set SUPABASE_STORAGE_BUCKET to an existing bucket or create it in Supabase Storage.`,
    )
  }
}

export const uploadImageToStorage = async ({ file, section = 'events' }) => {
  const bucket = env.SUPABASE_STORAGE_BUCKET

  if (!bucket) {
    throw new ApiError(500, 'SUPABASE_STORAGE_BUCKET is not configured.')
  }

  await ensureBucketExists(bucket)

  const safeName = sanitizeFileName(file.originalname || 'image')
  const ext = safeName.includes('.') ? safeName.split('.').pop() : 'jpg'
  const objectPath = `${section}/${Date.now()}-${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabase.storage.from(bucket).upload(objectPath, file.buffer, {
    cacheControl: '3600',
    contentType: file.mimetype,
    upsert: false,
  })

  if (uploadError) {
    throw new ApiError(500, uploadError.message || 'Failed to upload image to Supabase Storage.')
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath)

  if (!data?.publicUrl) {
    throw new ApiError(500, 'Image uploaded but public URL could not be generated.')
  }

  return {
    url: data.publicUrl,
    bucket,
    path: objectPath,
  }
}
