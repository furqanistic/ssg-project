import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPublicContent, updateContentSection } from '@/services/contentApi'

export const CONTENT_QUERY_KEY = ['site-content']

export const useSiteContentQuery = (options = {}) => {
  return useQuery({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: getPublicContent,
    staleTime: 30_000,
    ...options,
  })
}

export const useUpdateContentSectionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ section, data }) => updateContentSection(section, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY })
    },
  })
}
