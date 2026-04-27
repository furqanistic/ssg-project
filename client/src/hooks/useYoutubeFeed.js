import { useQuery } from '@tanstack/react-query'
import { getLatestYoutubeFeed } from '@/services/youtubeApi'

export const YOUTUBE_FEED_QUERY_KEY = ['youtube-feed']

export const useYoutubeFeedQuery = () => {
  return useQuery({
    queryKey: YOUTUBE_FEED_QUERY_KEY,
    queryFn: getLatestYoutubeFeed,
    staleTime: 5 * 60_000,
    gcTime: 20 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    refetchOnWindowFocus: false,
    refetchInterval: 60_000,
  })
}
