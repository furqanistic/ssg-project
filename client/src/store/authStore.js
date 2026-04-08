import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      setAuth: ({ user, session }) =>
        set({
          user: user ?? null,
          session: session ?? null,
        }),
      logout: () =>
        set({
          user: null,
          session: null,
        }),
    }),
    {
      name: 'gurudwara-auth-store',
    },
  ),
)
