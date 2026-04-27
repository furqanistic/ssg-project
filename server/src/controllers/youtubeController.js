import { sendSuccess } from '../utils/apiResponse.js'
import { getYoutubeFeed } from '../services/youtubeService.js'

export const getLatestYoutubeVideos = async (req, res, next) => {
  try {
    const maxResults = Number(req.query.maxResults ?? 12)

    const data = await getYoutubeFeed({
      channelId: req.query.channelId,
      maxResults: Number.isFinite(maxResults) && maxResults > 0
        ? Math.min(maxResults, 20)
        : 12,
    })

    return sendSuccess(res, 'YouTube feed fetched successfully.', data)
  } catch (error) {
    return next(error)
  }
}
