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
import { 
  Users, 
  Calendar, 
  Clock3 as Clock,
  Image as ImageIcon, 
  Mail, 
  Info, 
  User, 
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  ChevronRight,
  Menu as MenuIcon,
  X,
  PlusCircle,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  Search
} from 'lucide-react'

const ICON_MAP = {
  Users: Users,
  Calendar: Calendar,
  ImageIcon: ImageIcon,
  Mail: Mail,
  Info: Info,
  User: User,
}

const menu = [
  { key: 'visitors', label: 'Visitors', icon: 'Users' },
  { key: 'events', label: 'Events', icon: 'Calendar' },
  { key: 'media', label: 'Media', icon: 'ImageIcon' },
  { key: 'contact', label: 'Contact', icon: 'Mail' },
  { key: 'about-us', label: 'About Us', icon: 'Info' },
  { key: 'profile', label: 'Profile', icon: 'User' },
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

const panelClass = 'rounded-[24px] border border-gray-100 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all duration-300'
const inputClass = 'mt-2 h-11 w-full rounded-[14px] border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:bg-gray-100/50 focus:border-[#001da5] focus:bg-white focus:ring-4 focus:ring-[#001da5]/5'
const textareaClass = 'mt-2 min-h-[120px] w-full rounded-[14px] border border-gray-200 bg-gray-50 p-4 text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:bg-gray-100/50 focus:border-[#001da5] focus:bg-white focus:ring-4 focus:ring-[#001da5]/5'
const actionButtonClass = 'inline-flex h-10 items-center justify-center rounded-[12px] border border-gray-200 bg-gray-50 px-5 text-[13px] font-semibold text-gray-700 transition-all hover:bg-gray-100 hover:text-[#001da5] hover:border-[#001da5]/30 active:scale-95'
const primaryButtonClass = 'inline-flex h-10 items-center justify-center rounded-[12px] bg-[#001da5] px-5 text-[13px] font-bold text-white transition-all hover:bg-[#001580] shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
const defaultAboutUsForm = {
  history: {
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    sections: [{ title: '', body: '' }],
  },
  mission: {
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    cards: [{ title: '', description: '', accent: '' }],
    coreValues: [{ title: '', description: '' }],
  },
  committee: {
    heroTitle: '',
    heroSubtitle: '',
    intro: '',
    members: [{ initials: '', name: '', role: '', email: '', phone: '', image: '' }],
    ctaTitle: '',
    ctaDescription: '',
    ctaButtonLabel: '',
  },
  governance: {
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    structureTitle: '',
    structureIntro: '',
    structureBlocks: [{ title: '', body: '' }],
    documentsTitle: '',
    documents: [{ title: '', size: '', accent: '' }],
    reportsTitle: '',
    reports: [{ title: '', size: '' }],
    financialTitle: '',
    financialDescription: '',
    taxTitle: '',
    taxDescription: '',
  },
}

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
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>{title}</h3>
          <p className='mt-0.5 text-[12px] text-gray-500'>Total entries: {rows.length}</p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[620px] border-collapse'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='border-b border-gray-100 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400'
                >
                  {column.label}
                </th>
              ))}
              {showActions ? (
                <th className='border-b border-gray-100 px-4 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400'>
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={`${title}-${index}`} className='group hover:bg-gray-50/50 transition-colors'>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className='px-4 py-4 text-[13px] text-gray-700 font-medium'
                    >
                      {column.render ? column.render(row) : (row[column.key] || '-')}
                    </td>
                  ))}
                  {showActions ? (
                    <td className='px-4 py-4'>
                      <div className='flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          type='button'
                          onClick={() => onEdit(index)}
                          className='inline-flex h-8 items-center justify-center rounded-[8px] border border-gray-200 px-3 text-[12px] font-bold text-gray-600 transition hover:bg-white hover:border-[#001da5]/30 hover:text-[#001da5]'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => onDelete(index)}
                          className='inline-flex h-8 items-center justify-center rounded-[8px] border border-red-100 bg-red-50/50 px-3 text-[12px] font-bold text-red-500 transition hover:bg-red-50 hover:border-red-200'
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
                  className='px-4 py-12 text-center text-[13px] text-gray-400'
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
  const [aboutUsForm, setAboutUsForm] = useState(defaultAboutUsForm)

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
  const [isUploadingAboutImage, setIsUploadingAboutImage] = useState(false)
  const [aboutUsSavingSection, setAboutUsSavingSection] = useState('')
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
    const aboutUs = content.aboutUs ?? {}
    setAboutUsForm({
      history: {
        heroTitle: aboutUs.history?.heroTitle ?? '',
        heroSubtitle: aboutUs.history?.heroSubtitle ?? '',
        heroImage: aboutUs.history?.heroImage ?? '',
        sections:
          Array.isArray(aboutUs.history?.sections) && aboutUs.history.sections.length > 0
            ? aboutUs.history.sections.map((item) => ({
                title: item?.title ?? '',
                body: item?.body ?? '',
              }))
            : [{ title: '', body: '' }],
      },
      mission: {
        heroTitle: aboutUs.mission?.heroTitle ?? '',
        heroDescription: aboutUs.mission?.heroDescription ?? '',
        heroImage: aboutUs.mission?.heroImage ?? '',
        cards:
          Array.isArray(aboutUs.mission?.cards) && aboutUs.mission.cards.length > 0
            ? aboutUs.mission.cards.map((item) => ({
                title: item?.title ?? '',
                description: item?.description ?? '',
                accent: item?.accent ?? '',
              }))
            : [{ title: '', description: '', accent: '' }],
        coreValues:
          Array.isArray(aboutUs.mission?.coreValues) && aboutUs.mission.coreValues.length > 0
            ? aboutUs.mission.coreValues.map((item) => ({
                title: item?.title ?? '',
                description: item?.description ?? '',
              }))
            : [{ title: '', description: '' }],
      },
      committee: {
        heroTitle: aboutUs.committee?.heroTitle ?? '',
        heroSubtitle: aboutUs.committee?.heroSubtitle ?? '',
        intro: aboutUs.committee?.intro ?? '',
        members:
          Array.isArray(aboutUs.committee?.members) && aboutUs.committee.members.length > 0
            ? aboutUs.committee.members.map((item) => ({
                initials: item?.initials ?? '',
                name: item?.name ?? '',
                role: item?.role ?? '',
                email: item?.email ?? '',
              phone: item?.phone ?? '',
              image: item?.image ?? '',
              }))
            : [{ initials: '', name: '', role: '', email: '', phone: '', image: '' }],
        ctaTitle: aboutUs.committee?.ctaTitle ?? '',
        ctaDescription: aboutUs.committee?.ctaDescription ?? '',
        ctaButtonLabel: aboutUs.committee?.ctaButtonLabel ?? '',
      },
      governance: {
        heroTitle: aboutUs.governance?.heroTitle ?? '',
        heroSubtitle: aboutUs.governance?.heroSubtitle ?? '',
        heroImage: aboutUs.governance?.heroImage ?? '',
        structureTitle: aboutUs.governance?.structureTitle ?? '',
        structureIntro: aboutUs.governance?.structureIntro ?? '',
        structureBlocks:
          Array.isArray(aboutUs.governance?.structureBlocks) &&
          aboutUs.governance.structureBlocks.length > 0
            ? aboutUs.governance.structureBlocks.map((item) => ({
                title: item?.title ?? '',
                body: item?.body ?? '',
              }))
            : [{ title: '', body: '' }],
        documentsTitle: aboutUs.governance?.documentsTitle ?? '',
        documents:
          Array.isArray(aboutUs.governance?.documents) && aboutUs.governance.documents.length > 0
            ? aboutUs.governance.documents.map((item) => ({
                title: item?.title ?? '',
                size: item?.size ?? '',
                accent: item?.accent ?? '',
              }))
            : [{ title: '', size: '', accent: '' }],
        reportsTitle: aboutUs.governance?.reportsTitle ?? '',
        reports:
          Array.isArray(aboutUs.governance?.reports) && aboutUs.governance.reports.length > 0
            ? aboutUs.governance.reports.map((item) => ({
                title: item?.title ?? '',
                size: item?.size ?? '',
              }))
            : [{ title: '', size: '' }],
        financialTitle: aboutUs.governance?.financialTitle ?? '',
        financialDescription: aboutUs.governance?.financialDescription ?? '',
        taxTitle: aboutUs.governance?.taxTitle ?? '',
        taxDescription: aboutUs.governance?.taxDescription ?? '',
      },
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
      editFocusId === id ? 'ring-2 ring-black ring-offset-2 ring-offset-white' : ''
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

  const updateAboutUsText = (section, field, value) => {
    setAboutUsForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateAboutUsArrayItem = (section, listKey, index, field, value) => {
    setAboutUsForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: prev[section][listKey].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item,
        ),
      },
    }))
  }

  const removeAboutUsArrayItem = (section, listKey, index, emptyItem) => {
    setAboutUsForm((prev) => {
      const nextList = prev[section][listKey].filter((_, itemIndex) => itemIndex !== index)
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [listKey]: nextList.length > 0 ? nextList : [emptyItem],
        },
      }
    })
  }

  const uploadAboutImage = async (file, applyUrl, successMessage = 'Image uploaded.') => {
    resetStatus()
    if (!file) {
      setError('Please choose an image file first.')
      return
    }

    try {
      setIsUploadingAboutImage(true)
      const uploaded = await uploadContentImage(file, 'aboutUs')
      applyUrl(uploaded.url || '')
      setSuccess(successMessage)
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload image.')
    } finally {
      setIsUploadingAboutImage(false)
    }
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

    if ((type === 'events' || type === 'about-committee-member') && modalImageFile) {
      try {
        setIsUploadingModalImage(true)
        const uploaded = await uploadContentImage(
          modalImageFile,
          type === 'events' ? 'events' : 'aboutUs',
        )
        nextData.image = uploaded.url || ''
      } catch (uploadError) {
        setError(uploadError.message || 'Failed to upload image.')
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

      if (type === 'about-history-section') {
        setAboutUsForm((prev) => ({
          ...prev,
          history: {
            ...prev.history,
            sections:
              index < 0
                ? [...prev.history.sections, { title: '', body: '', ...nextData }]
                : prev.history.sections.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-mission-card') {
        setAboutUsForm((prev) => ({
          ...prev,
          mission: {
            ...prev.mission,
            cards:
              index < 0
                ? [...prev.mission.cards, { title: '', description: '', accent: '', ...nextData }]
                : prev.mission.cards.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-mission-value') {
        setAboutUsForm((prev) => ({
          ...prev,
          mission: {
            ...prev.mission,
            coreValues:
              index < 0
                ? [...prev.mission.coreValues, { title: '', description: '', ...nextData }]
                : prev.mission.coreValues.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-committee-member') {
        setAboutUsForm((prev) => ({
          ...prev,
          committee: {
            ...prev.committee,
            members:
              index < 0
                ? [
                    ...prev.committee.members,
                    {
                      initials: '',
                      name: '',
                      role: '',
                      email: '',
                      phone: '',
                      image: '',
                      ...nextData,
                    },
                  ]
                : prev.committee.members.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-governance-structure') {
        setAboutUsForm((prev) => ({
          ...prev,
          governance: {
            ...prev.governance,
            structureBlocks:
              index < 0
                ? [...prev.governance.structureBlocks, { title: '', body: '', ...nextData }]
                : prev.governance.structureBlocks.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-governance-document') {
        setAboutUsForm((prev) => ({
          ...prev,
          governance: {
            ...prev.governance,
            documents:
              index < 0
                ? [...prev.governance.documents, { title: '', size: '', accent: '', ...nextData }]
                : prev.governance.documents.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
      }

      if (type === 'about-governance-report') {
        setAboutUsForm((prev) => ({
          ...prev,
          governance: {
            ...prev.governance,
            reports:
              index < 0
                ? [...prev.governance.reports, { title: '', size: '', ...nextData }]
                : prev.governance.reports.map((row, i) => (i === index ? { ...row, ...nextData } : row)),
          },
        }))
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

      if (active === 'about-us') {
        await updateMutation.mutateAsync({
          section: 'aboutUs',
          data: {
            history: {
              heroTitle: aboutUsForm.history.heroTitle.trim(),
              heroSubtitle: aboutUsForm.history.heroSubtitle.trim(),
              heroImage: aboutUsForm.history.heroImage.trim(),
              sections: aboutUsForm.history.sections
                .map((item) => ({
                  title: item.title.trim(),
                  body: item.body.trim(),
                }))
                .filter((item) => item.title || item.body),
            },
            mission: {
              heroTitle: aboutUsForm.mission.heroTitle.trim(),
              heroDescription: aboutUsForm.mission.heroDescription.trim(),
              heroImage: aboutUsForm.mission.heroImage.trim(),
              cards: aboutUsForm.mission.cards
                .map((item) => ({
                  title: item.title.trim(),
                  description: item.description.trim(),
                  accent: item.accent.trim(),
                }))
                .filter((item) => item.title || item.description || item.accent),
              coreValues: aboutUsForm.mission.coreValues
                .map((item) => ({
                  title: item.title.trim(),
                  description: item.description.trim(),
                }))
                .filter((item) => item.title || item.description),
            },
            committee: {
              heroTitle: aboutUsForm.committee.heroTitle.trim(),
              heroSubtitle: aboutUsForm.committee.heroSubtitle.trim(),
              intro: aboutUsForm.committee.intro.trim(),
              members: aboutUsForm.committee.members
                .map((item) => ({
                  initials: item.initials.trim(),
                  name: item.name.trim(),
                  role: item.role.trim(),
                  email: item.email.trim(),
                  phone: item.phone.trim(),
                  image: item.image.trim(),
                }))
                .filter((item) => item.initials || item.name || item.role || item.email || item.phone || item.image),
              ctaTitle: aboutUsForm.committee.ctaTitle.trim(),
              ctaDescription: aboutUsForm.committee.ctaDescription.trim(),
              ctaButtonLabel: aboutUsForm.committee.ctaButtonLabel.trim(),
            },
            governance: {
              heroTitle: aboutUsForm.governance.heroTitle.trim(),
              heroSubtitle: aboutUsForm.governance.heroSubtitle.trim(),
              heroImage: aboutUsForm.governance.heroImage.trim(),
              structureTitle: aboutUsForm.governance.structureTitle.trim(),
              structureIntro: aboutUsForm.governance.structureIntro.trim(),
              structureBlocks: aboutUsForm.governance.structureBlocks
                .map((item) => ({
                  title: item.title.trim(),
                  body: item.body.trim(),
                }))
                .filter((item) => item.title || item.body),
              documentsTitle: aboutUsForm.governance.documentsTitle.trim(),
              documents: aboutUsForm.governance.documents
                .map((item) => ({
                  title: item.title.trim(),
                  size: item.size.trim(),
                  accent: item.accent.trim(),
                }))
                .filter((item) => item.title || item.size || item.accent),
              reportsTitle: aboutUsForm.governance.reportsTitle.trim(),
              reports: aboutUsForm.governance.reports
                .map((item) => ({
                  title: item.title.trim(),
                  size: item.size.trim(),
                }))
                .filter((item) => item.title || item.size),
              financialTitle: aboutUsForm.governance.financialTitle.trim(),
              financialDescription: aboutUsForm.governance.financialDescription.trim(),
              taxTitle: aboutUsForm.governance.taxTitle.trim(),
              taxDescription: aboutUsForm.governance.taxDescription.trim(),
            },
          },
        })
      }

      setSuccess(`${sectionLabel} content saved successfully.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const buildAboutUsPayload = () => ({
    history: {
      heroTitle: aboutUsForm.history.heroTitle.trim(),
      heroSubtitle: aboutUsForm.history.heroSubtitle.trim(),
      heroImage: aboutUsForm.history.heroImage.trim(),
      sections: aboutUsForm.history.sections
        .map((item) => ({
          title: item.title.trim(),
          body: item.body.trim(),
        }))
        .filter((item) => item.title || item.body),
    },
    mission: {
      heroTitle: aboutUsForm.mission.heroTitle.trim(),
      heroDescription: aboutUsForm.mission.heroDescription.trim(),
      heroImage: aboutUsForm.mission.heroImage.trim(),
      cards: aboutUsForm.mission.cards
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
          accent: item.accent.trim(),
        }))
        .filter((item) => item.title || item.description || item.accent),
      coreValues: aboutUsForm.mission.coreValues
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
        }))
        .filter((item) => item.title || item.description),
    },
    committee: {
      heroTitle: aboutUsForm.committee.heroTitle.trim(),
      heroSubtitle: aboutUsForm.committee.heroSubtitle.trim(),
      intro: aboutUsForm.committee.intro.trim(),
      members: aboutUsForm.committee.members
        .map((item) => ({
          initials: item.initials.trim(),
          name: item.name.trim(),
          role: item.role.trim(),
          email: item.email.trim(),
          phone: item.phone.trim(),
          image: item.image.trim(),
        }))
        .filter((item) => item.initials || item.name || item.role || item.email || item.phone || item.image),
      ctaTitle: aboutUsForm.committee.ctaTitle.trim(),
      ctaDescription: aboutUsForm.committee.ctaDescription.trim(),
      ctaButtonLabel: aboutUsForm.committee.ctaButtonLabel.trim(),
    },
    governance: {
      heroTitle: aboutUsForm.governance.heroTitle.trim(),
      heroSubtitle: aboutUsForm.governance.heroSubtitle.trim(),
      heroImage: aboutUsForm.governance.heroImage.trim(),
      structureTitle: aboutUsForm.governance.structureTitle.trim(),
      structureIntro: aboutUsForm.governance.structureIntro.trim(),
      structureBlocks: aboutUsForm.governance.structureBlocks
        .map((item) => ({
          title: item.title.trim(),
          body: item.body.trim(),
        }))
        .filter((item) => item.title || item.body),
      documentsTitle: aboutUsForm.governance.documentsTitle.trim(),
      documents: aboutUsForm.governance.documents
        .map((item) => ({
          title: item.title.trim(),
          size: item.size.trim(),
          accent: item.accent.trim(),
        }))
        .filter((item) => item.title || item.size || item.accent),
      reportsTitle: aboutUsForm.governance.reportsTitle.trim(),
      reports: aboutUsForm.governance.reports
        .map((item) => ({
          title: item.title.trim(),
          size: item.size.trim(),
        }))
        .filter((item) => item.title || item.size),
      financialTitle: aboutUsForm.governance.financialTitle.trim(),
      financialDescription: aboutUsForm.governance.financialDescription.trim(),
      taxTitle: aboutUsForm.governance.taxTitle.trim(),
      taxDescription: aboutUsForm.governance.taxDescription.trim(),
    },
  })

  const saveAboutUsSection = async (sectionKey, sectionLabel = 'About Us section') => {
    setError('')
    setSuccess('')
    setAboutUsSavingSection(sectionKey)
    try {
      await updateMutation.mutateAsync({
        section: 'aboutUs',
        data: buildAboutUsPayload(),
      })
      setSuccess(`${sectionLabel} saved and published.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setAboutUsSavingSection('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  if (isLoading) {
    return (
      <div className='grid min-h-screen place-items-center bg-[#f4f7ff] font-["Poppins","Segoe_UI",sans-serif]'>
        <p className='text-[16px] text-gray-500'>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f8faff] font-["Poppins","Segoe_UI",sans-serif] text-gray-900 selection:bg-[#001da5]/10 selection:text-[#001da5]'>
      <div className='mx-auto w-full max-w-[1600px] lg:flex'>
        {/* Sidebar */}
        <aside className='sticky top-0 hidden h-screen w-[280px] shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-8 lg:flex lg:flex-col lg:self-start'>
          <div className='mb-10 flex items-center gap-3 px-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
              <LayoutDashboard size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className='text-[15px] font-bold tracking-tight text-gray-900'>SSG Admin</h2>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Control Center</p>
            </div>
          </div>

          <div className='mb-8 px-2'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1'>
              Management
            </p>
            <nav className='space-y-1.5'>
              {menu.map((item) => {
                const Icon = ICON_MAP[item.icon]
                return (
                  <button
                    key={item.key}
                    type='button'
                    onClick={() => switchSection(item.key)}
                    className={`group flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[14px] font-bold transition-all duration-300 ${
                      active === item.key
                        ? 'bg-[#001da5] text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#001da5]'
                    }`}
                  >
                    <Icon size={18} className={`${active === item.key ? 'text-white' : 'text-gray-400 group-hover:text-[#001da5]'} transition-colors`} />
                    {item.label}
                    {active === item.key && <ChevronRight size={14} className='ml-auto' />}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className='mt-auto pt-8 border-t border-gray-100 px-2'>
            <div className='mb-6 flex items-center gap-3 px-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 border border-gray-100'>
                <User size={16} className='text-gray-400' />
              </div>
              <div className='flex-1 overflow-hidden'>
                <p className='text-[13px] font-bold text-gray-900 truncate'>{user?.email?.split('@')[0] ?? 'Admin'}</p>
                <p className='text-[11px] text-gray-400 truncate'>{user?.email ?? 'admin@example.com'}</p>
              </div>
            </div>

            <button
              type='button'
              onClick={handleLogout}
              className='flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[14px] font-bold text-red-500/70 transition-all hover:bg-red-50 hover:text-red-600'
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        <main className='flex-1 px-4 py-8 sm:px-8 md:px-12 lg:px-16'>
          {/* Mobile Header */}
          <div className='mb-8 rounded-[24px] border border-gray-100 bg-white/80 backdrop-blur-xl p-6 shadow-sm lg:hidden'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                  <LayoutDashboard size={20} strokeWidth={2.5} />
                </div>
                <div>
                   <h2 className='text-[14px] font-bold tracking-tight text-gray-900'>SSG Admin</h2>
                   <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none'>Mobile Access</p>
                </div>
              </div>
              <button
                type='button'
                onClick={handleLogout}
                className='flex h-9 w-9 items-center justify-center rounded-[10px] border border-gray-100 text-red-500/70 hover:bg-red-50 hover:text-red-600 transition-colors'
              >
                <LogOut size={18} />
              </button>
            </div>

            <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
              {menu.map((item) => {
                const Icon = ICON_MAP[item.icon]
                return (
                  <button
                    key={`mobile-${item.key}`}
                    type='button'
                    onClick={() => switchSection(item.key)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-[12px] px-4 py-2.5 text-[12px] font-bold transition-all duration-300 ${
                      active === item.key
                        ? 'bg-[#001da5] text-white shadow-lg shadow-blue-500/20'
                        : 'border border-gray-100 bg-gray-50 text-gray-500 hover:text-[#001da5]'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
              <div>
                <nav className='flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400'>
                  <span>Portal</span>
                  <ChevronRight size={10} strokeWidth={3} />
                  <span className='text-gray-600'>{sectionLabel}</span>
                </nav>
                <h1 className='text-[48px] font-black tracking-[-0.04em] text-gray-900 leading-tight'>
                  {sectionLabel}
                </h1>
                <p className='mt-3 text-[16px] text-gray-600 max-w-xl font-medium leading-relaxed'>
                  Refine and manage the content displayed on the {sectionLabel.toLowerCase()} section of your public website.
                </p>
              </div>
              
              {active !== 'about-us' && active !== 'profile' ? (
                <div className='flex gap-3'>
                  <button
                    type='button'
                    onClick={onSave}
                    className='inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#001da5] px-6 text-[14px] font-bold text-white transition-all hover:bg-[#001580] active:scale-95 shadow-xl shadow-blue-500/20'
                  >
                    <Save size={18} />
                    Publish Changes
                  </button>
                </div>
              ) : null}
            </div>

            {error ? (
              <div className='mb-8 flex items-center gap-3 rounded-[16px] border border-red-500/20 bg-red-500/5 px-5 py-4 text-[14px] font-bold text-red-400'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10'>
                  <X size={14} />
                </div>
                {error}
              </div>
            ) : null}

            {success ? (
              <div className='mb-8 flex items-center gap-3 rounded-[16px] border border-green-500/20 bg-green-500/5 px-5 py-4 text-[14px] font-bold text-green-400'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10'>
                  <ShieldCheck size={14} />
                </div>
                {success}
              </div>
            ) : null}

            {editFocusMessage ? (
              <div className='mb-8 flex items-center gap-3 rounded-[16px] border border-blue-500/20 bg-blue-500/5 px-5 py-4 text-[14px] font-bold text-blue-400'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10'>
                  <Info size={14} />
                </div>
                {editFocusMessage}
              </div>
            ) : null}

            {active === 'visitors' ? (
              <div className='mt-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                {/* Rules Section */}
                <div className='space-y-6'>
                  <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className='text-[15px] font-bold text-gray-900'>Rules & Etiquette</h4>
                        <p className='text-[12px] text-gray-400'>Define social and religious conduct</p>
                      </div>
                    </div>
                    <button type='button' onClick={() => showForm('visitorsRule')} className={actionButtonClass}>
                      <Plus size={16} className='mr-2' />
                      New Rule
                    </button>
                  </div>
                  
                  {openForms.visitorsRule ? (
                    <div ref={visitorRuleFormRef} className={getPanelClass('visitors-rule-form')}>
                      <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Rule Text
                        <textarea
                          value={visitorDrafts.rule}
                          onChange={(event) =>
                            setVisitorDrafts((prev) => ({ ...prev, rule: event.target.value }))
                          }
                          className={textareaClass}
                          placeholder='e.g. Please remove shoes...'
                        />
                      </label>
                      <div className='mt-6 flex gap-3 justify-end'>
                        <button type='button' onClick={() => hideForm('visitorsRule')} className={actionButtonClass}>Cancel</button>
                        <button
                          type='button'
                          onClick={() => upsertVisitorsText('rules', 'rule', 'rule')}
                          className={primaryButtonClass}
                        >
                          <Save size={14} className='mr-1.5' />
                          Save Rule
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <DataTable
                    title='Current Conduct Policy'
                    rows={visitorsForm.rules}
                    columns={[{ key: 'text', label: 'Registered Rule' }]}
                    emptyMessage='No community rules defined.'
                    onEdit={(index) => startEdit('visitors-rule', index, visitorsForm.rules[index])}
                    onDelete={(index) =>
                      removeVisitorsRow('rules', index, 'rule', { key: 'rule', value: '' })
                    }
                  />
                </div>


                {/* Schedules Section */}
                <div className='space-y-6 pt-10 border-t border-gray-100'>
                   <div className='flex items-center gap-4 mb-4'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-orange-500/5 border border-orange-500/10 text-orange-500'>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className='text-[15px] font-bold text-gray-900'>Visitor Timings</h4>
                      <p className='text-[12px] text-gray-400'>Manage daily and special kitchen schedules</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Daily Logic */}
                    <div className='space-y-5'>
                      <div className='flex justify-between items-center'>
                        <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Daily Darshan</h5>
                        <button type='button' onClick={() => showForm('visitorsDaily')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5'>
                          <Plus size={12} /> Add Slot
                        </button>
                      </div>
                      
                      {openForms.visitorsDaily ? (
                      <div ref={visitorDailyFormRef} className={getPanelClass('visitors-daily-form')}>
                        <div className='grid grid-cols-1 gap-4'>
                          <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Activity Label
                            <input
                              value={visitorDrafts.daily.label}
                              onChange={(event) =>
                                setVisitorDrafts((prev) => ({
                                  ...prev,
                                  daily: { ...prev.daily, label: event.target.value },
                                }))
                              }
                              className={inputClass}
                            />
                          </label>
                          <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Time Range
                            <input
                              value={visitorDrafts.daily.value}
                              onChange={(event) =>
                                setVisitorDrafts((prev) => ({
                                  ...prev,
                                  daily: { ...prev.daily, value: event.target.value },
                                }))
                              }
                              className={inputClass}
                            />
                          </label>
                        </div>
                        <div className='mt-4 flex gap-2 justify-end'>
                          <button type='button' onClick={() => hideForm('visitorsDaily')} className={actionButtonClass}>Cancel</button>
                          <button
                            type='button'
                            onClick={() => upsertVisitorsPair('daily', 'daily', 'daily')}
                            className={primaryButtonClass}
                          >
                            <Save size={14} className='mr-1.5' />
                            Save
                          </button>
                        </div>
                      </div>
                      ) : null}

                      <DataTable
                        title=''
                        rows={visitorsForm.daily}
                        columns={[
                          { key: 'label', label: 'Activity' },
                          { key: 'value', label: 'Time' },
                        ]}
                        emptyMessage='No daily times set.'
                        onEdit={(index) => startEdit('visitors-daily', index, visitorsForm.daily[index])}
                        onDelete={(index) =>
                          removeVisitorsRow('daily', index, 'daily', { key: 'daily', value: emptyPair })
                        }
                      />
                    </div>

                    {/* Langar Logic */}
                    <div className='space-y-5'>
                      <div className='flex justify-between items-center'>
                        <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Langar (Kitchen)</h5>
                        <button type='button' onClick={() => showForm('visitorsLangar')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5'>
                          <Plus size={12} /> Add Slot
                        </button>
                      </div>

                      {openForms.visitorsLangar ? (
                      <div ref={visitorLangarFormRef} className={getPanelClass('visitors-langar-form')}>
                         <div className='grid grid-cols-1 gap-4'>
                          <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Meal Type
                            <input
                              value={visitorDrafts.langar.label}
                              onChange={(event) =>
                                setVisitorDrafts((prev) => ({
                                  ...prev,
                                  langar: { ...prev.langar, label: event.target.value },
                                }))
                              }
                              className={inputClass}
                            />
                          </label>
                          <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Serving Hours
                            <input
                              value={visitorDrafts.langar.value}
                              onChange={(event) =>
                                setVisitorDrafts((prev) => ({
                                  ...prev,
                                  langar: { ...prev.langar, value: event.target.value },
                                }))
                              }
                              className={inputClass}
                            />
                          </label>
                        </div>
                        <div className='mt-4 flex gap-2 justify-end'>
                          <button type='button' onClick={() => hideForm('visitorsLangar')} className={actionButtonClass}>Cancel</button>
                          <button
                            type='button'
                            onClick={() => upsertVisitorsPair('langar', 'langar', 'langar')}
                            className={primaryButtonClass}
                          >
                            <Save size={14} className='mr-1.5' />
                            Save
                          </button>
                        </div>
                      </div>
                      ) : null}

                      <DataTable
                        title=''
                        rows={visitorsForm.langar}
                        columns={[
                          { key: 'label', label: 'Meal' },
                          { key: 'value', label: 'Hours' },
                        ]}
                        emptyMessage='No kitchen times set.'
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
                  </div>

                  <div className='mt-6'>
                    <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2'>
                        Sunday Special Program
                    </label>
                    <textarea
                      value={visitorsForm.sundaySpecial}
                      onChange={(event) =>
                        setVisitorsForm((prev) => ({ ...prev, sundaySpecial: event.target.value }))
                      }
                      className={textareaClass}
                      placeholder='Weekly Kirtan Darbar details...'
                    />
                  </div>
                </div>

                {/* Location & Access Section */}
                <div className='space-y-10 pt-10 border-t border-gray-100'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Address Lines */}
                    <div className='space-y-5'>
                      <div className='flex justify-between items-center'>
                        <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Address Registry</h5>
                        <button type='button' onClick={() => showForm('visitorsAddress')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5 font-bold uppercase tracking-widest'>
                          <Plus size={12} /> Add Line
                        </button>
                      </div>

                      {openForms.visitorsAddress ? (
                      <div ref={visitorAddressFormRef} className={getPanelClass('visitors-address-form')}>
                        <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                          Physical Line
                          <input
                            value={visitorDrafts.address}
                            onChange={(event) =>
                              setVisitorDrafts((prev) => ({ ...prev, address: event.target.value }))
                            }
                            className={inputClass}
                            placeholder='e.g. Alt Biesdorf 71'
                          />
                        </label>
                        <div className='mt-4 flex gap-2 justify-end'>
                          <button type='button' onClick={() => hideForm('visitorsAddress')} className={actionButtonClass}>Cancel</button>
                          <button
                            type='button'
                            onClick={() => upsertVisitorsText('address', 'address', 'address')}
                            className={primaryButtonClass}
                          >
                             <Save size={14} className='mr-1.5' />
                            Save
                          </button>
                        </div>
                      </div>
                      ) : null}

                      <DataTable
                        title=''
                        rows={visitorsForm.address}
                        columns={[{ key: 'text', label: 'Registered Line' }]}
                        emptyMessage='No address lines.'
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

                    {/* How to reach */}
                    <div className='space-y-5'>
                       <div className='flex justify-between items-center'>
                        <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Route Instructions</h5>
                        <button type='button' onClick={() => showForm('visitorsReach')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5 font-bold uppercase tracking-widest'>
                          <Plus size={12} /> Add Rule
                        </button>
                      </div>

                      {openForms.visitorsReach ? (
                      <div ref={visitorReachFormRef} className={getPanelClass('visitors-reach-form')}>
                        <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                          Instruction
                          <input
                            value={visitorDrafts.reach}
                            onChange={(event) =>
                              setVisitorDrafts((prev) => ({ ...prev, reach: event.target.value }))
                            }
                            className={inputClass}
                            placeholder='U-Bahn: U8 Pankstraße'
                          />
                        </label>
                        <div className='mt-4 flex gap-2 justify-end'>
                          <button type='button' onClick={() => hideForm('visitorsReach')} className={actionButtonClass}>Cancel</button>
                          <button
                            type='button'
                            onClick={() => upsertVisitorsText('reach', 'reach', 'reach')}
                            className={primaryButtonClass}
                          >
                             <Save size={14} className='mr-1.5' />
                            Save
                          </button>
                        </div>
                      </div>
                      ) : null}

                      <DataTable
                        title=''
                        rows={visitorsForm.reach}
                        columns={[{ key: 'text', label: 'Instruction' }]}
                        emptyMessage='No route info set.'
                        onEdit={(index) =>
                          startEdit('visitors-reach', index, visitorsForm.reach[index])
                        }
                        onDelete={(index) =>
                          removeVisitorsRow('reach', index, 'reach', {
                            key: 'reach',
                            value: '',
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}            {active === 'events' ? (
              <div className='mt-10 space-y-10'>
                <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
                   <div className='flex items-center gap-4'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className='text-[15px] font-bold text-gray-900'>Scheduled Events</h4>
                      <p className='text-[12px] text-gray-400'>Create and organize congregational activities</p>
                    </div>
                  </div>
                  <button type='button' onClick={() => showForm('events')} className={actionButtonClass}>
                    <Plus size={16} className='mr-2' />
                    New Event
                  </button>
                </div>

                {openForms.events ? (
                <div ref={eventFormRef} className={`${getPanelClass('events-form')} !p-0 shadow-xl border-gray-100`}>
                  <div className='bg-gray-50 border-b border-gray-100 p-8 rounded-t-[24px]'>
                    <h3 className='text-[20px] font-black text-gray-900 tracking-tight'>Configure Event</h3>
                    <p className='text-[13px] text-gray-400 font-medium'>Populate the details for your new event entry</p>
                  </div>
                  
                  <div className='p-8 space-y-8'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Event Title
                        <input
                          value={eventDraft.title}
                          onChange={(event) =>
                            setEventDraft((prev) => ({ ...prev, title: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='e.g. Vaisakhi Celebration 2026'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Scheduled Date
                        <input
                          value={eventDraft.date}
                          onChange={(event) =>
                            setEventDraft((prev) => ({ ...prev, date: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='April 14, 2026'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Timing
                        <input
                          value={eventDraft.time}
                          onChange={(event) =>
                            setEventDraft((prev) => ({ ...prev, time: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='9:00 AM - 6:00 PM'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Specific Location
                        <input
                          value={eventDraft.location}
                          onChange={(event) =>
                            setEventDraft((prev) => ({ ...prev, location: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Gurdwara Main Hall'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Event Category
                        <select
                          value={eventDraft.category}
                          onChange={(event) =>
                            setEventDraft((prev) => ({ ...prev, category: event.target.value }))
                          }
                          className={inputClass}
                        >
                          {EVENT_CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className='space-y-3'>
                        <span className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>Cover Image</span>
                        <div className='flex items-center gap-3'>
                           <label className='flex-1 flex h-11 items-center justify-center rounded-[12px] border border-gray-100 bg-gray-50 px-4 text-[14px] text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-all'>
                            <ImageIcon size={16} className='mr-2 font-bold' />
                            {eventImageFile ? eventImageFile.name : 'Choose local file'}
                            <input
                              type='file'
                              accept='image/*'
                              onChange={(event) => setEventImageFile(event.target.files?.[0] ?? null)}
                              className='hidden'
                            />
                          </label>
                          <button
                            type='button'
                            onClick={uploadEventImage}
                            disabled={isUploadingEventImage || !eventImageFile}
                            className={actionButtonClass}
                          >
                            {isUploadingEventImage ? 'Uploading...' : 'Upload'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {eventDraft.image && (
                      <div className='relative rounded-[16px] overflow-hidden border border-gray-100 group'>
                        <img src={eventDraft.image} alt='Event preview' className='h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105' />
                        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent' />
                        <button
                          type='button'
                          onClick={() => setEventDraft((prev) => ({ ...prev, image: '' }))}
                          className='absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-red-500/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}

                    <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                      Full Description
                      <textarea
                        value={eventDraft.description}
                        onChange={(event) =>
                          setEventDraft((prev) => ({ ...prev, description: event.target.value }))
                        }
                        className={textareaClass}
                        placeholder='Elaborate on the significance and itinerary of the event...'
                      />
                    </label>

                    <div className='flex justify-end gap-3 pt-4'>
                       <button
                        type='button'
                        onClick={() => hideForm('events')}
                        className={actionButtonClass}
                      >
                        Discard
                      </button>
                      {editingEventIndex !== null && (
                        <button
                          type='button'
                          onClick={() => {
                            setEditingEventIndex(null)
                            setEventDraft(emptyEvent)
                          }}
                          className={actionButtonClass}
                        >
                          Cancel Modification
                        </button>
                      )}
                      <button
                        type='button'
                        onClick={upsertEvent}
                        className={primaryButtonClass}
                      >
                        <Plus size={16} className='mr-2' />
                        {editingEventIndex === null ? 'Create Event' : 'Update Event'}
                      </button>
                    </div>
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
              <div className='mt-10 space-y-12'>
                {/* Media Cards Section */}
                <div className='space-y-6'>
                  <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <h4 className='text-[15px] font-bold text-gray-900'>Interactive Media Cards</h4>
                        <p className='text-[12px] text-gray-400'>Manage the quick-access media categories</p>
                      </div>
                    </div>
                    <button type='button' onClick={() => showForm('mediaCards')} className={actionButtonClass}>
                      <Plus size={16} className='mr-2' />
                      New Card
                    </button>
                  </div>

                  {openForms.mediaCards ? (
                  <div ref={mediaCardFormRef} className={getPanelClass('media-card-form')}>
                    <div className='flex items-center gap-3 mb-8'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                        <LayoutDashboard size={20} />
                      </div>
                      <h3 className='text-[18px] font-black text-gray-900 tracking-tight'>Card Configuration</h3>
                    </div>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Component ID
                        <input
                          value={mediaCardDraft.id}
                          onChange={(event) =>
                            setMediaCardDraft((prev) => ({ ...prev, id: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='e.g. photo-gallery'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Primary Title
                        <input
                          value={mediaCardDraft.title}
                          onChange={(event) =>
                            setMediaCardDraft((prev) => ({ ...prev, title: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Photo Gallery'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1 md:col-span-2'>
                        Action Button Label
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
                    <label className='mt-6 block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                      Contextual Description
                      <textarea
                        value={mediaCardDraft.description}
                        onChange={(event) =>
                          setMediaCardDraft((prev) => ({
                            ...prev,
                            description: event.target.value,
                          }))
                        }
                        className={textareaClass}
                        placeholder='Describe what users will find here...'
                      />
                    </label>

                    <div className='mt-8 pt-6 border-t border-white/5 flex gap-3 justify-end'>
                      <button type='button' onClick={() => hideForm('mediaCards')} className={actionButtonClass}>Discard</button>
                      <button
                        type='button'
                        onClick={upsertMediaCard}
                        className={primaryButtonClass}
                      >
                        {editingMediaCardIndex === null ? 'Create Card' : 'Update Card'}
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Available Media Categories'
                    rows={mediaCardsRows}
                    columns={[
                      { key: 'id', label: 'ID' },
                      { key: 'title', label: 'Title' },
                      { key: 'buttonLabel', label: 'Action Button' },
                    ]}
                    emptyMessage='No media categories defined.'
                    onEdit={(index) => startEdit('media-cards', index, mediaCardsRows[index])}
                    onDelete={(index) => {
                      setMediaCardsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                    }}
                  />
                </div>

                {/* Media Updates Section */}
                <div className='space-y-6 pt-10 border-t border-gray-100'>
                  <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <h4 className='text-[15px] font-bold text-gray-900'>System Updates</h4>
                        <p className='text-[12px] text-gray-400'>Push new content notifications</p>
                      </div>
                    </div>
                    <button type='button' onClick={() => showForm('mediaUpdates')} className={actionButtonClass}>
                      <Plus size={16} className='mr-2' />
                      New Update
                    </button>
                  </div>

                  {openForms.mediaUpdates ? (
                  <div ref={mediaUpdateFormRef} className={getPanelClass('media-update-form')}>
                    <div className='flex items-center gap-3 mb-8'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                        <PlusCircle size={20} />
                      </div>
                      <h3 className='text-[18px] font-black text-gray-900 tracking-tight'>Update Configuration</h3>
                    </div>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Headline
                        <input
                          value={mediaUpdateDraft.title}
                          onChange={(event) =>
                            setMediaUpdateDraft((prev) => ({ ...prev, title: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Vaisakhi 2026 Photo Album'
                        />
                      </label>
                      <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        CTA Label
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
                    <label className='mt-6 block text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Short Description
                      <textarea
                        value={mediaUpdateDraft.description}
                        onChange={(event) =>
                          setMediaUpdateDraft((prev) => ({
                            ...prev,
                            description: event.target.value,
                          }))
                        }
                        className={textareaClass}
                        placeholder='Catchy context for the update...'
                      />
                    </label>

                    <div className='mt-8 pt-6 border-t border-white/5 flex gap-3 justify-end'>
                      <button type='button' onClick={() => hideForm('mediaUpdates')} className={actionButtonClass}>Discard</button>
                      <button
                        type='button'
                        onClick={upsertMediaUpdate}
                        className={primaryButtonClass}
                      >
                        {editingMediaUpdateIndex === null ? 'Publish Update' : 'Synchronize Update'}
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Recent Media Feed'
                    rows={mediaUpdatesRows}
                    columns={[
                      { key: 'title', label: 'Headline' },
                      { key: 'action', label: 'Call to Action' },
                      {
                        key: 'description',
                        label: 'Context',
                        render: (row) => row.description || '<span className="text-white/20">Empty</span>',
                      },
                    ]}
                    emptyMessage='No system updates found.'
                    onEdit={(index) => startEdit('media-updates', index, mediaUpdatesRows[index])}
                    onDelete={(index) => {
                      setMediaUpdatesRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                    }}
                  />
                </div>
              </div>
            ) : null}            {active === 'contact' ? (
              <div className='mt-10 space-y-10'>
                <div className={panelClass}>
                   <div className='flex items-center gap-4 mb-8 pb-6 border-b border-gray-100'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className='text-[18px] font-bold text-gray-900 tracking-tight'>Direct Communications</h3>
                      <p className='text-[12px] text-gray-400'>Update primary reachable contact channels</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                      Public Phone Number
                      <input
                        value={contactForm.phone}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, phone: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='+49 (0) 123 456789'
                      />
                    </label>

                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Official Support Email
                      <input
                        value={contactForm.email}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='contact@gurdwara-berlin.de'
                      />
                    </label>
                  </div>
                </div>

                <div className='space-y-6 pt-10 border-t border-gray-100'>
                  <div className='flex justify-between items-center bg-gray-50 p-4 rounded-[18px] border border-gray-100'>
                    <div>
                      <h4 className='text-[14px] font-bold text-gray-900'>Regional Office Address</h4>
                      <p className='text-[12px] text-gray-400'>Manage display address lines</p>
                    </div>
                    <button type='button' onClick={() => showForm('contactAddress')} className={actionButtonClass}>
                      <Plus size={16} className='mr-2' />
                      Add Line
                    </button>
                  </div>

                  {openForms.contactAddress ? (
                  <div ref={contactAddressFormRef} className={getPanelClass('contact-address-form')}>
                    <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                      Physical Address Line
                      <input
                        value={contactAddressDraft}
                        onChange={(event) => setContactAddressDraft(event.target.value)}
                        className={inputClass}
                        placeholder='12683 Berlin'
                      />
                    </label>
                    <div className='mt-6 flex gap-3 justify-end'>
                      <button type='button' onClick={() => hideForm('contactAddress')} className={actionButtonClass}>Discard</button>
                      <button
                        type='button'
                        onClick={upsertContactAddress}
                        className={primaryButtonClass}
                      >
                         <Save size={16} className='mr-2' />
                        {editingContactAddressIndex === null ? 'Add Address' : 'Update Address'}
                      </button>
                    </div>
                  </div>
                  ) : null}

                  <DataTable
                    title='Contact Address Repository'
                    rows={contactForm.address}
                    columns={[{ key: 'text', label: 'Registered Line' }]}
                    emptyMessage='No contact address lines defined.'
                    onEdit={(index) =>
                      startEdit('contact-address', index, contactForm.address[index])
                    }
                    onDelete={(index) => {
                      setContactForm((prev) => ({
                        ...prev,
                        address: prev.address.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }}
                  />
                </div>
              </div>
            ) : null}

            {active === 'about-us' ? (
              <div className='mt-10 space-y-8'>
                <div className={panelClass}>
                  <h3 className='text-[18px] font-bold text-gray-900 tracking-tight'>About Pages Overview</h3>
                  <p className='mt-1 text-[12px] text-gray-500'>Update core headings and media. Use tables below for item-level edits.</p>
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <input
                      value={aboutUsForm.history.heroTitle}
                      onChange={(event) => updateAboutUsText('history', 'heroTitle', event.target.value)}
                      className={inputClass}
                      placeholder='History hero title'
                    />
                    <input
                      value={aboutUsForm.history.heroSubtitle}
                      onChange={(event) => updateAboutUsText('history', 'heroSubtitle', event.target.value)}
                      className={inputClass}
                      placeholder='History hero subtitle'
                    />
                    <input
                      value={aboutUsForm.mission.heroTitle}
                      onChange={(event) => updateAboutUsText('mission', 'heroTitle', event.target.value)}
                      className={inputClass}
                      placeholder='Mission hero title'
                    />
                    <input
                      value={aboutUsForm.committee.heroTitle}
                      onChange={(event) => updateAboutUsText('committee', 'heroTitle', event.target.value)}
                      className={inputClass}
                      placeholder='Committee hero title'
                    />
                    <input
                      value={aboutUsForm.governance.heroTitle}
                      onChange={(event) => updateAboutUsText('governance', 'heroTitle', event.target.value)}
                      className={inputClass}
                      placeholder='Governance hero title'
                    />
                    <input
                      value={aboutUsForm.governance.heroSubtitle}
                      onChange={(event) => updateAboutUsText('governance', 'heroSubtitle', event.target.value)}
                      className={inputClass}
                      placeholder='Governance hero subtitle'
                    />
                  </div>
                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      onClick={() => void saveAboutUsSection('about-headings', 'About page headings')}
                      disabled={updateMutation.isPending}
                      className={primaryButtonClass}
                    >
                      <Save size={14} className='mr-1.5' />
                      {updateMutation.isPending && aboutUsSavingSection === 'about-headings' ? 'Saving...' : 'Save & Publish'}
                    </button>
                  </div>
                </div>

                <div className={panelClass}>
                  <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>Hero Images</h3>
                  <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div>
                      <input
                        value={aboutUsForm.history.heroImage}
                        onChange={(event) => updateAboutUsText('history', 'heroImage', event.target.value)}
                        className={inputClass}
                        placeholder='History image URL'
                      />
                      <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
                        Upload
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (!file) return
                            void uploadAboutImage(file, (url) => updateAboutUsText('history', 'heroImage', url), 'History image uploaded.')
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <input
                        value={aboutUsForm.mission.heroImage}
                        onChange={(event) => updateAboutUsText('mission', 'heroImage', event.target.value)}
                        className={inputClass}
                        placeholder='Mission image URL'
                      />
                      <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
                        Upload
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (!file) return
                            void uploadAboutImage(file, (url) => updateAboutUsText('mission', 'heroImage', url), 'Mission image uploaded.')
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <input
                        value={aboutUsForm.governance.heroImage}
                        onChange={(event) => updateAboutUsText('governance', 'heroImage', event.target.value)}
                        className={inputClass}
                        placeholder='Governance image URL'
                      />
                      <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
                        Upload
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (!file) return
                            void uploadAboutImage(file, (url) => updateAboutUsText('governance', 'heroImage', url), 'Governance image uploaded.')
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  {isUploadingAboutImage ? <p className='mt-2 text-[12px] text-gray-500'>Uploading...</p> : null}
                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      onClick={() => void saveAboutUsSection('about-images', 'About page images')}
                      disabled={updateMutation.isPending}
                      className={primaryButtonClass}
                    >
                      <Save size={14} className='mr-1.5' />
                      {updateMutation.isPending && aboutUsSavingSection === 'about-images' ? 'Saving...' : 'Save & Publish'}
                    </button>
                  </div>
                </div>

                <DataTable
                  title='History Sections'
                  rows={aboutUsForm.history.sections}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'body', label: 'Body' },
                  ]}
                  emptyMessage='No history sections yet.'
                  onEdit={(index) => startEdit('about-history-section', index, aboutUsForm.history.sections[index])}
                  onDelete={(index) =>
                    removeAboutUsArrayItem('history', 'sections', index, { title: '', body: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-history-section', -1, { title: '', body: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add History Section
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('history-sections', 'History sections')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'history-sections' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Mission Cards'
                  rows={aboutUsForm.mission.cards}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description' },
                    { key: 'accent', label: 'Accent' },
                  ]}
                  emptyMessage='No mission cards yet.'
                  onEdit={(index) => startEdit('about-mission-card', index, aboutUsForm.mission.cards[index])}
                  onDelete={(index) =>
                    removeAboutUsArrayItem('mission', 'cards', index, { title: '', description: '', accent: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-mission-card', -1, { title: '', description: '', accent: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Mission Card
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('mission-cards', 'Mission cards')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'mission-cards' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Mission Core Values'
                  rows={aboutUsForm.mission.coreValues}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description' },
                  ]}
                  emptyMessage='No core values yet.'
                  onEdit={(index) => startEdit('about-mission-value', index, aboutUsForm.mission.coreValues[index])}
                  onDelete={(index) =>
                    removeAboutUsArrayItem('mission', 'coreValues', index, { title: '', description: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-mission-value', -1, { title: '', description: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Core Value
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('mission-core-values', 'Mission core values')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'mission-core-values' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Committee Members'
                  rows={aboutUsForm.committee.members}
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'role', label: 'Role' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'image', label: 'Image URL' },
                  ]}
                  emptyMessage='No members yet.'
                  onEdit={(index) => startEdit('about-committee-member', index, aboutUsForm.committee.members[index])}
                  onDelete={(index) =>
                    removeAboutUsArrayItem('committee', 'members', index, {
                      initials: '',
                      name: '',
                      role: '',
                      email: '',
                      phone: '',
                      image: '',
                    })
                  }
                />
                <button
                  type='button'
                  onClick={() =>
                    startEdit('about-committee-member', -1, {
                      initials: '',
                      name: '',
                      role: '',
                      email: '',
                      phone: '',
                      image: '',
                    })
                  }
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Member
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('committee-members', 'Committee members')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'committee-members' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Governance Structure Blocks'
                  rows={aboutUsForm.governance.structureBlocks}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'body', label: 'Body' },
                  ]}
                  emptyMessage='No structure blocks yet.'
                  onEdit={(index) =>
                    startEdit('about-governance-structure', index, aboutUsForm.governance.structureBlocks[index])
                  }
                  onDelete={(index) =>
                    removeAboutUsArrayItem('governance', 'structureBlocks', index, { title: '', body: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-governance-structure', -1, { title: '', body: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Structure Block
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('governance-structure', 'Governance structure')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'governance-structure' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Governance Documents'
                  rows={aboutUsForm.governance.documents}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'size', label: 'Size' },
                    { key: 'accent', label: 'Accent' },
                  ]}
                  emptyMessage='No documents yet.'
                  onEdit={(index) =>
                    startEdit('about-governance-document', index, aboutUsForm.governance.documents[index])
                  }
                  onDelete={(index) =>
                    removeAboutUsArrayItem('governance', 'documents', index, { title: '', size: '', accent: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-governance-document', -1, { title: '', size: '', accent: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Document
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('governance-documents', 'Governance documents')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'governance-documents' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>

                <DataTable
                  title='Governance Reports'
                  rows={aboutUsForm.governance.reports}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'size', label: 'Size' },
                  ]}
                  emptyMessage='No reports yet.'
                  onEdit={(index) => startEdit('about-governance-report', index, aboutUsForm.governance.reports[index])}
                  onDelete={(index) =>
                    removeAboutUsArrayItem('governance', 'reports', index, { title: '', size: '' })
                  }
                />
                <button
                  type='button'
                  onClick={() => startEdit('about-governance-report', -1, { title: '', size: '' })}
                  className={actionButtonClass}
                >
                  <Plus size={14} className='mr-1.5' /> Add Report
                </button>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => void saveAboutUsSection('governance-reports', 'Governance reports')}
                    disabled={updateMutation.isPending}
                    className={primaryButtonClass}
                  >
                    <Save size={14} className='mr-1.5' />
                    {updateMutation.isPending && aboutUsSavingSection === 'governance-reports' ? 'Saving...' : 'Save & Publish'}
                  </button>
                </div>
              </div>
            ) : null}
            {active === 'profile' ? (
              <div className='mt-10 space-y-8'>
                <div className={panelClass}>
                  <div className='flex items-center gap-4 mb-8 pb-6 border-b border-white/5'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/5 border border-white/10 text-white'>
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className='text-[18px] font-bold text-white tracking-tight'>My Profile</h3>
                      <p className='text-[12px] text-white/40'>Manage your personal account credentials</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1 md:col-span-2'>
                      Login Email
                      <input
                        type='email'
                        value={profileForm.email}
                        readOnly
                        className={`${inputClass} opacity-50 cursor-not-allowed`}
                        placeholder='you@example.com'
                      />
                    </label>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      New Password
                      <input
                        type='password'
                        value={profileForm.password}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Min 8 characters'
                      />
                    </label>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Confirm New Password
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
                  <div className='mt-8 pt-6 border-t border-white/5 flex justify-end'>
                    <button
                      type='button'
                      onClick={handleProfileUpdate}
                      disabled={isProfileSaving}
                      className={primaryButtonClass}
                    >
                      <Save size={16} className='mr-2' />
                      {isProfileSaving ? 'Updating...' : 'Save Profile Changes'}
                    </button>
                  </div>
                </div>

                <div className={panelClass}>
                  <div className='flex items-center gap-4 mb-8 pb-6 border-b border-white/5'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/5 border border-white/10 text-white'>
                      <PlusCircle size={24} />
                    </div>
                    <div>
                      <h3 className='text-[18px] font-bold text-white tracking-tight'>System Users</h3>
                      <p className='text-[12px] text-white/40'>Grant administrative access to others</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Name
                      <input
                        value={newUserForm.name}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Full Name'
                      />
                    </label>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Access Level
                      <select
                        value={newUserForm.role}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, role: event.target.value }))
                        }
                        className={inputClass}
                      >
                        <option value='user' className='bg-[#0a0a0b]'>User</option>
                        <option value='admin' className='bg-[#0a0a0b]'>Admin</option>
                      </select>
                    </label>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Email Address
                      <input
                        type='email'
                        value={newUserForm.email}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='email@example.com'
                      />
                    </label>
                    <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                      Initial Password
                      <input
                        type='password'
                        value={newUserForm.password}
                        onChange={(event) =>
                          setNewUserForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Min 8 chars'
                      />
                    </label>
                  </div>
                  <div className='mt-8 pt-6 border-t border-white/5 flex justify-end'>
                    <button
                      type='button'
                      onClick={handleCreateUser}
                      disabled={isCreatingUser}
                      className={primaryButtonClass}
                    >
                      <Plus size={16} className='mr-2' />
                      {isCreatingUser ? 'Creating...' : 'Register New User'}
                    </button>
                  </div>
                </div>

                <div className='mt-8'>
                  <DataTable
                    title='Current Administrators'
                    rows={users}
                    columns={[
                      { key: 'name', label: 'Name' },
                      { key: 'email', label: 'Email Address' },
                      { 
                        key: 'role', 
                        label: 'Access Role',
                        render: (row) => (
                          <span className='inline-flex items-center rounded-full bg-[#001da5]/5 px-2.5 py-0.5 text-[11px] font-bold text-[#001da5] border border-[#001da5]/10'>
                            {row.role.toUpperCase()}
                          </span>
                        )
                      },
                    ]}
                    emptyMessage={usersLoading ? 'Synchronizing user database...' : 'No other administrators found.'}
                    showActions={false}
                  />
                </div>
              </div>
            ) : null}

            {editModal.open ? (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300'>
                <div className='flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_30px_100px_-15px_rgba(0,0,0,0.1)] animate-in zoom-in-95 duration-300'>
                  <div className='overflow-y-auto px-8 pb-8 pt-8'>
                    <div className='flex items-center gap-4 mb-8 pb-6 border-b border-gray-100'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                        <Edit2 size={24} />
                      </div>
                      <div>
                        <h3 className='text-[20px] font-bold text-gray-900 tracking-tight'>Update Entry</h3>
                        <p className='text-[13px] text-gray-400'>Synchronize these changes with the public website</p>
                      </div>
                      <button onClick={closeEditModal} className='ml-auto h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900'>
                        <X size={20} />
                      </button>
                    </div>

                    <div className='space-y-6'>
                    {['visitors-rule', 'visitors-address', 'visitors-reach', 'contact-address'].includes(
                      editModal.type,
                    ) ? (
                      <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                        Text Content
                        <textarea
                          value={editModal.data.text ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, text: event.target.value },
                            }))
                          }
                          className={textareaClass}
                          placeholder='Edit text content...'
                        />
                      </label>
                    ) : null}

                    {['visitors-daily', 'visitors-langar'].includes(editModal.type) ? (
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
                            placeholder='e.g. Morning Prayer'
                          />
                        </label>
                        <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                          Time Window
                          <input
                            value={editModal.data.value ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, value: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='e.g. 5:00 AM - 7:00 AM'
                          />
                        </label>
                      </div>
                    ) : null}

                    {editModal.type === 'events' ? (
                      <div className='space-y-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Event Title
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
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Event Date
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
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Start Time
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
                          </label>                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Event Location
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
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
                                <option key={category} value={category} className='bg-[#0a0a0b]'>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </label>
                          <div className='md:col-span-2 space-y-3'>
                            <span className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>Update Image Resources</span>
                            <div className='flex items-center gap-3'>
                              <label className='flex-1 flex h-11 items-center justify-center rounded-[12px] border border-white/5 bg-white/[0.03] px-4 text-[14px] text-white/40 cursor-pointer hover:bg-white/5 hover:text-white transition-all'>
                                <ImageIcon size={16} className='mr-2' />
                                {modalImageFile ? modalImageFile.name : 'Replace current image'}
                                <input
                                  type='file'
                                  accept='image/*'
                                  onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                                  className='hidden'
                                />
                              </label>
                            </div>
                            {editModal.data.image && (
                              <div className='relative mt-3 rounded-[16px] overflow-hidden border border-white/10 group h-[180px]'>
                                <img src={editModal.data.image} alt='Current' className='h-full w-full object-cover' />
                                <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                   <p className='text-[12px] font-bold'>Current Visual Resource</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <label className='block text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
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
                      <div className='space-y-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Component Identifier (ID)
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
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Display Title
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
                          <label className='md:col-span-2 text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                            Interactive Label (Button)
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
                        <label className='block text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                          Supporting Description
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
                      <div className='space-y-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Update Headline
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
                          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                            Call To Action
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
                        <label className='block text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
                          Brief Context
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

                    {editModal.type === 'about-history-section' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Section title'
                        />
                        <textarea
                          value={editModal.data.body ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, body: event.target.value },
                            }))
                          }
                          className={textareaClass}
                          placeholder='Section body'
                        />
                      </div>
                    ) : null}

                    {editModal.type === 'about-mission-card' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Card title'
                        />
                        <input
                          value={editModal.data.accent ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, accent: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Accent'
                        />
                        <textarea
                          value={editModal.data.description ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, description: event.target.value },
                            }))
                          }
                          className={textareaClass}
                          placeholder='Card description'
                        />
                      </div>
                    ) : null}

                    {editModal.type === 'about-mission-value' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Value title'
                        />
                        <textarea
                          value={editModal.data.description ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, description: event.target.value },
                            }))
                          }
                          className={textareaClass}
                          placeholder='Value description'
                        />
                      </div>
                    ) : null}

                    {editModal.type === 'about-committee-member' ? (
                      <div className='space-y-6'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <input
                            value={editModal.data.name ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, name: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Full name'
                          />
                          <input
                            value={editModal.data.role ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, role: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Role'
                          />
                          <input
                            value={editModal.data.email ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, email: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Email'
                          />
                          <input
                            value={editModal.data.phone ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, phone: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Phone'
                          />
                          <input
                            value={editModal.data.initials ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, initials: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Initials'
                          />
                          <input
                            value={editModal.data.image ?? ''}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, image: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='Image URL'
                          />
                        </div>
                        <label className='inline-flex h-10 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-4 text-[13px] font-semibold text-gray-700'>
                          Upload Member Photo
                          <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                          />
                        </label>
                        {editModal.data.image ? (
                          <img
                            src={editModal.data.image}
                            alt='Member'
                            className='h-[160px] w-[160px] rounded-[12px] object-cover'
                          />
                        ) : null}
                      </div>
                    ) : null}

                    {editModal.type === 'about-governance-structure' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Structure title'
                        />
                        <textarea
                          value={editModal.data.body ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, body: event.target.value },
                            }))
                          }
                          className={textareaClass}
                          placeholder='Structure body'
                        />
                      </div>
                    ) : null}

                    {editModal.type === 'about-governance-document' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Document title'
                        />
                        <input
                          value={editModal.data.size ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, size: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Size'
                        />
                        <input
                          value={editModal.data.accent ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, accent: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Accent'
                        />
                      </div>
                    ) : null}

                    {editModal.type === 'about-governance-report' ? (
                      <div className='space-y-6'>
                        <input
                          value={editModal.data.title ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, title: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Report title'
                        />
                        <input
                          value={editModal.data.size ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, size: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Report size'
                        />
                      </div>
                    ) : null}
                    </div>

                    <div className='mt-10 pt-8 border-t border-white/5 flex justify-end gap-3'>
                      <button
                        type='button'
                        onClick={closeEditModal}
                        className={actionButtonClass}
                      >
                        Cancel
                      </button>
                      <button
                        type='button'
                        onClick={handleModalSave}
                        disabled={isUploadingModalImage}
                        className={primaryButtonClass}
                      >
                         <Save size={16} className='mr-2' />
                         Commit Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {active !== 'profile' && active !== 'about-us' ? (
              <button
                type='button'
                onClick={onSave}
                disabled={updateMutation.isPending}
                className='mt-8 inline-flex h-11 items-center justify-center rounded-[10px] bg-black px-6 text-[14px] font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70'
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
