import { useMemo } from 'react'
import { useSiteContentQuery } from '@/hooks/useContent'

const EVENT_CATEGORIES = ['all', 'daily', 'weekly', 'monthly', 'yearly']

const toText = (value) => (typeof value === 'string' ? value : '')

const normalizeCategory = (value) => {
  const input = toText(value).trim().toLowerCase()
  return EVENT_CATEGORIES.includes(input) ? input : 'yearly'
}

const normalizeEvent = (event = {}, index = 0) => ({
  id: `${toText(event?.title)}-${toText(event?.date)}-${index}`,
  title: toText(event?.title),
  date: toText(event?.date),
  time: toText(event?.time),
  location: toText(event?.location),
  description: toText(event?.description),
  image: toText(event?.image),
  category: normalizeCategory(event?.category),
})

export const useEventsContentQuery = () => {
  const query = useSiteContentQuery({
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  })

  const events = useMemo(() => {
    const items = Array.isArray(query.data?.events?.items) ? query.data.events.items : []
    return items
      .map((event, index) => normalizeEvent(event, index))
      .filter(
        (event) =>
          event.title ||
          event.date ||
          event.time ||
          event.location ||
          event.description ||
          event.image,
      )
  }, [query.data])

  return {
    ...query,
    events,
  }
}

export { EVENT_CATEGORIES }
