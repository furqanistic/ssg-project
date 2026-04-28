import { supabase } from '../../config/supabaseClient.js'
import { env } from '../../config/env.js'
import { ApiError } from '../../utils/ApiError.js'

const CONTENT_TABLE = 'site_content'
const CONTENT_ROW_ID = 'primary'

const upsertContent = async (content) => {
  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .upsert(
      {
        id: CONTENT_ROW_ID,
        data: content,
      },
      { onConflict: 'id' },
    )
    .select('data')
    .single()

  if (error) {
    throw new ApiError(
      500,
      `Failed to persist content in Supabase table "${CONTENT_TABLE}". ${error.message}`,
    )
  }

  return data?.data ?? content
}

export const getContent = async () => {
  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select('id, data')
    .eq('id', CONTENT_ROW_ID)
    .maybeSingle()

  if (error) {
    throw new ApiError(
      500,
      `Failed to read content from Supabase table "${CONTENT_TABLE}". ${error.message}`,
    )
  }

  if (data?.data && typeof data.data === 'object') {
    return data.data
  }

  // DB-only mode: initialize empty row in Supabase if it does not exist yet.
  return upsertContent({})
}

export const updateContentSection = async (section, value) => {
  const content = await getContent()
  const nextContent = {
    ...content,
    [section]: value,
  }

  return upsertContent(nextContent)
}

export const getContentHealth = async () => {
  const bucket = env.SUPABASE_STORAGE_BUCKET
  const checks = {
    tableReadable: false,
    primaryRowPresent: false,
    storageBucketConfigured: Boolean(bucket),
    storageBucketExists: false,
  }
  const errors = []

  const { data: row, error: tableError } = await supabase
    .from(CONTENT_TABLE)
    .select('id')
    .eq('id', CONTENT_ROW_ID)
    .maybeSingle()

  if (tableError) {
    errors.push(`Table read failed: ${tableError.message}`)
  } else {
    checks.tableReadable = true
    checks.primaryRowPresent = Boolean(row?.id)
  }

  if (bucket) {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    if (bucketError) {
      errors.push(`Storage bucket listing failed: ${bucketError.message}`)
    } else {
      checks.storageBucketExists = buckets?.some((item) => item.name === bucket) ?? false
      if (!checks.storageBucketExists) {
        errors.push(`Storage bucket "${bucket}" does not exist.`)
      }
    }
  } else {
    errors.push('SUPABASE_STORAGE_BUCKET is not configured.')
  }

  const ready = Object.values(checks).every(Boolean)

  return {
    ready,
    checks,
    bucket,
    errors,
  }
}
