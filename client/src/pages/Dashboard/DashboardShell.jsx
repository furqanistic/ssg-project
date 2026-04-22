import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useSiteContentQuery,
  useUpdateContentSectionMutation,
} from '@/hooks/useContent'
import { uploadContentFile, uploadContentImage } from '@/services/contentApi'
import {
  createUserRequest,
  listUsersRequest,
  updateProfileRequest,
} from '@/services/authApi'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '../../components/ui/toast-system.jsx'
import DashboardAboutSection from '@/pages/Dashboard/sections/DashboardAboutSection'
import DashboardContactSection from '@/pages/Dashboard/sections/DashboardContactSection'
import DashboardEventsSection from '@/pages/Dashboard/sections/DashboardEventsSection'
import DashboardMediaSection from '@/pages/Dashboard/sections/DashboardMediaSection'
import DashboardProfileSection from '@/pages/Dashboard/sections/DashboardProfileSection'
import DashboardVisitorsSection from '@/pages/Dashboard/sections/DashboardVisitorsSection'
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
const EVENT_EDITOR_CATEGORIES = EVENT_CATEGORIES.filter((category) => category !== 'all')

const toTextRows = (items = []) => items.map((text) => ({ text }))
const toPairRows = (items = []) =>
  items.map((item) => ({ label: item?.label ?? '', value: item?.value ?? '' }))
const cleanTextRows = (rows = []) => rows.map((row) => row.text.trim()).filter(Boolean)
const cleanPairRows = (rows = []) =>
  rows
    .map((row) => ({ label: row.label.trim(), value: row.value.trim() }))
    .filter((row) => row.label || row.value)
const normalizeColorValue = (value, fallback = '#2d4f9f') => {
  const input = typeof value === 'string' ? value.trim() : ''
  if (!input) return fallback
  if (input.startsWith('#')) return input
  const match = input.match(/#(?:[0-9a-fA-F]{3,8})/)
  return match ? match[0] : fallback
}

const emptyEvent = {
  title: '',
  date: '',
  time: '',
  location: '',
  category: 'yearly',
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
    coreValuesTitle: '',
    cards: [{ title: '', description: '', accent: '#2d4f9f' }],
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
    documents: [{ title: '', size: '', accent: '#f6ab3c', fileUrl: '' }],
    reportsTitle: '',
    reports: [{ title: '', size: '', fileUrl: '' }],
    downloadCtaLabel: '',
    financialTitle: '',
    financialDescription: '',
    taxTitle: '',
    taxDescription: '',
  },
  navbar: {
    label: '',
    sections: [
      {
        heading: '',
        links: [
          { label: '', to: '/about-us/history' },
          { label: '', to: '/about-us/mission' },
        ],
      },
      {
        heading: '',
        links: [
          { label: '', to: '/about-us/committee' },
          { label: '', to: '/about-us/governance' },
        ],
      },
    ],
  },
}

const createAboutUsPayload = (sourceForm) => ({
  history: {
    heroTitle: sourceForm.history.heroTitle.trim(),
    heroSubtitle: sourceForm.history.heroSubtitle.trim(),
    heroImage: sourceForm.history.heroImage.trim(),
    sections: sourceForm.history.sections
      .map((item) => ({
        title: item.title.trim(),
        body: item.body.trim(),
      }))
      .filter((item) => item.title || item.body),
  },
  mission: {
    heroTitle: sourceForm.mission.heroTitle.trim(),
    heroDescription: sourceForm.mission.heroDescription.trim(),
    heroImage: sourceForm.mission.heroImage.trim(),
    coreValuesTitle: sourceForm.mission.coreValuesTitle.trim(),
    cards: sourceForm.mission.cards
      .map((item) => ({
        title: item.title.trim(),
        description: item.description.trim(),
        accent: normalizeColorValue(item.accent, '#2d4f9f'),
      }))
      .filter((item) => item.title || item.description || item.accent),
    coreValues: sourceForm.mission.coreValues
      .map((item) => ({
        title: item.title.trim(),
        description: item.description.trim(),
      }))
      .filter((item) => item.title || item.description),
  },
  committee: {
    heroTitle: sourceForm.committee.heroTitle.trim(),
    heroSubtitle: sourceForm.committee.heroSubtitle.trim(),
    intro: sourceForm.committee.intro.trim(),
    members: sourceForm.committee.members
      .map((item) => ({
        initials: item.initials.trim(),
        name: item.name.trim(),
        role: item.role.trim(),
        email: item.email.trim(),
        phone: item.phone.trim(),
        image: item.image.trim(),
      }))
      .filter((item) => item.initials || item.name || item.role || item.email || item.phone || item.image),
    ctaTitle: sourceForm.committee.ctaTitle.trim(),
    ctaDescription: sourceForm.committee.ctaDescription.trim(),
    ctaButtonLabel: sourceForm.committee.ctaButtonLabel.trim(),
  },
  governance: {
    heroTitle: sourceForm.governance.heroTitle.trim(),
    heroSubtitle: sourceForm.governance.heroSubtitle.trim(),
    heroImage: sourceForm.governance.heroImage.trim(),
    structureTitle: sourceForm.governance.structureTitle.trim(),
    structureIntro: sourceForm.governance.structureIntro.trim(),
    structureBlocks: sourceForm.governance.structureBlocks
      .map((item) => ({
        title: item.title.trim(),
        body: item.body.trim(),
      }))
      .filter((item) => item.title || item.body),
    documentsTitle: sourceForm.governance.documentsTitle.trim(),
    documents: sourceForm.governance.documents
      .map((item) => ({
        title: item.title.trim(),
        size: item.size.trim(),
        accent: normalizeColorValue(item.accent, '#f6ab3c'),
        fileUrl: (item.fileUrl ?? '').trim(),
      }))
      .filter((item) => item.title || item.size || item.accent || item.fileUrl),
    reportsTitle: sourceForm.governance.reportsTitle.trim(),
    reports: sourceForm.governance.reports
      .map((item) => ({
        title: item.title.trim(),
        size: item.size.trim(),
        fileUrl: (item.fileUrl ?? '').trim(),
      }))
      .filter((item) => item.title || item.size || item.fileUrl),
    downloadCtaLabel: sourceForm.governance.downloadCtaLabel.trim(),
    financialTitle: sourceForm.governance.financialTitle.trim(),
    financialDescription: sourceForm.governance.financialDescription.trim(),
    taxTitle: sourceForm.governance.taxTitle.trim(),
    taxDescription: sourceForm.governance.taxDescription.trim(),
  },
  navbar: {
    label: sourceForm.navbar.label.trim(),
    sections: sourceForm.navbar.sections
      .map((section) => ({
        heading: section.heading.trim(),
        links: (Array.isArray(section.links) ? section.links : [])
          .map((link) => ({
            label: (link.label ?? '').trim(),
            to: (link.to ?? '').trim(),
          }))
          .filter((link) => link.label || link.to),
      }))
      .filter((section) => section.heading || section.links.length > 0),
  },
})

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

const DashboardShell = ({ sectionKey = null }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const session = useAuthStore((state) => state.session)
  const setAuth = useAuthStore((state) => state.setAuth)
  const logout = useAuthStore((state) => state.logout)
  const toast = useToast()

  const initialTab = sectionKey ?? location.pathname.split('/')[2]
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
  const [aboutUsSavedSnapshot, setAboutUsSavedSnapshot] = useState('')
  const [aboutUsLastSavedAt, setAboutUsLastSavedAt] = useState(null)

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
  const [modalUploadProgress, setModalUploadProgress] = useState(0)
  const [isUploadingAboutImage, setIsUploadingAboutImage] = useState(false)
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
    setModalUploadProgress(0)
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
    const nextAboutUsForm = {
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
        coreValuesTitle: aboutUs.mission?.coreValuesTitle ?? '',
        cards:
          Array.isArray(aboutUs.mission?.cards) && aboutUs.mission.cards.length > 0
            ? aboutUs.mission.cards.map((item) => ({
                title: item?.title ?? '',
                description: item?.description ?? '',
                accent: normalizeColorValue(item?.accent, '#2d4f9f'),
              }))
            : [{ title: '', description: '', accent: '#2d4f9f' }],
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
                accent: normalizeColorValue(item?.accent, '#f6ab3c'),
                fileUrl: item?.fileUrl ?? '',
              }))
            : [{ title: '', size: '', accent: '#f6ab3c', fileUrl: '' }],
        reportsTitle: aboutUs.governance?.reportsTitle ?? '',
        reports:
          Array.isArray(aboutUs.governance?.reports) && aboutUs.governance.reports.length > 0
            ? aboutUs.governance.reports.map((item) => ({
                title: item?.title ?? '',
                size: item?.size ?? '',
                fileUrl: item?.fileUrl ?? '',
              }))
            : [{ title: '', size: '', fileUrl: '' }],
        downloadCtaLabel: aboutUs.governance?.downloadCtaLabel ?? '',
        financialTitle: aboutUs.governance?.financialTitle ?? '',
        financialDescription: aboutUs.governance?.financialDescription ?? '',
        taxTitle: aboutUs.governance?.taxTitle ?? '',
        taxDescription: aboutUs.governance?.taxDescription ?? '',
      },
      navbar: {
        label: aboutUs.navbar?.label ?? '',
        sections:
          Array.isArray(aboutUs.navbar?.sections) && aboutUs.navbar.sections.length > 0
            ? aboutUs.navbar.sections.map((section, sectionIndex) => {
                const defaultPathsBySection = [
                  ['/about-us/history', '/about-us/mission'],
                  ['/about-us/committee', '/about-us/governance'],
                ]
                const defaultPaths = defaultPathsBySection[sectionIndex] ?? []
                const existingLinks = Array.isArray(section?.links) ? section.links : []
                const requiredLength = Math.max(existingLinks.length, defaultPaths.length)
                const mappedLinks = Array.from({ length: requiredLength }).map((_, linkIndex) => ({
                  label: existingLinks[linkIndex]?.label ?? '',
                  to: existingLinks[linkIndex]?.to ?? defaultPaths[linkIndex] ?? '',
                }))

                return {
                  heading: section?.heading ?? '',
                  links: mappedLinks,
                }
              })
            : [
                {
                  heading: '',
                  links: [
                    { label: '', to: '/about-us/history' },
                    { label: '', to: '/about-us/mission' },
                  ],
                },
                {
                  heading: '',
                  links: [
                    { label: '', to: '/about-us/committee' },
                    { label: '', to: '/about-us/governance' },
                  ],
                },
              ],
      },
    }
    setAboutUsForm(nextAboutUsForm)
    setAboutUsSavedSnapshot(JSON.stringify(createAboutUsPayload(nextAboutUsForm)))
    setAboutUsLastSavedAt(new Date())

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
  const aboutUsDirty = useMemo(() => {
    if (active !== 'about-us') {
      return false
    }
    return JSON.stringify(createAboutUsPayload(aboutUsForm)) !== aboutUsSavedSnapshot
  }, [aboutUsForm, aboutUsSavedSnapshot, active])
  const aboutUsLastSavedLabel = useMemo(() => {
    if (!aboutUsLastSavedAt) {
      return 'Not saved yet'
    }
    return `Last saved at ${aboutUsLastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }, [aboutUsLastSavedAt])

  useEffect(() => {
    if (!sectionKey) {
      return
    }

    if (sectionKey !== active) {
      setActive(sectionKey)
      setError('')
      setSuccess('')
    }
  }, [active, sectionKey])

  useEffect(() => {
    if (sectionKey) {
      return
    }

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
  }, [active, location.pathname, navigate, sectionKey])

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

  const getPanelClass = () => panelClass

  useEffect(() => {
    if (!error) {
      return
    }

    toast.error(error)
    setError('')
  }, [error, toast])

  useEffect(() => {
    if (!success) {
      return
    }

    toast.success(success)
    setSuccess('')
  }, [success, toast])

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

  const saveEventsSection = async (rows, successMessage = 'Events saved successfully.') => {
    const cleanedRows = rows
      .map((row) => ({
        title: row.title.trim(),
        date: row.date.trim(),
        time: row.time.trim(),
        location: row.location.trim(),
        category: row.category.trim() || 'yearly',
        image: row.image.trim() || null,
        description: row.description.trim(),
      }))
      .filter(
        (row) =>
          row.title || row.date || row.time || row.location || row.description || row.image,
      )

    await updateMutation.mutateAsync({
      section: 'events',
      data: {
        items: cleanedRows,
      },
    })

    setEventsRows(cleanedRows)
    setSuccess(successMessage)
  }

  const upsertEvent = async () => {
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
      category: eventDraft.category.trim() || 'yearly',
      image: eventDraft.image.trim(),
      description: eventDraft.description.trim(),
    }

    try {
      const nextRows = replaceOrAppend(eventsRows, editingEventIndex, nextEvent)
      await saveEventsSection(
        nextRows,
        editingEventIndex === null ? 'Event added successfully.' : 'Event updated successfully.',
      )
      setEventDraft(emptyEvent)
      setEditingEventIndex(null)
      setEventImageFile(null)
      setOpenForms((prev) => ({ ...prev, events: false }))
    } catch (requestError) {
      setError(requestError.message)
    }
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

    setModalUploadProgress(0)
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

    if ((type === 'about-governance-document' || type === 'about-governance-report') && modalImageFile) {
      try {
        setIsUploadingModalImage(true)
        const uploaded = await uploadContentFile(
          modalImageFile,
          type === 'about-governance-document'
            ? 'aboutUs/governance-documents'
            : 'aboutUs/governance-reports',
          (percent) => setModalUploadProgress(percent),
        )
        setModalUploadProgress(100)
        nextData.fileUrl = uploaded.url || ''
        nextData.size = nextData.size || uploaded.size || ''
        nextData.title = nextData.title || uploaded.name || ''
      } catch (uploadError) {
        setError(uploadError.message || 'Failed to upload file.')
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

      const isAboutModalType = type.startsWith('about-')
      if (isAboutModalType) {
        const nextAboutUsForm = structuredClone(aboutUsForm)

        if (type === 'about-history-section') {
          nextAboutUsForm.history.sections =
            index < 0
              ? [...nextAboutUsForm.history.sections, { title: '', body: '', ...nextData }]
              : nextAboutUsForm.history.sections.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        }

        if (type === 'about-mission-card') {
          nextAboutUsForm.mission.cards =
            index < 0
              ? [...nextAboutUsForm.mission.cards, { title: '', description: '', accent: '#2d4f9f', ...nextData }]
              : nextAboutUsForm.mission.cards.map((row, i) =>
                  i === index ? { ...row, ...nextData, accent: normalizeColorValue(nextData.accent, '#2d4f9f') } : row,
                )
        }

        if (type === 'about-mission-value') {
          nextAboutUsForm.mission.coreValues =
            index < 0
              ? [...nextAboutUsForm.mission.coreValues, { title: '', description: '', ...nextData }]
              : nextAboutUsForm.mission.coreValues.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        }

        if (type === 'about-committee-member') {
          nextAboutUsForm.committee.members =
            index < 0
              ? [
                  ...nextAboutUsForm.committee.members,
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
              : nextAboutUsForm.committee.members.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        }

        if (type === 'about-governance-structure') {
          nextAboutUsForm.governance.structureBlocks =
            index < 0
              ? [...nextAboutUsForm.governance.structureBlocks, { title: '', body: '', ...nextData }]
              : nextAboutUsForm.governance.structureBlocks.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        }

        if (type === 'about-governance-document') {
          nextAboutUsForm.governance.documents =
            index < 0
              ? [...nextAboutUsForm.governance.documents, { title: '', size: '', accent: '#f6ab3c', fileUrl: '', ...nextData }]
              : nextAboutUsForm.governance.documents.map((row, i) =>
                  i === index ? { ...row, ...nextData, accent: normalizeColorValue(nextData.accent, '#f6ab3c') } : row,
                )
        }

        if (type === 'about-governance-report') {
          nextAboutUsForm.governance.reports =
            index < 0
              ? [...nextAboutUsForm.governance.reports, { title: '', size: '', fileUrl: '', ...nextData }]
              : nextAboutUsForm.governance.reports.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        }

        setAboutUsForm(nextAboutUsForm)
        await updateMutation.mutateAsync({
          section: 'aboutUs',
          data: buildAboutUsPayload(nextAboutUsForm),
        })
        setAboutUsSavedSnapshot(JSON.stringify(buildAboutUsPayload(nextAboutUsForm)))
        setAboutUsLastSavedAt(new Date())
      }

      closeEditModal()
      setSuccess('Changes saved successfully.')
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
          data: buildAboutUsPayload(),
        })
        setAboutUsSavedSnapshot(JSON.stringify(buildAboutUsPayload()))
        setAboutUsLastSavedAt(new Date())
      }

      setSuccess(`${sectionLabel} content saved successfully.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const buildAboutUsPayload = (sourceForm = aboutUsForm) => createAboutUsPayload(sourceForm)

  const saveAboutUsNonPopupSection = async (sectionLabel = 'About section') => {
    setError('')
    setSuccess('')

    try {
      await updateMutation.mutateAsync({
        section: 'aboutUs',
        data: buildAboutUsPayload(),
      })
      setAboutUsSavedSnapshot(JSON.stringify(buildAboutUsPayload()))
      setAboutUsLastSavedAt(new Date())
      setSuccess(`${sectionLabel} saved successfully.`)
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

            {active === 'visitors' ? (
              <DashboardVisitorsSection
                FileText={FileText}
                Clock={Clock}
                Plus={Plus}
                Save={Save}
                DataTable={DataTable}
                openForms={openForms}
                showForm={showForm}
                actionButtonClass={actionButtonClass}
                visitorRuleFormRef={visitorRuleFormRef}
                getPanelClass={getPanelClass}
                visitorDrafts={visitorDrafts}
                setVisitorDrafts={setVisitorDrafts}
                textareaClass={textareaClass}
                hideForm={hideForm}
                upsertVisitorsText={upsertVisitorsText}
                primaryButtonClass={primaryButtonClass}
                visitorsForm={visitorsForm}
                startEdit={startEdit}
                removeVisitorsRow={removeVisitorsRow}
                visitorDailyFormRef={visitorDailyFormRef}
                inputClass={inputClass}
                upsertVisitorsPair={upsertVisitorsPair}
                emptyPair={emptyPair}
                visitorLangarFormRef={visitorLangarFormRef}
                setVisitorsForm={setVisitorsForm}
                visitorAddressFormRef={visitorAddressFormRef}
                visitorReachFormRef={visitorReachFormRef}
              />
            ) : null}

            {active === 'events' ? (
              <DashboardEventsSection
                Calendar={Calendar}
                Plus={Plus}
                ImageIcon={ImageIcon}
                Trash2={Trash2}
                DataTable={DataTable}
                actionButtonClass={actionButtonClass}
                showForm={showForm}
                openForms={openForms}
                eventFormRef={eventFormRef}
                getPanelClass={getPanelClass}
                eventDraft={eventDraft}
                setEventDraft={setEventDraft}
                inputClass={inputClass}
                EVENT_CATEGORIES={EVENT_CATEGORIES}
                eventImageFile={eventImageFile}
                setEventImageFile={setEventImageFile}
                uploadEventImage={uploadEventImage}
                isUploadingEventImage={isUploadingEventImage}
                textareaClass={textareaClass}
                hideForm={hideForm}
                saveEventsSection={saveEventsSection}
                editingEventIndex={editingEventIndex}
                setEditingEventIndex={setEditingEventIndex}
                emptyEvent={emptyEvent}
                upsertEvent={upsertEvent}
                primaryButtonClass={primaryButtonClass}
                eventsRows={eventsRows}
                startEdit={startEdit}
              />
            ) : null}

            {active === 'media' ? (
              <DashboardMediaSection
                ImageIcon={ImageIcon}
                Plus={Plus}
                PlusCircle={PlusCircle}
                LayoutDashboard={LayoutDashboard}
                DataTable={DataTable}
                openForms={openForms}
                showForm={showForm}
                hideForm={hideForm}
                mediaCardFormRef={mediaCardFormRef}
                getPanelClass={getPanelClass}
                mediaCardDraft={mediaCardDraft}
                setMediaCardDraft={setMediaCardDraft}
                inputClass={inputClass}
                textareaClass={textareaClass}
                actionButtonClass={actionButtonClass}
                primaryButtonClass={primaryButtonClass}
                upsertMediaCard={upsertMediaCard}
                editingMediaCardIndex={editingMediaCardIndex}
                mediaCardsRows={mediaCardsRows}
                startEdit={startEdit}
                setMediaCardsRows={setMediaCardsRows}
                mediaUpdateFormRef={mediaUpdateFormRef}
                mediaUpdateDraft={mediaUpdateDraft}
                setMediaUpdateDraft={setMediaUpdateDraft}
                upsertMediaUpdate={upsertMediaUpdate}
                editingMediaUpdateIndex={editingMediaUpdateIndex}
                mediaUpdatesRows={mediaUpdatesRows}
                setMediaUpdatesRows={setMediaUpdatesRows}
              />
            ) : null}

            {active === 'contact' ? (
              <DashboardContactSection
                Mail={Mail}
                Plus={Plus}
                Save={Save}
                DataTable={DataTable}
                panelClass={panelClass}
                contactForm={contactForm}
                setContactForm={setContactForm}
                inputClass={inputClass}
                openForms={openForms}
                showForm={showForm}
                actionButtonClass={actionButtonClass}
                contactAddressFormRef={contactAddressFormRef}
                getPanelClass={getPanelClass}
                contactAddressDraft={contactAddressDraft}
                setContactAddressDraft={setContactAddressDraft}
                hideForm={hideForm}
                upsertContactAddress={upsertContactAddress}
                primaryButtonClass={primaryButtonClass}
                editingContactAddressIndex={editingContactAddressIndex}
                startEdit={startEdit}
              />
            ) : null}

            {active === 'about-us' ? (
              <DashboardAboutSection
                Save={Save}
                Plus={Plus}
                DataTable={DataTable}
                panelClass={panelClass}
                aboutUsDirty={aboutUsDirty}
                aboutUsLastSavedLabel={aboutUsLastSavedLabel}
                aboutUsForm={aboutUsForm}
                updateAboutUsText={updateAboutUsText}
                inputClass={inputClass}
                textareaClass={textareaClass}
                saveAboutUsNonPopupSection={saveAboutUsNonPopupSection}
                updateMutation={updateMutation}
                primaryButtonClass={primaryButtonClass}
                uploadAboutImage={uploadAboutImage}
                isUploadingAboutImage={isUploadingAboutImage}
                setAboutUsForm={setAboutUsForm}
                actionButtonClass={actionButtonClass}
                startEdit={startEdit}
                removeAboutUsArrayItem={removeAboutUsArrayItem}
                normalizeColorValue={normalizeColorValue}
              />
            ) : null}
            {active === 'profile' ? (
              <DashboardProfileSection
                User={User}
                PlusCircle={PlusCircle}
                Plus={Plus}
                Save={Save}
                DataTable={DataTable}
                panelClass={panelClass}
                profileForm={profileForm}
                inputClass={inputClass}
                setProfileForm={setProfileForm}
                handleProfileUpdate={handleProfileUpdate}
                isProfileSaving={isProfileSaving}
                newUserForm={newUserForm}
                setNewUserForm={setNewUserForm}
                handleCreateUser={handleCreateUser}
                isCreatingUser={isCreatingUser}
                users={users}
                usersLoading={usersLoading}
                primaryButtonClass={primaryButtonClass}
              />
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
                              value={
                                EVENT_EDITOR_CATEGORIES.includes(editModal.data.category ?? '')
                                  ? editModal.data.category
                                  : 'yearly'
                              }
                              onChange={(event) =>
                                setEditModal((prev) => ({
                                  ...prev,
                                  data: { ...prev.data, category: event.target.value },
                                }))
                              }
                              className={inputClass}
                            >
                              {EVENT_EDITOR_CATEGORIES.map((category) => (
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
                        <div className='flex items-center gap-3'>
                          <input
                            type='color'
                            value={normalizeColorValue(editModal.data.accent, '#2d4f9f')}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, accent: event.target.value },
                              }))
                            }
                            className='h-11 w-16 cursor-pointer rounded-[10px] border border-gray-200 bg-gray-50'
                            aria-label='Accent color'
                          />
                          <input
                            value={normalizeColorValue(editModal.data.accent, '#2d4f9f')}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, accent: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='#2d4f9f'
                          />
                        </div>
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
                        <p className='rounded-[10px] border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] font-medium text-blue-700'>
                          Select file, then click Save Changes. The file uploads to Supabase and the URL is saved automatically.
                        </p>
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
                          readOnly
                          className={`${inputClass} cursor-not-allowed bg-gray-100`}
                          placeholder='Auto-filled from upload'
                        />
                        <div className='flex items-center gap-3'>
                          <input
                            type='color'
                            value={normalizeColorValue(editModal.data.accent, '#f6ab3c')}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, accent: event.target.value },
                              }))
                            }
                            className='h-11 w-16 cursor-pointer rounded-[10px] border border-gray-200 bg-gray-50'
                            aria-label='Document accent color'
                          />
                          <input
                            value={normalizeColorValue(editModal.data.accent, '#f6ab3c')}
                            onChange={(event) =>
                              setEditModal((prev) => ({
                                ...prev,
                                data: { ...prev.data, accent: event.target.value },
                              }))
                            }
                            className={inputClass}
                            placeholder='#f6ab3c'
                          />
                        </div>
                        <input
                          value={editModal.data.fileUrl ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, fileUrl: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Document file URL'
                        />
                        <label className='inline-flex h-10 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-4 text-[13px] font-semibold text-gray-700'>
                          Upload Document File
                          <input
                            type='file'
                            className='hidden'
                            onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                          />
                        </label>
                        {modalImageFile ? (
                          <p className='text-[12px] text-gray-600'>Selected file: {modalImageFile.name}</p>
                        ) : null}
                        {editModal.data.fileUrl ? (
                          <a
                            href={editModal.data.fileUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex text-[12px] font-semibold text-[#001da5] underline'
                          >
                            Open currently saved file
                          </a>
                        ) : null}
                      </div>
                    ) : null}

                    {editModal.type === 'about-governance-report' ? (
                      <div className='space-y-6'>
                        <p className='rounded-[10px] border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] font-medium text-blue-700'>
                          Select file, then click Save Changes. The file uploads to Supabase and the URL is saved automatically.
                        </p>
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
                          readOnly
                          className={`${inputClass} cursor-not-allowed bg-gray-100`}
                          placeholder='Auto-filled from upload'
                        />
                        <input
                          value={editModal.data.fileUrl ?? ''}
                          onChange={(event) =>
                            setEditModal((prev) => ({
                              ...prev,
                              data: { ...prev.data, fileUrl: event.target.value },
                            }))
                          }
                          className={inputClass}
                          placeholder='Report file URL'
                        />
                        <label className='inline-flex h-10 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-4 text-[13px] font-semibold text-gray-700'>
                          Upload Report File
                          <input
                            type='file'
                            className='hidden'
                            onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                          />
                        </label>
                        {modalImageFile ? (
                          <p className='text-[12px] text-gray-600'>Selected file: {modalImageFile.name}</p>
                        ) : null}
                        {editModal.data.fileUrl ? (
                          <a
                            href={editModal.data.fileUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex text-[12px] font-semibold text-[#001da5] underline'
                          >
                            Open currently saved file
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                    </div>

                    {isUploadingModalImage ? (
                      <div className='mt-6'>
                        <div className='mb-2 flex items-center justify-between text-[12px] font-semibold text-gray-600'>
                          <span>Uploading file...</span>
                          <span>{modalUploadProgress}%</span>
                        </div>
                        <div className='h-2 w-full overflow-hidden rounded-full bg-gray-100'>
                          <div
                            className='h-full rounded-full bg-[#001da5] transition-all duration-200'
                            style={{ width: `${Math.max(5, modalUploadProgress)}%` }}
                          />
                        </div>
                      </div>
                    ) : null}

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
                         {isUploadingModalImage ? `Uploading ${modalUploadProgress}%` : 'Save Changes'}
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

export default DashboardShell
