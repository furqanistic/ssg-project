import { Calendar, CircleDollarSign, FileText, Image as ImageIcon, Info, Mail, User, Users } from 'lucide-react'

export const ICON_MAP = {
  Users,
  Calendar,
  ImageIcon,
  Mail,
  FileText,
  CircleDollarSign,
  Info,
  User,
}

export const menu = [
  { key: 'visitors', label: 'Visitors', icon: 'Users' },
  { key: 'events', label: 'Events', icon: 'Calendar' },
  { key: 'media', label: 'Media', icon: 'ImageIcon' },
  { key: 'contact', label: 'Contact', icon: 'Mail' },
  { key: 'donate', label: 'Donate', icon: 'CircleDollarSign' },
  { key: 'services', label: 'Services', icon: 'FileText' },
  { key: 'about-us', label: 'About Us', icon: 'Info' },
  { key: 'profile', label: 'Profile', icon: 'User' },
]

export const EVENT_CATEGORIES = ['all', 'daily', 'weekly', 'monthly', 'yearly']
export const EVENT_EDITOR_CATEGORIES = EVENT_CATEGORIES.filter((category) => category !== 'all')

export const emptyEvent = {
  title: '',
  date: '',
  time: '',
  location: '',
  category: 'yearly',
  image: '',
  description: '',
}

export const emptyPair = { label: '', value: '' }
export const emptyFaq = { question: '', answer: '' }

export const defaultDonateForm = {
  bankName: '',
  accountHolder: '',
  iban: '',
  bic: '',
  officeHours: '',
  inPersonDescription: '',
}

export const defaultServicesForm = {
  heroTitle: '',
  heroSubtitle: '',
  heroImage: '',
  aboutTitle: '',
  aboutText: '',
  supportText: '',
  supportImage: '',
  contactButtonLabel: '',
  donateButtonLabel: '',
}

export const defaultAdditionalServiceLinks = [
  {
    label: { en: 'Library', de: 'Bibliothek' },
    to: '/resources/library',
    pageTitle: { en: '', de: '' },
    pageSubtitle: { en: '', de: '' },
    pageContent: { en: '', de: '' },
    pageImages: [],
  },
]

export const emptyAdditionalServiceLink = {
  label: '',
  to: '',
  pageTitle: '',
  pageSubtitle: '',
  pageContent: '',
  pageImages: [''],
}

export const defaultServicesNavbarLabels = {
  en: {
    label: 'Services',
    s1h: 'CLASSES',
    s2h: 'PROGRAMS',
    gurmukhi: 'Gurmukhi Class',
    german: 'German Class',
    camps: 'Camps & Workshops',
    registration: 'Registration',
    cremationFund: 'Cremation Fund (Antim Sanskar Fund)',
  },
  de: {
    label: 'Services',
    s1h: 'KURSE',
    s2h: 'PROGRAMME',
    gurmukhi: 'Gurmukhi-Kurs',
    german: 'Deutschkurs',
    camps: 'Camps & Workshops',
    registration: 'Anmeldung',
    cremationFund: 'Antim Sanskar Fonds',
  },
}

export const defaultYouthServicesForm = {
  navbar: {
    label: '',
    s1h: '',
    s2h: '',
    gurmukhi: '',
    german: '',
    camps: '',
    registration: '',
    cremationFund: '',
    additionalLinks: defaultAdditionalServiceLinks.map((link) => ({
      label: link.label.en,
      to: link.to,
      pageTitle: link.pageTitle.en,
      pageSubtitle: link.pageSubtitle.en,
      pageContent: link.pageContent.en,
      pageImages: Array.isArray(link.pageImages) && link.pageImages.length > 0 ? link.pageImages : [''],
    })),
  },
  heading: '',
  subtitle: '',
  intro: '',
  gurmukhi: {
    title: '',
    description: '',
    image: '',
    scheduleTitle: '',
    scheduleDay: '',
    scheduleTime: '',
    scheduleLocation: '',
    levels: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
  },
  german: {
    title: '',
    description: '',
    image: '',
    scheduleTitle: '',
    scheduleDay: '',
    scheduleTime: '',
    scheduleLocation: '',
    tracks: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
  },
  camps: {
    title: '',
    subtitle: '',
    cards: [
      { title: '', description: '', time: '' },
      { title: '', description: '', time: '' },
      { title: '', description: '', time: '' },
    ],
  },
  registration: {
    title: '',
    description: '',
    contactButtonLabel: '',
    scheduleButtonLabel: '',
  },
  whyEnrollTitle: '',
  reasons: [
    { title: '', text: '' },
    { title: '', text: '' },
    { title: '', text: '' },
    { title: '', text: '' },
  ],
}

export const defaultAboutUsForm = {
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
    heroImage: '',
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

export const panelClass =
  'rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all duration-300'
export const inputClass =
  'mt-2 h-11 w-full rounded-[14px] border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:bg-gray-100/50 focus:border-[#001da5] focus:bg-white focus:ring-4 focus:ring-[#001da5]/5'
export const textareaClass =
  'mt-2 min-h-[120px] w-full rounded-[14px] border border-gray-200 bg-gray-50 p-4 text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:bg-gray-100/50 focus:border-[#001da5] focus:bg-white focus:ring-4 focus:ring-[#001da5]/5'
export const actionButtonClass =
  'inline-flex h-10 items-center justify-center rounded-[12px] border border-gray-200 bg-gray-50 px-5 text-[13px] font-semibold text-gray-700 transition-all hover:bg-gray-100 hover:text-[#001da5] hover:border-[#001da5]/30 active:scale-95'
export const primaryButtonClass =
  'inline-flex h-10 items-center justify-center rounded-[12px] bg-[#001da5] px-5 text-[13px] font-bold text-white transition-all hover:bg-[#001580] shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
