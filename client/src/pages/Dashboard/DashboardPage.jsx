import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useSiteContentQuery,
  useUpdateContentSectionMutation,
} from '@/hooks/useContent'
import { uploadContentImage } from '@/services/contentApi'
import {
  createUserRequest,
  listUsersRequest,
  updateProfileRequest,
} from '@/services/authApi'
import { useAuthStore } from '@/store/authStore'

const menu = [
  { key: 'visitors', label: 'Visitors' },
  { key: 'events', label: 'Events' },
  { key: 'media', label: 'Media' },
  { key: 'contact', label: 'Contact' },
  { key: 'profile', label: 'Profile' },
]

const EVENT_CATEGORIES = ['all', 'daily', 'weekly', 'monthly', 'yearly']

const toTextRows = (items = []) => items.map((text) => ({ text }))
const toPairRows = (items = []) =>
  items.map((item) => ({ label: item?.label ?? '', value: item?.value ?? '' }))
const cleanTextRows = (rows = []) => rows.map((row) => row.text.trim()).filter(Boolean)
const cleanPairRows = (rows = []) =>
  rows
    .map((row) => ({ label: row.label.trim(), value: row.value.trim() }))
    .filter((row) => row.label || row.value)

const emptyEvent = {
  title: '',
  date: '',
  time: '',
  location: '',
  category: 'all',
  image: '',
  description: '',
}

const emptyMediaCard = {
  id: '',
  title: '',
  description: '',
  buttonLabel: '',
}

const emptyMediaUpdate = {
  title: '',
  description: '',
  action: '',
}

const emptyPair = { label: '', value: '' }

const panelClass =
  'rounded-[12px] border border-[#dce4f0] bg-[#fbfcff] p-4 shadow-[0_1px_0_rgba(18,33,70,0.02)]'
const inputClass =
  'mt-2 h-11 w-full rounded-[10px] border border-[#e2e7f0] bg-white px-3 text-[14px] outline-none focus:border-[#9bb0e1]'
const textareaClass =
  'mt-2 min-h-[96px] w-full rounded-[10px] border border-[#e2e7f0] bg-white p-3 text-[14px] outline-none focus:border-[#9bb0e1]'
const actionButtonClass =
  'inline-flex h-9 items-center justify-center rounded-[8px] border border-[#d6dfef] px-3 text-[12px] font-semibold text-[#1f3f97] transition hover:bg-[#edf2ff]'

const DataTable = ({
  title,
  columns,
  rows,
  onEdit,
  onDelete,
  emptyMessage,
  showActions = true,
}) => {
  return (
    <div className={panelClass}>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-[14px] font-bold text-[#1a2333]'>{title}</h3>
        <p className='text-[12px] text-[#64748b]'>Total: {rows.length}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[620px] border-collapse'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='border-b border-[#e3e9f4] px-2 py-2 text-left text-[12px] font-semibold uppercase tracking-[0.05em] text-[#6a7790]'
                >
                  {column.label}
                </th>
              ))}
              {showActions ? (
                <th className='border-b border-[#e3e9f4] px-2 py-2 text-left text-[12px] font-semibold uppercase tracking-[0.05em] text-[#6a7790]'>
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className='border-b border-[#eef2f8] px-2 py-2 text-[13px] text-[#243047]'
                    >
                      {column.render ? column.render(row) : row[column.key] || '-'}
                    </td>
                  ))}
                  {showActions ? (
                    <td className='border-b border-[#eef2f8] px-2 py-2'>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => onEdit(index)}
                          className='inline-flex h-8 items-center justify-center rounded-[8px] border border-[#d6dfef] px-3 text-[12px] font-semibold text-[#1f3f97] transition hover:bg-[#edf2ff]'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => onDelete(index)}
                          className='inline-flex h-8 items-center justify-center rounded-[8px] border border-[#f0caca] px-3 text-[12px] font-semibold text-[#b63b3b] transition hover:bg-[#fff3f3]'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showActions ? columns.length + 1 : columns.length}
                  className='px-3 py-5 text-center text-[13px] text-[#6a7790]'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const session = useAuthStore((state) => state.session)
  const setAuth = useAuthStore((state) => state.setAuth)
  const logout = useAuthStore((state) => state.logout)

  const initialTab = location.pathname.split('/')[2]
  const [active, setActive] = useState(
    menu.some((item) => item.key === initialTab) ? initialTab : 'visitors',
  )
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [visitorsForm, setVisitorsForm] = useState({
    rules: [],
    daily: [],
    langar: [],
    sundaySpecial: '',
    address: [],
    reach: [],
  })

  const [eventsRows, setEventsRows] = useState([])
  const [mediaCardsRows, setMediaCardsRows] = useState([])
  const [mediaUpdatesRows, setMediaUpdatesRows] = useState([])
  const [contactForm, setContactForm] = useState({
    phone: '',
    email: '',
    address: [],
  })

  const [eventDraft, setEventDraft] = useState(emptyEvent)
  const [editingEventIndex, setEditingEventIndex] = useState(null)
  const [eventImageFile, setEventImageFile] = useState(null)
  const [isUploadingEventImage, setIsUploadingEventImage] = useState(false)

  const [mediaCardDraft, setMediaCardDraft] = useState(emptyMediaCard)
  const [editingMediaCardIndex, setEditingMediaCardIndex] = useState(null)

  const [mediaUpdateDraft, setMediaUpdateDraft] = useState(emptyMediaUpdate)
  const [editingMediaUpdateIndex, setEditingMediaUpdateIndex] = useState(null)

  const [visitorDrafts, setVisitorDrafts] = useState({
    rule: '',
    daily: emptyPair,
    langar: emptyPair,
    address: '',
    reach: '',
  })
  const [visitorEditing, setVisitorEditing] = useState({
    rule: null,
    daily: null,
    langar: null,
    address: null,
    reach: null,
  })

  const [contactAddressDraft, setContactAddressDraft] = useState('')
  const [editingContactAddressIndex, setEditingContactAddressIndex] = useState(null)
  const [openForms, setOpenForms] = useState({
    visitorsRule: false,
    visitorsDaily: false,
    visitorsLangar: false,
    visitorsAddress: false,
    visitorsReach: false,
    events: false,
    mediaCards: false,
    mediaUpdates: false,
    contactAddress: false,
  })
  const [editModal, setEditModal] = useState({
    open: false,
    type: '',
    index: null,
    data: {},
  })
  const [modalImageFile, setModalImageFile] = useState(null)
  const [isUploadingModalImage, setIsUploadingModalImage] = useState(false)
  const [editFocusId, setEditFocusId] = useState('')
  const [editFocusMessage, setEditFocusMessage] = useState('')
  const [isProfileSaving, setIsProfileSaving] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [usersLoading, setUsersLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [profileForm, setProfileForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })

  const editHighlightTimerRef = useRef(null)
  const visitorRuleFormRef = useRef(null)
  const visitorDailyFormRef = useRef(null)
  const visitorLangarFormRef = useRef(null)
  const visitorAddressFormRef = useRef(null)
  const visitorReachFormRef = useRef(null)
  const eventFormRef = useRef(null)
  const mediaCardFormRef = useRef(null)
  const mediaUpdateFormRef = useRef(null)
  const contactAddressFormRef = useRef(null)

  const startEdit = (type, index, data) => {
    setEditModal({
      open: true,
      type,
      index,
      data: { ...data },
    })
    setModalImageFile(null)
  }

  const closeEditModal = () => {
    setEditModal({
      open: false,
      type: '',
      index: null,
      data: {},
    })
    setModalImageFile(null)
  }

  const { data: content, isLoading } = useSiteContentQuery()
  const updateMutation = useUpdateContentSectionMutation()

  useEffect(() => {
    if (!content) {
      return
    }

    setVisitorsForm({
      rules: toTextRows(content.visitors?.rulesEtiquette),
      daily: toPairRows(content.visitors?.openingTimings?.dailySchedule),
      langar: toPairRows(content.visitors?.openingTimings?.langarSchedule),
      sundaySpecial: content.visitors?.openingTimings?.sundaySpecial ?? '',
      address: toTextRows(content.visitors?.location?.addressLines),
      reach: toTextRows(content.visitors?.location?.howToReach),
    })

    setEventsRows(
      (content.events?.items ?? []).map((item) => ({
        title: item.title ?? '',
        date: item.date ?? '',
        time: item.time ?? '',
        location: item.location ?? '',
        category: item.category ?? 'all',
        image: item.image ?? '',
        description: item.description ?? '',
      })),
    )

    setMediaCardsRows(
      (content.media?.cards ?? []).map((item) => ({
        id: item.id ?? '',
        title: item.title ?? '',
        description: item.description ?? '',
        buttonLabel: item.buttonLabel ?? '',
      })),
    )

    setMediaUpdatesRows(
      (content.media?.updates ?? []).map((item) => ({
        title: item.title ?? '',
        description: item.description ?? '',
        action: item.action ?? '',
      })),
    )

    setContactForm({
      phone: content.contact?.phone ?? '',
      email: content.contact?.email ?? '',
      address: toTextRows(content.contact?.addressLines),
    })

    setEventDraft(emptyEvent)
    setEditingEventIndex(null)
    setEventImageFile(null)
    setMediaCardDraft(emptyMediaCard)
    setEditingMediaCardIndex(null)
    setMediaUpdateDraft(emptyMediaUpdate)
    setEditingMediaUpdateIndex(null)
    setVisitorDrafts({
      rule: '',
      daily: emptyPair,
      langar: emptyPair,
      address: '',
      reach: '',
    })
    setVisitorEditing({
      rule: null,
      daily: null,
      langar: null,
      address: null,
      reach: null,
    })
    setContactAddressDraft('')
    setEditingContactAddressIndex(null)
    setOpenForms({
      visitorsRule: false,
      visitorsDaily: false,
      visitorsLangar: false,
      visitorsAddress: false,
      visitorsReach: false,
      events: false,
      mediaCards: false,
      mediaUpdates: false,
      contactAddress: false,
    })
  }, [content])

  const sectionLabel = useMemo(
    () => menu.find((item) => item.key === active)?.label ?? 'Content',
    [active],
  )

  useEffect(() => {
    const tab = location.pathname.split('/')[2]

    if (!tab || !menu.some((item) => item.key === tab)) {
      navigate('/dashboard/visitors', { replace: true })
      return
    }

    if (tab !== active) {
      setActive(tab)
      setError('')
      setSuccess('')
    }
  }, [active, location.pathname, navigate])

  const switchSection = (key) => {
    setActive(key)
    setError('')
    setSuccess('')
    navigate(`/dashboard/${key}`)
  }

  const showForm = (key) => {
    setOpenForms((prev) => ({ ...prev, [key]: true }))
  }

  const hideForm = (key) => {
    setOpenForms((prev) => ({ ...prev, [key]: false }))
  }

  const replaceOrAppend = (rows, index, value) => {
    if (index === null) {
      return [...rows, value]
    }
    return rows.map((item, itemIndex) => (itemIndex === index ? value : item))
  }

  const resetStatus = () => {
    setError('')
    setSuccess('')
  }

  const getPanelClass = (id) =>
    `${panelClass} ${
      editFocusId === id ? 'ring-2 ring-[#2b4faa] ring-offset-2 ring-offset-white' : ''
    }`

  const focusEditForm = (id, ref, message) => {
    setEditFocusId(id)
    setEditFocusMessage(message)

    if (editHighlightTimerRef.current) {
      clearTimeout(editHighlightTimerRef.current)
    }

    editHighlightTimerRef.current = setTimeout(() => {
      setEditFocusId('')
      setEditFocusMessage('')
    }, 3000)

    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    return () => {
      if (editHighlightTimerRef.current) {
        clearTimeout(editHighlightTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setProfileForm((prev) => ({
      ...prev,
      email: user?.email ?? '',
    }))
  }, [user?.email])

  const loadUsers = async () => {
    if (!session?.accessToken) {
      return
    }

    try {
      setUsersLoading(true)
      const response = await listUsersRequest({ token: session.accessToken })
      setUsers(response.data?.users ?? [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setUsersLoading(false)
    }
  }

  useEffect(() => {
    if (active === 'profile') {
      loadUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, session?.accessToken])

  const upsertEvent = () => {
    resetStatus()

    if (!eventDraft.title.trim()) {
      setError('Event title is required before adding.')
      return
    }

    const nextEvent = {
      title: eventDraft.title.trim(),
      date: eventDraft.date.trim(),
      time: eventDraft.time.trim(),
      location: eventDraft.location.trim(),
      category: eventDraft.category.trim() || 'all',
      image: eventDraft.image.trim(),
      description: eventDraft.description.trim(),
    }

    setEventsRows((prev) => replaceOrAppend(prev, editingEventIndex, nextEvent))
    setEventDraft(emptyEvent)
    setEditingEventIndex(null)
    setEventImageFile(null)
  }

  const uploadEventImage = async () => {
    resetStatus()

    if (!eventImageFile) {
      setError('Please choose an image file first.')
      return
    }

    try {
      setIsUploadingEventImage(true)
      const uploaded = await uploadContentImage(eventImageFile, 'events')
      setEventDraft((prev) => ({ ...prev, image: uploaded.url || '' }))
      setSuccess('Event image uploaded to Supabase Storage.')
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload event image.')
    } finally {
      setIsUploadingEventImage(false)
    }
  }

  const upsertMediaCard = () => {
    resetStatus()

    if (!mediaCardDraft.id.trim() || !mediaCardDraft.title.trim()) {
      setError('Media card ID and title are required before adding.')
      return
    }

    const nextCard = {
      id: mediaCardDraft.id.trim(),
      title: mediaCardDraft.title.trim(),
      description: mediaCardDraft.description.trim(),
      buttonLabel: mediaCardDraft.buttonLabel.trim(),
    }

    setMediaCardsRows((prev) => replaceOrAppend(prev, editingMediaCardIndex, nextCard))
    setMediaCardDraft(emptyMediaCard)
    setEditingMediaCardIndex(null)
  }

  const upsertMediaUpdate = () => {
    resetStatus()

    if (!mediaUpdateDraft.title.trim()) {
      setError('Media update title is required before adding.')
      return
    }

    const nextUpdate = {
      title: mediaUpdateDraft.title.trim(),
      description: mediaUpdateDraft.description.trim(),
      action: mediaUpdateDraft.action.trim(),
    }

    setMediaUpdatesRows((prev) => replaceOrAppend(prev, editingMediaUpdateIndex, nextUpdate))
    setMediaUpdateDraft(emptyMediaUpdate)
    setEditingMediaUpdateIndex(null)
  }

  const upsertVisitorsText = (field, draftKey, editKey) => {
    resetStatus()
    const value = visitorDrafts[draftKey].trim()

    if (!value) {
      setError('Please enter a value before adding.')
      return
    }

    setVisitorsForm((prev) => ({
      ...prev,
      [field]: replaceOrAppend(prev[field], visitorEditing[editKey], { text: value }),
    }))
    setVisitorDrafts((prev) => ({ ...prev, [draftKey]: '' }))
    setVisitorEditing((prev) => ({ ...prev, [editKey]: null }))
  }

  const upsertVisitorsPair = (field, draftKey, editKey) => {
    resetStatus()
    const draft = visitorDrafts[draftKey]
    const label = draft.label.trim()
    const value = draft.value.trim()

    if (!label && !value) {
      setError('Please enter a label or value before adding.')
      return
    }

    setVisitorsForm((prev) => ({
      ...prev,
      [field]: replaceOrAppend(prev[field], visitorEditing[editKey], { label, value }),
    }))
    setVisitorDrafts((prev) => ({ ...prev, [draftKey]: emptyPair }))
    setVisitorEditing((prev) => ({ ...prev, [editKey]: null }))
  }

  const removeVisitorsRow = (field, index, editKey, draftReset) => {
    setVisitorsForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, itemIndex) => itemIndex !== index),
    }))

    if (visitorEditing[editKey] === index) {
      setVisitorEditing((prev) => ({ ...prev, [editKey]: null }))
      setVisitorDrafts((prev) => ({ ...prev, [draftReset.key]: draftReset.value }))
    }
  }

  const upsertContactAddress = () => {
    resetStatus()
    const value = contactAddressDraft.trim()

    if (!value) {
      setError('Please enter an address line before adding.')
      return
    }

    setContactForm((prev) => ({
      ...prev,
      address: replaceOrAppend(prev.address, editingContactAddressIndex, { text: value }),
    }))
    setContactAddressDraft('')
    setEditingContactAddressIndex(null)
  }

  const handleProfileUpdate = async () => {
    resetStatus()

    if (!session?.accessToken) {
      setError('You need to login again to update profile.')
      return
    }

    const email = profileForm.email.trim()
    const password = profileForm.password.trim()
    const confirmPassword = profileForm.confirmPassword.trim()

    if (!email && !password) {
      setError('Please provide an email and/or password.')
      return
    }

    if (password && password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password && password !== confirmPassword) {
      setError('Password confirmation does not match.')
      return
    }

    try {
      setIsProfileSaving(true)
      const response = await updateProfileRequest({
        token: session.accessToken,
        email: email || undefined,
        password: password || undefined,
      })

      setAuth({
        user: {
          ...(user ?? {}),
          email: response.data?.email ?? email ?? user?.email,
        },
        session,
      })

      setProfileForm((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }))
      setSuccess('Profile updated successfully.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsProfileSaving(false)
    }
  }

  const handleCreateUser = async () => {
    resetStatus()

    if (!session?.accessToken) {
      setError('You need to login again to create users.')
      return
    }

    const name = newUserForm.name.trim()
    const email = newUserForm.email.trim()
    const password = newUserForm.password.trim()
    const role = newUserForm.role.trim() || 'user'

    if (!email || !password) {
      setError('New user email and password are required.')
      return
    }

    if (password.length < 8) {
      setError('New user password must be at least 8 characters.')
      return
    }

    try {
      setIsCreatingUser(true)
      await createUserRequest({
        token: session.accessToken,
        email,
        password,
        role,
        name,
      })
      setSuccess('User created successfully.')
      setNewUserForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
      })
      await loadUsers()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsCreatingUser(false)
    }
  }

  const handleModalSave = async () => {
    const { type, index, data } = editModal

    if (index == null) {
      return
    }

    let nextData = { ...data }

    if (type === 'events' && modalImageFile) {
      try {
        setIsUploadingModalImage(true)
        const uploaded = await uploadContentImage(modalImageFile, 'events')
        nextData.image = uploaded.url || ''
      } catch (uploadError) {
        setError(uploadError.message || 'Failed to upload event image.')
        setIsUploadingModalImage(false)
        return
      } finally {
        setIsUploadingModalImage(false)
      }
    }

    try {
      if (
        type === 'visitors-rule' ||
        type === 'visitors-daily' ||
        type === 'visitors-langar' ||
        type === 'visitors-address' ||
        type === 'visitors-reach'
      ) {
        const nextVisitors = {
          ...visitorsForm,
          rules:
            type === 'visitors-rule'
              ? visitorsForm.rules.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.rules,
          daily:
            type === 'visitors-daily'
              ? visitorsForm.daily.map((row, i) =>
                  i === index ? { label: nextData.label ?? '', value: nextData.value ?? '' } : row,
                )
              : visitorsForm.daily,
          langar:
            type === 'visitors-langar'
              ? visitorsForm.langar.map((row, i) =>
                  i === index ? { label: nextData.label ?? '', value: nextData.value ?? '' } : row,
                )
              : visitorsForm.langar,
          address:
            type === 'visitors-address'
              ? visitorsForm.address.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.address,
          reach:
            type === 'visitors-reach'
              ? visitorsForm.reach.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.reach,
        }

        setVisitorsForm(nextVisitors)
        await updateMutation.mutateAsync({
          section: 'visitors',
          data: {
            rulesEtiquette: cleanTextRows(nextVisitors.rules),
            openingTimings: {
              dailySchedule: cleanPairRows(nextVisitors.daily),
              langarSchedule: cleanPairRows(nextVisitors.langar),
              sundaySpecial: nextVisitors.sundaySpecial.trim(),
            },
            location: {
              addressLines: cleanTextRows(nextVisitors.address),
              howToReach: cleanTextRows(nextVisitors.reach),
            },
          },
        })
      }

      if (type === 'events') {
        const nextEvents = eventsRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        setEventsRows(nextEvents)

        await updateMutation.mutateAsync({
          section: 'events',
          data: {
            items: nextEvents
              .map((row) => ({
                title: row.title.trim(),
                date: row.date.trim(),
                time: row.time.trim(),
                location: row.location.trim(),
                category: row.category.trim() || 'all',
                image: row.image.trim() || null,
                description: row.description.trim(),
              }))
              .filter(
                (row) =>
                  row.title ||
                  row.date ||
                  row.time ||
                  row.location ||
                  row.description ||
                  row.image,
              ),
          },
        })
      }

      if (type === 'media-cards' || type === 'media-updates') {
        const nextMediaCards =
          type === 'media-cards'
            ? mediaCardsRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
            : mediaCardsRows
        const nextMediaUpdates =
          type === 'media-updates'
            ? mediaUpdatesRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
            : mediaUpdatesRows

        setMediaCardsRows(nextMediaCards)
        setMediaUpdatesRows(nextMediaUpdates)

        await updateMutation.mutateAsync({
          section: 'media',
          data: {
            cards: nextMediaCards
              .map((row) => ({
                id: row.id.trim(),
                title: row.title.trim(),
                description: row.description.trim(),
                buttonLabel: row.buttonLabel.trim(),
              }))
              .filter((row) => row.id || row.title || row.description || row.buttonLabel),
            updates: nextMediaUpdates
              .map((row) => ({
                title: row.title.trim(),
                description: row.description.trim(),
                action: row.action.trim(),
              }))
              .filter((row) => row.title || row.description || row.action),
          },
        })
      }

      if (type === 'contact-address') {
        const nextContact = {
          ...contactForm,
          address: contactForm.address.map((row, i) =>
            i === index ? { text: nextData.text ?? '' } : row,
          ),
        }
        setContactForm(nextContact)
        await updateMutation.mutateAsync({
          section: 'contact',
          data: {
            phone: nextContact.phone.trim(),
            email: nextContact.email.trim(),
            addressLines: cleanTextRows(nextContact.address),
          },
        })
      }

      closeEditModal()
      setSuccess('Entry updated and saved.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const onSave = async () => {
    setError('')
    setSuccess('')

    try {
      if (active === 'visitors') {
        await updateMutation.mutateAsync({
          section: 'visitors',
          data: {
            rulesEtiquette: cleanTextRows(visitorsForm.rules),
            openingTimings: {
              dailySchedule: cleanPairRows(visitorsForm.daily),
              langarSchedule: cleanPairRows(visitorsForm.langar),
              sundaySpecial: visitorsForm.sundaySpecial.trim(),
            },
            location: {
              addressLines: cleanTextRows(visitorsForm.address),
              howToReach: cleanTextRows(visitorsForm.reach),
            },
          },
        })
      }

      if (active === 'events') {
        await updateMutation.mutateAsync({
          section: 'events',
          data: {
            items: eventsRows
              .map((row) => ({
                title: row.title.trim(),
                date: row.date.trim(),
                time: row.time.trim(),
                location: row.location.trim(),
                category: row.category.trim() || 'all',
                image: row.image.trim() || null,
                description: row.description.trim(),
              }))
              .filter(
                (row) =>
                  row.title ||
                  row.date ||
                  row.time ||
                  row.location ||
                  row.description ||
                  row.image,
              ),
          },
        })
      }

      if (active === 'media') {
        await updateMutation.mutateAsync({
          section: 'media',
          data: {
            cards: mediaCardsRows
              .map((row) => ({
                id: row.id.trim(),
                title: row.title.trim(),
                description: row.description.trim(),
                buttonLabel: row.buttonLabel.trim(),
              }))
              .filter((row) => row.id || row.title || row.description || row.buttonLabel),
            updates: mediaUpdatesRows
              .map((row) => ({
                title: row.title.trim(),
                description: row.description.trim(),
                action: row.action.trim(),
              }))
              .filter((row) => row.title || row.description || row.action),
          },
        })
      }

      if (active === 'contact') {
        await updateMutation.mutateAsync({
          section: 'contact',
          data: {
            phone: contactForm.phone.trim(),
            email: contactForm.email.trim(),
            addressLines: cleanTextRows(contactForm.address),
          },
        })
      }

      setSuccess(`${sectionLabel} content saved successfully.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  if (isLoading) {
    return (
      <div className='grid min-h-screen place-items-center bg-[#f4f7ff] font-["Manrope","Segoe_UI",sans-serif]'>
        <p className='text-[16px] text-[#5f6c87]'>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#eef3ff] font-["Manrope","Segoe_UI",sans-serif] text-[#121521]'>
      <div className='mx-auto w-full max-w-[1440px] lg:flex'>
        <aside className='hidden min-h-screen w-[280px] shrink-0 border-r border-[#d6dfef] bg-white p-5 lg:block'>
          <div className='rounded-[14px] bg-[#2b4faa] px-4 py-4 text-white'>
            <p className='text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80'>
              Admin
            </p>
            <p className='mt-1 text-[16px] font-bold'>{user?.email ?? 'Admin User'}</p>
          </div>

          <nav className='mt-6 space-y-2'>
            {menu.map((item) => (
              <button
                key={item.key}
                type='button'
                onClick={() => {
                  switchSection(item.key)
                }}
                className={`flex w-full items-center rounded-[10px] px-4 py-3 text-left text-[14px] font-semibold transition ${
                  active === item.key
                    ? 'bg-[#e9efff] text-[#1f3f97]'
                    : 'text-[#4d5d76] hover:bg-[#f4f7ff]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type='button'
            onClick={handleLogout}
            className='mt-8 inline-flex h-10 w-full items-center justify-center rounded-[10px] border border-[#d7deea] text-[14px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
          >
            Logout
          </button>
        </aside>

        <main className='flex-1 p-4 sm:p-5 md:p-6 lg:p-8'>
          <div className='mb-4 rounded-[14px] border border-[#d8dfeb] bg-white p-3 shadow-[0_3px_12px_rgba(18,33,70,0.05)] lg:hidden'>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <p className='text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5f6c87]'>
                  Admin
                </p>
                <p className='text-[13px] font-bold text-[#1a2333]'>{user?.email ?? 'Admin User'}</p>
              </div>
              <button
                type='button'
                onClick={handleLogout}
                className='inline-flex h-9 shrink-0 items-center justify-center rounded-[8px] border border-[#d7deea] px-3 text-[12px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
              >
                Logout
              </button>
            </div>

            <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
              {menu.map((item) => (
                <button
                  key={`mobile-${item.key}`}
                  type='button'
                  onClick={() => {
                    switchSection(item.key)
                  }}
                  className={`inline-flex h-9 shrink-0 items-center rounded-[8px] px-3 text-[12px] font-semibold transition ${
                    active === item.key
                      ? 'bg-[#e9efff] text-[#1f3f97]'
                      : 'border border-[#d7deea] bg-white text-[#4d5d76]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className='rounded-[18px] border border-[#d8dfeb] bg-white p-4 shadow-[0_6px_20px_rgba(18,33,70,0.06)] sm:p-5 md:p-6 lg:p-8'>
            <h1 className='text-[32px] font-extrabold tracking-[-0.03em] text-[#111318]'>
              {sectionLabel} Management
            </h1>
            <p className='mt-2 text-[15px] text-[#5f6c87]'>
              Use the forms to add or edit entries, then save when you are ready to publish.
            </p>

            {error ? (
              <p className='mt-5 rounded-[10px] border border-[#f2b5b5] bg-[#fff0f0] px-4 py-3 text-[14px] font-medium text-[#a32020]'>
                {error}
              </p>
            ) : null}

            {success ? (
              <p className='mt-5 rounded-[10px] border border-[#b8dfcb] bg-[#ebfff3] px-4 py-3 text-[14px] font-medium text-[#1c6b44]'>
                {success}
              </p>
            ) : null}

            {editFocusMessage ? (
              <p className='mt-5 rounded-[10px] border border-[#bfd6fb] bg-[#eef6ff] px-4 py-3 text-[14px] font-semibold text-[#1f3f97]'>
                {editFocusMessage}
              </p>
            ) : null}

            {active === 'visitors' ? (
              <div className='mt-6 space-y-5'>
                <div className='flex justify-end'>
                  <button type='button' onClick={() => showForm('visitorsRule')} className={actionButtonClass}>
                    Add Rule
                  </button>
                </div>
                {openForms.visitorsRule ? (
                <div ref={visitorRuleFormRef} className={getPanelClass('visitors-rule-form')}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>Rules & Etiquette</h3>
                  <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                    Rule
                    <textarea
                      value={visitorDrafts.rule}
                      onChange={(event) =>
                        setVisitorDrafts((prev) => ({ ...prev, rule: event.target.value }))
                      }
                      className={textareaClass}
                      placeholder='Enter rule for visitors'
                    />
                  </label>
                  <div className='mt-3 flex gap-2'>
                    <button
                      type='button'
                      onClick={() => upsertVisitorsText('rules', 'rule', 'rule')}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                    >
                      {visitorEditing.rule === null ? 'Add Rule' : 'Update Rule'}
                    </button>
                    {visitorEditing.rule !== null ? (
                      <button
                        type='button'
                        onClick={() => {
                          setVisitorEditing((prev) => ({ ...prev, rule: null }))
                          setVisitorDrafts((prev) => ({ ...prev, rule: '' }))
                        }}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                    <button
                      type='button'
                      onClick={() => hideForm('visitorsRule')}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                    >
                      Close Form
                    </button>
                  </div>
                </div>
                ) : null}

                <DataTable
                  title='Rules List'
                  rows={visitorsForm.rules}
                  columns={[{ key: 'text', label: 'Rule' }]}
                  emptyMessage='No visitor rules added yet.'
                  onEdit={(index) => startEdit('visitors-rule', index, visitorsForm.rules[index])}
                  onDelete={(index) =>
                    removeVisitorsRow('rules', index, 'rule', { key: 'rule', value: '' })
                  }
                />

                <div className='space-y-5'>
                  <div className='flex justify-end'>
                    <button type='button' onClick={() => showForm('visitorsDaily')} className={actionButtonClass}>
                      Add Daily Slot
                    </button>
                  </div>
                  {openForms.visitorsDaily ? (
                  <div ref={visitorDailyFormRef} className={getPanelClass('visitors-daily-form')}>
                    <h3 className='text-[15px] font-bold text-[#1a2333]'>Daily Schedule</h3>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Label
                        <input
                          value={visitorDrafts.daily.label}
                          onChange={(event) =>
                            setVisitorDrafts((prev) => ({
                              ...prev,
                              daily: { ...prev.daily, label: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Morning Prayer'
                        />
                      </label>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Time
                        <input
                          value={visitorDrafts.daily.value}
                          onChange={(event) =>
                            setVisitorDrafts((prev) => ({
                              ...prev,
                              daily: { ...prev.daily, value: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='5:00 AM - 7:00 AM'
                        />
                      </label>
                    </div>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={() => upsertVisitorsPair('daily', 'daily', 'daily')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                      >
                        {visitorEditing.daily === null ? 'Add Daily Slot' : 'Update Daily Slot'}
                      </button>
                      {visitorEditing.daily !== null ? (
                        <button
                          type='button'
                          onClick={() => {
                            setVisitorEditing((prev) => ({ ...prev, daily: null }))
                            setVisitorDrafts((prev) => ({ ...prev, daily: emptyPair }))
                          }}
                          className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                      <button
                        type='button'
                        onClick={() => hideForm('visitorsDaily')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Close Form
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Daily Schedule List'
                    rows={visitorsForm.daily}
                    columns={[
                      { key: 'label', label: 'Label' },
                      { key: 'value', label: 'Time' },
                    ]}
                    emptyMessage='No daily schedule entries yet.'
                    onEdit={(index) => startEdit('visitors-daily', index, visitorsForm.daily[index])}
                    onDelete={(index) =>
                      removeVisitorsRow('daily', index, 'daily', { key: 'daily', value: emptyPair })
                    }
                  />
                </div>

                <div className='space-y-5'>
                  <div className='flex justify-end'>
                    <button type='button' onClick={() => showForm('visitorsLangar')} className={actionButtonClass}>
                      Add Langar Slot
                    </button>
                  </div>
                  {openForms.visitorsLangar ? (
                  <div ref={visitorLangarFormRef} className={getPanelClass('visitors-langar-form')}>
                    <h3 className='text-[15px] font-bold text-[#1a2333]'>Langar Schedule</h3>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Label
                        <input
                          value={visitorDrafts.langar.label}
                          onChange={(event) =>
                            setVisitorDrafts((prev) => ({
                              ...prev,
                              langar: { ...prev.langar, label: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Lunch'
                        />
                      </label>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Time
                        <input
                          value={visitorDrafts.langar.value}
                          onChange={(event) =>
                            setVisitorDrafts((prev) => ({
                              ...prev,
                              langar: { ...prev.langar, value: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='12:00 PM - 2:00 PM'
                        />
                      </label>
                    </div>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={() => upsertVisitorsPair('langar', 'langar', 'langar')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                      >
                        {visitorEditing.langar === null ? 'Add Langar Slot' : 'Update Langar Slot'}
                      </button>
                      {visitorEditing.langar !== null ? (
                        <button
                          type='button'
                          onClick={() => {
                            setVisitorEditing((prev) => ({ ...prev, langar: null }))
                            setVisitorDrafts((prev) => ({ ...prev, langar: emptyPair }))
                          }}
                          className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                      <button
                        type='button'
                        onClick={() => hideForm('visitorsLangar')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Close Form
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Langar Schedule List'
                    rows={visitorsForm.langar}
                    columns={[
                      { key: 'label', label: 'Label' },
                      { key: 'value', label: 'Time' },
                    ]}
                    emptyMessage='No langar schedule entries yet.'
                    onEdit={(index) =>
                      startEdit('visitors-langar', index, visitorsForm.langar[index])
                    }
                    onDelete={(index) =>
                      removeVisitorsRow('langar', index, 'langar', {
                        key: 'langar',
                        value: emptyPair,
                      })
                    }
                  />
                </div>

                <div className={getPanelClass('visitors-sunday-special')}>
                  <label className='block text-[14px] font-semibold text-[#1a2333]'>
                    Sunday Special
                    <textarea
                      value={visitorsForm.sundaySpecial}
                      onChange={(event) =>
                        setVisitorsForm((prev) => ({ ...prev, sundaySpecial: event.target.value }))
                      }
                      className={textareaClass}
                      placeholder='Weekly Kirtan Darbar details'
                    />
                  </label>
                </div>

                <div className='space-y-5'>
                  <div className='flex justify-end'>
                    <button type='button' onClick={() => showForm('visitorsAddress')} className={actionButtonClass}>
                      Add Address Line
                    </button>
                  </div>
                  {openForms.visitorsAddress ? (
                  <div ref={visitorAddressFormRef} className={getPanelClass('visitors-address-form')}>
                    <h3 className='text-[15px] font-bold text-[#1a2333]'>Address Lines</h3>
                    <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                      Address Line
                      <input
                        value={visitorDrafts.address}
                        onChange={(event) =>
                          setVisitorDrafts((prev) => ({ ...prev, address: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Wollankstraße 8'
                      />
                    </label>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={() => upsertVisitorsText('address', 'address', 'address')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                      >
                        {visitorEditing.address === null
                          ? 'Add Address Line'
                          : 'Update Address Line'}
                      </button>
                      {visitorEditing.address !== null ? (
                        <button
                          type='button'
                          onClick={() => {
                            setVisitorEditing((prev) => ({ ...prev, address: null }))
                            setVisitorDrafts((prev) => ({ ...prev, address: '' }))
                          }}
                          className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                      <button
                        type='button'
                        onClick={() => hideForm('visitorsAddress')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Close Form
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Address Lines List'
                    rows={visitorsForm.address}
                    columns={[{ key: 'text', label: 'Address Line' }]}
                    emptyMessage='No address lines yet.'
                    onEdit={(index) =>
                      startEdit('visitors-address', index, visitorsForm.address[index])
                    }
                    onDelete={(index) =>
                      removeVisitorsRow('address', index, 'address', {
                        key: 'address',
                        value: '',
                      })
                    }
                  />
                </div>

                <div className='space-y-5'>
                  <div className='flex justify-end'>
                    <button type='button' onClick={() => showForm('visitorsReach')} className={actionButtonClass}>
                      Add Route Line
                    </button>
                  </div>
                  {openForms.visitorsReach ? (
                  <div ref={visitorReachFormRef} className={getPanelClass('visitors-reach-form')}>
                    <h3 className='text-[15px] font-bold text-[#1a2333]'>How To Reach</h3>
                    <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                      Route Instruction
                      <input
                        value={visitorDrafts.reach}
                        onChange={(event) =>
                          setVisitorDrafts((prev) => ({ ...prev, reach: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='U-Bahn: U8 to Pankstraße'
                      />
                    </label>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={() => upsertVisitorsText('reach', 'reach', 'reach')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                      >
                        {visitorEditing.reach === null ? 'Add Route Line' : 'Update Route Line'}
                      </button>
                      {visitorEditing.reach !== null ? (
                        <button
                          type='button'
                          onClick={() => {
                            setVisitorEditing((prev) => ({ ...prev, reach: null }))
                            setVisitorDrafts((prev) => ({ ...prev, reach: '' }))
                          }}
                          className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                      <button
                        type='button'
                        onClick={() => hideForm('visitorsReach')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Close Form
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='How To Reach List'
                    rows={visitorsForm.reach}
                    columns={[{ key: 'text', label: 'Route' }]}
                    emptyMessage='No route lines yet.'
                    onEdit={(index) => startEdit('visitors-reach', index, visitorsForm.reach[index])}
                    onDelete={(index) =>
                      removeVisitorsRow('reach', index, 'reach', { key: 'reach', value: '' })
                    }
                  />
                </div>
              </div>
            ) : null}

            {active === 'events' ? (
              <div className='mt-6 space-y-5'>
                <div className='flex justify-end'>
                  <button type='button' onClick={() => showForm('events')} className={actionButtonClass}>
                    Add Event
                  </button>
                </div>
                {openForms.events ? (
                <div ref={eventFormRef} className={getPanelClass('events-form')}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>Create / Edit Event</h3>
                  <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Title
                      <input
                        value={eventDraft.title}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, title: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Vaisakhi Celebration 2026'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Date
                      <input
                        value={eventDraft.date}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, date: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='April 14, 2026'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Time
                      <input
                        value={eventDraft.time}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, time: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='9:00 AM - 6:00 PM'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Location
                      <input
                        value={eventDraft.location}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, location: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Main Hall'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Category
                      <select
                        value={eventDraft.category}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, category: event.target.value }))
                        }
                        className={inputClass}
                      >
                        {EVENT_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Event Image
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(event) => setEventImageFile(event.target.files?.[0] ?? null)}
                        className='mt-2 block w-full rounded-[10px] border border-[#e2e7f0] bg-white px-3 py-2 text-[13px] text-[#1a2333] file:mr-3 file:rounded-[8px] file:border-0 file:bg-[#edf2ff] file:px-3 file:py-2 file:text-[12px] file:font-semibold file:text-[#1f3f97] hover:file:bg-[#dfe8ff]'
                      />
                      <div className='mt-2 flex flex-wrap items-center gap-2'>
                        <button
                          type='button'
                          onClick={uploadEventImage}
                          disabled={isUploadingEventImage}
                          className='inline-flex h-9 items-center justify-center rounded-[8px] border border-[#d6dfef] px-3 text-[12px] font-semibold text-[#1f3f97] transition hover:bg-[#edf2ff] disabled:cursor-not-allowed disabled:opacity-70'
                        >
                          {isUploadingEventImage ? 'Uploading...' : 'Upload Image'}
                        </button>
                        <span className='text-[12px] text-[#6a7790]'>
                          {eventImageFile ? eventImageFile.name : 'No file selected'}
                        </span>
                      </div>
                    </label>
                  </div>
                  {eventDraft.image ? (
                    <div className='mt-3 rounded-[10px] border border-[#dce4f0] bg-white p-3'>
                      <img src={eventDraft.image} alt='Event preview' className='h-[180px] w-full rounded-[8px] object-cover' />
                      <button
                        type='button'
                        onClick={() => setEventDraft((prev) => ({ ...prev, image: '' }))}
                        className='mt-3 inline-flex h-9 items-center justify-center rounded-[8px] border border-[#f0caca] px-3 text-[12px] font-semibold text-[#b63b3b] transition hover:bg-[#fff3f3]'
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : null}
                  <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                    Description
                    <textarea
                      value={eventDraft.description}
                      onChange={(event) =>
                        setEventDraft((prev) => ({ ...prev, description: event.target.value }))
                      }
                      className={textareaClass}
                      placeholder='Event details'
                    />
                  </label>

                  <div className='mt-3 flex gap-2'>
                    <button
                      type='button'
                      onClick={upsertEvent}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                    >
                      {editingEventIndex === null ? 'Add Event' : 'Update Event'}
                    </button>
                    {editingEventIndex !== null ? (
                      <button
                        type='button'
                        onClick={() => {
                          setEditingEventIndex(null)
                          setEventDraft(emptyEvent)
                        }}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                    <button
                      type='button'
                      onClick={() => hideForm('events')}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                    >
                      Close Form
                    </button>
                  </div>
                </div>
                ) : null}

                <DataTable
                  title='Events Table View'
                  rows={eventsRows}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'date', label: 'Date' },
                    { key: 'time', label: 'Time' },
                    { key: 'location', label: 'Location' },
                    { key: 'category', label: 'Category' },
                  ]}
                  emptyMessage='No events created yet.'
                  onEdit={(index) => startEdit('events', index, eventsRows[index])}
                  onDelete={(index) => {
                    setEventsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                    if (editingEventIndex === index) {
                      setEditingEventIndex(null)
                      setEventDraft(emptyEvent)
                    }
                  }}
                />
              </div>
            ) : null}

            {active === 'media' ? (
              <div className='mt-6 space-y-5'>
                <div className='flex justify-end'>
                  <button type='button' onClick={() => showForm('mediaCards')} className={actionButtonClass}>
                    Add Media Card
                  </button>
                </div>
                {openForms.mediaCards ? (
                <div ref={mediaCardFormRef} className={getPanelClass('media-card-form')}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>Create / Edit Media Card</h3>
                  <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      ID
                      <input
                        value={mediaCardDraft.id}
                        onChange={(event) =>
                          setMediaCardDraft((prev) => ({ ...prev, id: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='photo-gallery'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Title
                      <input
                        value={mediaCardDraft.title}
                        onChange={(event) =>
                          setMediaCardDraft((prev) => ({ ...prev, title: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Photo Gallery'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a] md:col-span-2'>
                      Button Label
                      <input
                        value={mediaCardDraft.buttonLabel}
                        onChange={(event) =>
                          setMediaCardDraft((prev) => ({
                            ...prev,
                            buttonLabel: event.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder='View Photo Albums'
                      />
                    </label>
                  </div>
                  <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                    Description
                    <textarea
                      value={mediaCardDraft.description}
                      onChange={(event) =>
                        setMediaCardDraft((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                      className={textareaClass}
                      placeholder='Card description'
                    />
                  </label>

                  <div className='mt-3 flex gap-2'>
                    <button
                      type='button'
                      onClick={upsertMediaCard}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                    >
                      {editingMediaCardIndex === null ? 'Add Card' : 'Update Card'}
                    </button>
                    {editingMediaCardIndex !== null ? (
                      <button
                        type='button'
                        onClick={() => {
                          setEditingMediaCardIndex(null)
                          setMediaCardDraft(emptyMediaCard)
                        }}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                    <button
                      type='button'
                      onClick={() => hideForm('mediaCards')}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                    >
                      Close Form
                    </button>
                  </div>
                </div>
                ) : null}

                <DataTable
                  title='Media Cards Table View'
                  rows={mediaCardsRows}
                  columns={[
                    { key: 'id', label: 'ID' },
                    { key: 'title', label: 'Title' },
                    { key: 'buttonLabel', label: 'Button Label' },
                  ]}
                  emptyMessage='No media cards created yet.'
                  onEdit={(index) => startEdit('media-cards', index, mediaCardsRows[index])}
                  onDelete={(index) => {
                    setMediaCardsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                    if (editingMediaCardIndex === index) {
                      setEditingMediaCardIndex(null)
                      setMediaCardDraft(emptyMediaCard)
                    }
                  }}
                />

                <div className='flex justify-end'>
                  <button type='button' onClick={() => showForm('mediaUpdates')} className={actionButtonClass}>
                    Add Media Update
                  </button>
                </div>
                {openForms.mediaUpdates ? (
                <div ref={mediaUpdateFormRef} className={getPanelClass('media-update-form')}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>Create / Edit Media Update</h3>
                  <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Title
                      <input
                        value={mediaUpdateDraft.title}
                        onChange={(event) =>
                          setMediaUpdateDraft((prev) => ({ ...prev, title: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Vaisakhi 2026 Photo Album'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Action
                      <input
                        value={mediaUpdateDraft.action}
                        onChange={(event) =>
                          setMediaUpdateDraft((prev) => ({ ...prev, action: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='View Album'
                      />
                    </label>
                  </div>
                  <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                    Description
                    <textarea
                      value={mediaUpdateDraft.description}
                      onChange={(event) =>
                        setMediaUpdateDraft((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                      className={textareaClass}
                      placeholder='Update details'
                    />
                  </label>

                  <div className='mt-3 flex gap-2'>
                    <button
                      type='button'
                      onClick={upsertMediaUpdate}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                    >
                      {editingMediaUpdateIndex === null ? 'Add Update' : 'Update Entry'}
                    </button>
                    {editingMediaUpdateIndex !== null ? (
                      <button
                        type='button'
                        onClick={() => {
                          setEditingMediaUpdateIndex(null)
                          setMediaUpdateDraft(emptyMediaUpdate)
                        }}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                    <button
                      type='button'
                      onClick={() => hideForm('mediaUpdates')}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                    >
                      Close Form
                    </button>
                  </div>
                </div>
                ) : null}

                <DataTable
                  title='Media Updates Table View'
                  rows={mediaUpdatesRows}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'action', label: 'Action' },
                    {
                      key: 'description',
                      label: 'Description',
                      render: (row) => row.description || '-',
                    },
                  ]}
                  emptyMessage='No media updates created yet.'
                  onEdit={(index) => startEdit('media-updates', index, mediaUpdatesRows[index])}
                  onDelete={(index) => {
                    setMediaUpdatesRows((prev) =>
                      prev.filter((_, itemIndex) => itemIndex !== index),
                    )
                    if (editingMediaUpdateIndex === index) {
                      setEditingMediaUpdateIndex(null)
                      setMediaUpdateDraft(emptyMediaUpdate)
                    }
                  }}
                />
              </div>
            ) : null}

            {active === 'contact' ? (
              <div className='mt-6 space-y-5'>
                <div className={getPanelClass('contact-main-form')}>
                  <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    <label className='text-[14px] font-semibold text-[#1a2333]'>
                      Phone
                      <input
                        value={contactForm.phone}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, phone: event.target.value }))
                        }
                        className={inputClass}
                      />
                    </label>

                    <label className='text-[14px] font-semibold text-[#1a2333]'>
                      Email
                      <input
                        value={contactForm.email}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>

                <div className='space-y-5'>
                  <div className='flex justify-end'>
                    <button type='button' onClick={() => showForm('contactAddress')} className={actionButtonClass}>
                      Add Address Line
                    </button>
                  </div>
                  {openForms.contactAddress ? (
                  <div ref={contactAddressFormRef} className={getPanelClass('contact-address-form')}>
                    <h3 className='text-[15px] font-bold text-[#1a2333]'>Contact Address</h3>
                    <label className='mt-3 block text-[13px] font-semibold text-[#33415a]'>
                      Address Line
                      <input
                        value={contactAddressDraft}
                        onChange={(event) => setContactAddressDraft(event.target.value)}
                        className={inputClass}
                        placeholder='13187 Berlin'
                      />
                    </label>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={upsertContactAddress}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                      >
                        {editingContactAddressIndex === null
                          ? 'Add Address Line'
                          : 'Update Address Line'}
                      </button>
                      {editingContactAddressIndex !== null ? (
                        <button
                          type='button'
                          onClick={() => {
                            setEditingContactAddressIndex(null)
                            setContactAddressDraft('')
                          }}
                          className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                      <button
                        type='button'
                        onClick={() => hideForm('contactAddress')}
                        className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                      >
                        Close Form
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Address Lines Table View'
                    rows={contactForm.address}
                    columns={[{ key: 'text', label: 'Address Line' }]}
                    emptyMessage='No contact address lines yet.'
                    onEdit={(index) =>
                      startEdit('contact-address', index, contactForm.address[index])
                    }
                    onDelete={(index) => {
                      setContactForm((prev) => ({
                        ...prev,
                        address: prev.address.filter((_, itemIndex) => itemIndex !== index),
                      }))
                      if (editingContactAddressIndex === index) {
                        setEditingContactAddressIndex(null)
                        setContactAddressDraft('')
                      }
                    }}
                  />
                </div>
              </div>
            ) : null}

            {active === 'profile' ? (
              <div className='mt-6 space-y-5'>
                <div className={panelClass}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>My Profile</h3>
                  <p className='mt-1 text-[13px] text-[#5f6c87]'>
                    Update your login email or password.
                  </p>
                  <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='text-[13px] font-semibold text-[#33415a] md:col-span-2'>
                      Email
                      <input
                        type='email'
                        value={profileForm.email}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='you@example.com'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      New Password
                      <input
                        type='password'
                        value={profileForm.password}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Minimum 8 characters'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Confirm Password
                      <input
                        type='password'
                        value={profileForm.confirmPassword}
                        onChange={(event) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            confirmPassword: event.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder='Repeat password'
                      />
                    </label>
                  </div>
                  <button
                    type='button'
                    onClick={handleProfileUpdate}
                    disabled={isProfileSaving}
                    className='mt-4 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599] disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    {isProfileSaving ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>

                <div className={panelClass}>
                  <h3 className='text-[15px] font-bold text-[#1a2333]'>Create User</h3>
                  <p className='mt-1 text-[13px] text-[#5f6c87]'>
                    Add a new user and assign their app role (admin or user).
                  </p>
                  <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Name
                      <input
                        value={newUserForm.name}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Optional name'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      App Role
                      <select
                        value={newUserForm.role}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, role: event.target.value }))
                        }
                        className={inputClass}
                      >
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                      </select>
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Email
                      <input
                        type='email'
                        value={newUserForm.email}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='new.user@example.com'
                      />
                    </label>
                    <label className='text-[13px] font-semibold text-[#33415a]'>
                      Password
                      <input
                        type='password'
                        value={newUserForm.password}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Minimum 8 characters'
                      />
                    </label>
                  </div>
                  <button
                    type='button'
                    onClick={handleCreateUser}
                    disabled={isCreatingUser}
                    className='mt-4 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599] disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    {isCreatingUser ? 'Creating...' : 'Create User'}
                  </button>
                </div>

                <DataTable
                  title='Users'
                  rows={users}
                  columns={[
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role' },
                    { key: 'name', label: 'Name' },
                  ]}
                  emptyMessage={usersLoading ? 'Loading users...' : 'No users found.'}
                  showActions={false}
                />
              </div>
            ) : null}

            {editModal.open ? (
              <div className='fixed inset-0 z-40 flex items-center justify-center bg-[#10172bcc] p-4'>
                <div className='flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)]'>
                  <div className='overflow-y-auto px-5 pb-4 pt-5'>
                  <h3 className='text-[18px] font-bold text-[#121521]'>Update Entry</h3>
                  <p className='mt-1 text-[13px] text-[#5f6c87]'>
                    Update the values below and save this edit.
                  </p>

                  {['visitors-rule', 'visitors-address', 'visitors-reach', 'contact-address'].includes(
                    editModal.type,
                  ) ? (
                    <label className='mt-4 block text-[13px] font-semibold text-[#33415a]'>
                      Text
                      <textarea
                        value={editModal.data.text ?? ''}
                        onChange={(event) =>
                          setEditModal((prev) => ({
                            ...prev,
                            data: { ...prev.data, text: event.target.value },
                          }))
                        }
                        className={textareaClass}
                        placeholder='Edit text'
                      />
                    </label>
                  ) : null}

                  {['visitors-daily', 'visitors-langar'].includes(editModal.type) ? (
                    <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Label
                        <input
                          value={editModal.data.label ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, label: event.target.value },
                            }))
                          }
                          className={inputClass}
                        />
                      </label>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Value
                        <input
                          value={editModal.data.value ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, value: event.target.value },
                            }))
                          }
                          className={inputClass}
                        />
                      </label>
                    </div>
                  ) : null}

                  {editModal.type === 'events' ? (
                    <div className='mt-4 space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Title
                          <input
                            value={editModal.data.title ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, title: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Date
                          <input
                            value={editModal.data.date ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, date: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Time
                          <input
                            value={editModal.data.time ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, time: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Location
                          <input
                            value={editModal.data.location ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, location: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Category
                          <select
                            value={editModal.data.category ?? 'all'}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, category: event.target.value },
                              }))
                            }
                            className={inputClass}
                          >
                            {EVENT_CATEGORIES.map((category) => (
                              <option key={`modal-${category}`} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Event Image
                          <input
                            type='file'
                            accept='image/*'
                            onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                            className='mt-2 block w-full rounded-[10px] border border-[#e2e7f0] bg-white px-3 py-2 text-[13px] text-[#1a2333] file:mr-3 file:rounded-[8px] file:border-0 file:bg-[#edf2ff] file:px-3 file:py-2 file:text-[12px] file:font-semibold file:text-[#1f3f97] hover:file:bg-[#dfe8ff]'
                          />
                          <div className='mt-2 flex flex-wrap items-center gap-2'>
                            <span className='text-[12px] text-[#6a7790]'>
                              {modalImageFile ? modalImageFile.name : 'No file selected'}
                            </span>
                            <span className='text-[12px] font-semibold text-[#1f3f97]'>
                              File uploads when you click Update Entry
                            </span>
                          </div>
                        </label>
                      </div>
                      {editModal.data.image ? (
                        <div className='rounded-[10px] border border-[#dce4f0] bg-white p-3'>
                          <img
                            src={editModal.data.image}
                            alt='Event preview'
                            className='h-[180px] w-full rounded-[8px] object-cover'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, image: '' },
                              }))
                            }
                            className='mt-3 inline-flex h-9 items-center justify-center rounded-[8px] border border-[#f0caca] px-3 text-[12px] font-semibold text-[#b63b3b] transition hover:bg-[#fff3f3]'
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : null}
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Description
                        <textarea
                          value={editModal.data.description ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, description: event.target.value },
                            }))
                          }
                          className={textareaClass}
                        />
                      </label>
                    </div>
                  ) : null}

                  {editModal.type === 'media-cards' ? (
                    <div className='mt-4 space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          ID
                          <input
                            value={editModal.data.id ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, id: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Title
                          <input
                            value={editModal.data.title ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, title: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a] md:col-span-2'>
                          Button Label
                          <input
                            value={editModal.data.buttonLabel ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, buttonLabel: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                      </div>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Description
                        <textarea
                          value={editModal.data.description ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, description: event.target.value },
                            }))
                          }
                          className={textareaClass}
                        />
                      </label>
                    </div>
                  ) : null}

                  {editModal.type === 'media-updates' ? (
                    <div className='mt-4 space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Title
                          <input
                            value={editModal.data.title ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, title: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className='text-[13px] font-semibold text-[#33415a]'>
                          Action
                          <input
                            value={editModal.data.action ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, action: event.target.value },
                              }))
                            }
                            className={inputClass}
                          />
                        </label>
                      </div>
                      <label className='text-[13px] font-semibold text-[#33415a]'>
                        Description
                        <textarea
                          value={editModal.data.description ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, description: event.target.value },
                            }))
                          }
                          className={textareaClass}
                        />
                      </label>
                    </div>
                  ) : null}
                  </div>
                  <div className='flex shrink-0 justify-end gap-2 border-t border-[#e3e9f4] bg-white px-5 py-3'>
                    <button
                      type='button'
                      onClick={closeEditModal}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d7deea] px-4 text-[13px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      onClick={handleModalSave}
                      className='inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2b4faa] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244599]'
                    >
                      Update Entry
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {active !== 'profile' ? (
              <button
                type='button'
                onClick={onSave}
                disabled={updateMutation.isPending}
                className='mt-8 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2b4faa] px-6 text-[14px] font-semibold text-white transition hover:bg-[#244599] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
