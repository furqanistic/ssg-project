import { supabase } from '../../config/supabaseClient.js'
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
