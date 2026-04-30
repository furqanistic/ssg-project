import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUserRequest,
  deleteUserRequest,
  listUsersRequest,
  loginRequest,
  updateProfileRequest,
} from '@/services/authApi'

export const authUsersQueryKey = (token) => ['auth', 'users', token]

export const useAuthUsersQuery = ({ token, enabled, ...queryOptions } = {}) => {
  return useQuery({
    queryKey: authUsersQueryKey(token),
    queryFn: () => listUsersRequest({ token }),
    select: (response) => response.data?.users ?? [],
    enabled: Boolean(enabled && token),
    ...queryOptions,
  })
}

export const useLoginMutation = (options = {}) => {
  return useMutation({
    mutationFn: loginRequest,
    ...options,
  })
}

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: updateProfileRequest,
  })
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUserRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: authUsersQueryKey(variables.token) })
    },
  })
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: authUsersQueryKey(variables.token) })
    },
  })
}
