import { supabaseAdmin, supabasePublic } from '../config/supabaseClient.js'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

const ALLOWED_APP_ROLES = new Set(['admin', 'user'])

const shapeAuthPayload = (authData) => {
  return {
    user: {
      id: authData.user?.id,
      email: authData.user?.email,
      emailConfirmedAt: authData.user?.email_confirmed_at,
      createdAt: authData.user?.created_at,
      metadata: authData.user?.user_metadata ?? {},
    },
    session: authData.session
      ? {
          accessToken: authData.session.access_token,
          refreshToken: authData.session.refresh_token,
          expiresIn: authData.session.expires_in,
          tokenType: authData.session.token_type,
        }
      : null,
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  const { data, error } = await supabasePublic.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new ApiError(401, error.message)
  }

  return shapeAuthPayload(data)
}

export const updateProfile = async ({ authToken, email, password }) => {
  const payload = {}

  if (email) {
    payload.email = email
  }

  if (password) {
    payload.password = password
  }

  if (!payload.email && !payload.password) {
    throw new ApiError(400, 'At least one field (email or password) is required.')
  }

  const response = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(400, data?.msg || data?.error_description || 'Failed to update profile.')
  }

  return {
    id: data?.id,
    email: data?.email,
    metadata: data?.user_metadata ?? {},
  }
}

const ensureServiceRoleConfigured = () => {
  const key = (env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

  if (!key) {
    throw new ApiError(
      500,
      'User management requires SUPABASE_SERVICE_ROLE_KEY on the server. Add it to your server .env and restart.',
    )
  }

  if (key.includes('PASTE_SUPABASE_SERVICE_ROLE_KEY_HERE')) {
    throw new ApiError(
      500,
      'SUPABASE_SERVICE_ROLE_KEY is still a placeholder. Replace it with your real Supabase service role key and restart the server.',
    )
  }
}

export const createUserWithRole = async ({ email, password, role, name }) => {
  ensureServiceRoleConfigured()

  if (!ALLOWED_APP_ROLES.has(role)) {
    throw new ApiError(400, 'Invalid role. Allowed roles are only: admin, user.')
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role,
      name: name || '',
    },
  })

  if (error) {
    throw new ApiError(400, error.message)
  }

  return {
    id: data.user?.id,
    email: data.user?.email,
    role: data.user?.user_metadata?.role ?? role,
    name: data.user?.user_metadata?.name ?? name ?? '',
  }
}

export const listManagedUsers = async ({ page = 1, perPage = 100 } = {}) => {
  ensureServiceRoleConfigured()

  const { data, error } = await supabaseAdmin.auth.admin.listUsers(page, perPage)

  if (error) {
    throw new ApiError(400, error.message)
  }

  return {
    users: (data?.users ?? []).map((user) => ({
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role ?? user.app_metadata?.role ?? 'user',
      name: user.user_metadata?.name ?? '',
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at,
    })),
  }
}

export const deleteManagedUserById = async (userId) => {
  ensureServiceRoleConfigured()

  const normalizedUserId = (userId ?? '').trim()

  if (!normalizedUserId) {
    throw new ApiError(400, 'User id is required.')
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(normalizedUserId)

  if (error) {
    throw new ApiError(400, error.message)
  }

  return {
    id: normalizedUserId,
  }
}

export const ensureAdminAccount = async ({ email, password, name }) => {
  ensureServiceRoleConfigured()

  const normalizedEmail = email.trim().toLowerCase()

  const { data, error } = await supabaseAdmin.auth.admin.listUsers(1, 1000)
  if (error) {
    throw new ApiError(400, error.message)
  }

  const existingUser = (data?.users ?? []).find(
    (user) => user.email?.trim().toLowerCase() === normalizedEmail,
  )

  if (!existingUser) {
    await createUserWithRole({
      email: normalizedEmail,
      password,
      role: 'admin',
      name: name ?? '',
    })
    return { created: true, updated: false }
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
    password,
    user_metadata: {
      ...(existingUser.user_metadata ?? {}),
      role: 'admin',
      name: name ?? '',
    },
  })

  if (updateError) {
    throw new ApiError(400, updateError.message)
  }

  return { created: false, updated: true }
}
