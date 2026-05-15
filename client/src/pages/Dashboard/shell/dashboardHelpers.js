import {
  defaultAboutUsForm,
  defaultAdditionalServiceLinks,
  defaultServicesNavbarLabels,
  defaultYouthServicesForm,
} from './dashboardConstants'

export const toTextRows = (items = []) => items.map((text) => ({ text }))
export const toPairRows = (items = []) =>
  items.map((item) => ({ label: item?.label ?? '', value: item?.value ?? '' }))
export const cleanTextRows = (rows = []) => rows.map((row) => row.text.trim()).filter(Boolean)
export const cleanPairRows = (rows = []) =>
  rows
    .map((row) => ({ label: row.label.trim(), value: row.value.trim() }))
    .filter((row) => row.label || row.value)
export const cleanFaqRows = (rows = []) =>
  rows
    .map((row) => ({ question: row.question.trim(), answer: row.answer.trim() }))
    .filter((row) => row.question || row.answer)

export const normalizeColorValue = (value, fallback = '#2d4f9f') => {
  const input = typeof value === 'string' ? value.trim() : ''
  if (!input) return fallback
  if (input.startsWith('#')) return input
  const match = input.match(/#(?:[0-9a-fA-F]{3,8})/)
  return match ? match[0] : fallback
}

export const getEmailFromAccessToken = (token) => {
  if (!token || typeof token !== 'string') return ''

  try {
    const payload = token.split('.')[1]
    if (!payload) return ''

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const decoded = JSON.parse(atob(padded))
    return decoded?.email ?? ''
  } catch {
    return ''
  }
}

export const readLocalizedEditorValue = (value, language = 'en') => {
  if (typeof value === 'string') {
    return value
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return typeof value[language] === 'string' ? value[language] : ''
  }
  return ''
}

export const upsertLocalizedValue = (existingValue, language = 'en', nextValue = '') => {
  const next = {
    en: '',
    de: '',
  }

  if (typeof existingValue === 'string') {
    next.en = existingValue
  } else if (existingValue && typeof existingValue === 'object' && !Array.isArray(existingValue)) {
    next.en = typeof existingValue.en === 'string' ? existingValue.en : ''
    next.de = typeof existingValue.de === 'string' ? existingValue.de : ''
  }

  next[language] = (nextValue ?? '').trim()
  return next
}

export const localizedValueHasContent = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return ['en', 'de'].some((language) => {
    const text = value[language]
    return typeof text === 'string' && text.trim().length > 0
  })
}

export const createServicePath = (label = '') => {
  const slug = label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug ? `/services/${slug}` : ''
}

export const createAboutUsPayload = (sourceForm) => ({
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
    heroImage: sourceForm.committee.heroImage.trim(),
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

export const buildAboutUsEditorForm = (aboutUs = {}, language = 'en') => {
  const defaultPathsBySection = [
    ['/about-us/history', '/about-us/mission'],
    ['/about-us/committee', '/about-us/governance'],
  ]

  return {
    history: {
      heroTitle: readLocalizedEditorValue(aboutUs.history?.heroTitle, language),
      heroSubtitle: readLocalizedEditorValue(aboutUs.history?.heroSubtitle, language),
      heroImage: aboutUs.history?.heroImage ?? '',
      sections:
        Array.isArray(aboutUs.history?.sections) && aboutUs.history.sections.length > 0
          ? aboutUs.history.sections.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              body: readLocalizedEditorValue(item?.body, language),
            }))
          : [{ ...defaultAboutUsForm.history.sections[0] }],
    },
    mission: {
      heroTitle: readLocalizedEditorValue(aboutUs.mission?.heroTitle, language),
      heroDescription: readLocalizedEditorValue(aboutUs.mission?.heroDescription, language),
      heroImage: aboutUs.mission?.heroImage ?? '',
      coreValuesTitle: readLocalizedEditorValue(aboutUs.mission?.coreValuesTitle, language),
      cards:
        Array.isArray(aboutUs.mission?.cards) && aboutUs.mission.cards.length > 0
          ? aboutUs.mission.cards.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              description: readLocalizedEditorValue(item?.description, language),
              accent: normalizeColorValue(item?.accent, '#2d4f9f'),
            }))
          : [{ ...defaultAboutUsForm.mission.cards[0] }],
      coreValues:
        Array.isArray(aboutUs.mission?.coreValues) && aboutUs.mission.coreValues.length > 0
          ? aboutUs.mission.coreValues.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              description: readLocalizedEditorValue(item?.description, language),
            }))
          : [{ ...defaultAboutUsForm.mission.coreValues[0] }],
    },
    committee: {
      heroTitle: readLocalizedEditorValue(aboutUs.committee?.heroTitle, language),
      heroSubtitle: readLocalizedEditorValue(aboutUs.committee?.heroSubtitle, language),
      heroImage: aboutUs.committee?.heroImage ?? '',
      intro: readLocalizedEditorValue(aboutUs.committee?.intro, language),
      members:
        Array.isArray(aboutUs.committee?.members) && aboutUs.committee.members.length > 0
          ? aboutUs.committee.members.map((item) => ({
              initials: readLocalizedEditorValue(item?.initials, language),
              name: readLocalizedEditorValue(item?.name, language),
              role: readLocalizedEditorValue(item?.role, language),
              email: readLocalizedEditorValue(item?.email, language),
              phone: readLocalizedEditorValue(item?.phone, language),
              image: item?.image ?? '',
            }))
          : [{ ...defaultAboutUsForm.committee.members[0] }],
      ctaTitle: readLocalizedEditorValue(aboutUs.committee?.ctaTitle, language),
      ctaDescription: readLocalizedEditorValue(aboutUs.committee?.ctaDescription, language),
      ctaButtonLabel: readLocalizedEditorValue(aboutUs.committee?.ctaButtonLabel, language),
    },
    governance: {
      heroTitle: readLocalizedEditorValue(aboutUs.governance?.heroTitle, language),
      heroSubtitle: readLocalizedEditorValue(aboutUs.governance?.heroSubtitle, language),
      heroImage: aboutUs.governance?.heroImage ?? '',
      structureTitle: readLocalizedEditorValue(aboutUs.governance?.structureTitle, language),
      structureIntro: readLocalizedEditorValue(aboutUs.governance?.structureIntro, language),
      structureBlocks:
        Array.isArray(aboutUs.governance?.structureBlocks) && aboutUs.governance.structureBlocks.length > 0
          ? aboutUs.governance.structureBlocks.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              body: readLocalizedEditorValue(item?.body, language),
            }))
          : [{ ...defaultAboutUsForm.governance.structureBlocks[0] }],
      documentsTitle: readLocalizedEditorValue(aboutUs.governance?.documentsTitle, language),
      documents:
        Array.isArray(aboutUs.governance?.documents) && aboutUs.governance.documents.length > 0
          ? aboutUs.governance.documents.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              size: readLocalizedEditorValue(item?.size, language),
              accent: normalizeColorValue(item?.accent, '#f6ab3c'),
              fileUrl: item?.fileUrl ?? '',
            }))
          : [{ ...defaultAboutUsForm.governance.documents[0] }],
      reportsTitle: readLocalizedEditorValue(aboutUs.governance?.reportsTitle, language),
      reports:
        Array.isArray(aboutUs.governance?.reports) && aboutUs.governance.reports.length > 0
          ? aboutUs.governance.reports.map((item) => ({
              title: readLocalizedEditorValue(item?.title, language),
              size: readLocalizedEditorValue(item?.size, language),
              fileUrl: item?.fileUrl ?? '',
            }))
          : [{ ...defaultAboutUsForm.governance.reports[0] }],
      downloadCtaLabel: readLocalizedEditorValue(aboutUs.governance?.downloadCtaLabel, language),
      financialTitle: readLocalizedEditorValue(aboutUs.governance?.financialTitle, language),
      financialDescription: readLocalizedEditorValue(aboutUs.governance?.financialDescription, language),
      taxTitle: readLocalizedEditorValue(aboutUs.governance?.taxTitle, language),
      taxDescription: readLocalizedEditorValue(aboutUs.governance?.taxDescription, language),
    },
    navbar: {
      label: readLocalizedEditorValue(aboutUs.navbar?.label, language),
      sections:
        Array.isArray(aboutUs.navbar?.sections) && aboutUs.navbar.sections.length > 0
          ? aboutUs.navbar.sections.map((section, sectionIndex) => {
              const defaultPaths = defaultPathsBySection[sectionIndex] ?? []
              const existingLinks = Array.isArray(section?.links) ? section.links : []
              const requiredLength = Math.max(existingLinks.length, defaultPaths.length)
              const mappedLinks = Array.from({ length: requiredLength }).map((_, linkIndex) => ({
                label: readLocalizedEditorValue(existingLinks[linkIndex]?.label, language),
                to: existingLinks[linkIndex]?.to ?? defaultPaths[linkIndex] ?? '',
              }))

              return {
                heading: readLocalizedEditorValue(section?.heading, language),
                links: mappedLinks,
              }
            })
          : defaultAboutUsForm.navbar.sections.map((section) => ({
              heading: section.heading,
              links: section.links.map((link) => ({ ...link })),
            })),
    },
  }
}

export const buildLocalizedAboutUsPayload = (sourceForm, existingAboutUs = {}, language = 'en') => {
  const payload = createAboutUsPayload(sourceForm)

  return {
    history: {
      heroTitle: upsertLocalizedValue(existingAboutUs.history?.heroTitle, language, payload.history.heroTitle),
      heroSubtitle: upsertLocalizedValue(
        existingAboutUs.history?.heroSubtitle,
        language,
        payload.history.heroSubtitle,
      ),
      heroImage: payload.history.heroImage,
      sections: payload.history.sections.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.history?.sections?.[index]?.title, language, item.title),
        body: upsertLocalizedValue(existingAboutUs.history?.sections?.[index]?.body, language, item.body),
      })),
    },
    mission: {
      heroTitle: upsertLocalizedValue(existingAboutUs.mission?.heroTitle, language, payload.mission.heroTitle),
      heroDescription: upsertLocalizedValue(
        existingAboutUs.mission?.heroDescription,
        language,
        payload.mission.heroDescription,
      ),
      heroImage: payload.mission.heroImage,
      coreValuesTitle: upsertLocalizedValue(
        existingAboutUs.mission?.coreValuesTitle,
        language,
        payload.mission.coreValuesTitle,
      ),
      cards: payload.mission.cards.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.mission?.cards?.[index]?.title, language, item.title),
        description: upsertLocalizedValue(
          existingAboutUs.mission?.cards?.[index]?.description,
          language,
          item.description,
        ),
        accent: item.accent,
      })),
      coreValues: payload.mission.coreValues.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.mission?.coreValues?.[index]?.title, language, item.title),
        description: upsertLocalizedValue(
          existingAboutUs.mission?.coreValues?.[index]?.description,
          language,
          item.description,
        ),
      })),
    },
    committee: {
      heroTitle: upsertLocalizedValue(existingAboutUs.committee?.heroTitle, language, payload.committee.heroTitle),
      heroSubtitle: upsertLocalizedValue(
        existingAboutUs.committee?.heroSubtitle,
        language,
        payload.committee.heroSubtitle,
      ),
      heroImage: payload.committee.heroImage,
      intro: upsertLocalizedValue(existingAboutUs.committee?.intro, language, payload.committee.intro),
      members: payload.committee.members.map((item, index) => ({
        initials: upsertLocalizedValue(existingAboutUs.committee?.members?.[index]?.initials, language, item.initials),
        name: upsertLocalizedValue(existingAboutUs.committee?.members?.[index]?.name, language, item.name),
        role: upsertLocalizedValue(existingAboutUs.committee?.members?.[index]?.role, language, item.role),
        email: upsertLocalizedValue(existingAboutUs.committee?.members?.[index]?.email, language, item.email),
        phone: upsertLocalizedValue(existingAboutUs.committee?.members?.[index]?.phone, language, item.phone),
        image: item.image,
      })),
      ctaTitle: upsertLocalizedValue(existingAboutUs.committee?.ctaTitle, language, payload.committee.ctaTitle),
      ctaDescription: upsertLocalizedValue(
        existingAboutUs.committee?.ctaDescription,
        language,
        payload.committee.ctaDescription,
      ),
      ctaButtonLabel: upsertLocalizedValue(
        existingAboutUs.committee?.ctaButtonLabel,
        language,
        payload.committee.ctaButtonLabel,
      ),
    },
    governance: {
      heroTitle: upsertLocalizedValue(existingAboutUs.governance?.heroTitle, language, payload.governance.heroTitle),
      heroSubtitle: upsertLocalizedValue(
        existingAboutUs.governance?.heroSubtitle,
        language,
        payload.governance.heroSubtitle,
      ),
      heroImage: payload.governance.heroImage,
      structureTitle: upsertLocalizedValue(
        existingAboutUs.governance?.structureTitle,
        language,
        payload.governance.structureTitle,
      ),
      structureIntro: upsertLocalizedValue(
        existingAboutUs.governance?.structureIntro,
        language,
        payload.governance.structureIntro,
      ),
      structureBlocks: payload.governance.structureBlocks.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.governance?.structureBlocks?.[index]?.title, language, item.title),
        body: upsertLocalizedValue(existingAboutUs.governance?.structureBlocks?.[index]?.body, language, item.body),
      })),
      documentsTitle: upsertLocalizedValue(
        existingAboutUs.governance?.documentsTitle,
        language,
        payload.governance.documentsTitle,
      ),
      documents: payload.governance.documents.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.governance?.documents?.[index]?.title, language, item.title),
        size: upsertLocalizedValue(existingAboutUs.governance?.documents?.[index]?.size, language, item.size),
        accent: item.accent,
        fileUrl: item.fileUrl,
      })),
      reportsTitle: upsertLocalizedValue(
        existingAboutUs.governance?.reportsTitle,
        language,
        payload.governance.reportsTitle,
      ),
      reports: payload.governance.reports.map((item, index) => ({
        title: upsertLocalizedValue(existingAboutUs.governance?.reports?.[index]?.title, language, item.title),
        size: upsertLocalizedValue(existingAboutUs.governance?.reports?.[index]?.size, language, item.size),
        fileUrl: item.fileUrl,
      })),
      downloadCtaLabel: upsertLocalizedValue(
        existingAboutUs.governance?.downloadCtaLabel,
        language,
        payload.governance.downloadCtaLabel,
      ),
      financialTitle: upsertLocalizedValue(
        existingAboutUs.governance?.financialTitle,
        language,
        payload.governance.financialTitle,
      ),
      financialDescription: upsertLocalizedValue(
        existingAboutUs.governance?.financialDescription,
        language,
        payload.governance.financialDescription,
      ),
      taxTitle: upsertLocalizedValue(existingAboutUs.governance?.taxTitle, language, payload.governance.taxTitle),
      taxDescription: upsertLocalizedValue(
        existingAboutUs.governance?.taxDescription,
        language,
        payload.governance.taxDescription,
      ),
    },
    navbar: {
      label: upsertLocalizedValue(existingAboutUs.navbar?.label, language, payload.navbar.label),
      sections: payload.navbar.sections.map((section, sectionIndex) => ({
        heading: upsertLocalizedValue(existingAboutUs.navbar?.sections?.[sectionIndex]?.heading, language, section.heading),
        links: section.links.map((link, linkIndex) => ({
          label: upsertLocalizedValue(
            existingAboutUs.navbar?.sections?.[sectionIndex]?.links?.[linkIndex]?.label,
            language,
            link.label,
          ),
          to: link.to,
        })),
      })),
    },
  }
}

export const buildYouthServicesFormFromContent = (content, servicesEditorLanguage) => {
  const youthEducation = content.services?.youthEducation ?? {}
  const gurmukhiLevels =
    Array.isArray(youthEducation.gurmukhi?.levels) && youthEducation.gurmukhi.levels.length > 0
      ? youthEducation.gurmukhi.levels
      : defaultYouthServicesForm.gurmukhi.levels
  const germanTracks =
    Array.isArray(youthEducation.german?.tracks) && youthEducation.german.tracks.length > 0
      ? youthEducation.german.tracks
      : defaultYouthServicesForm.german.tracks
  const campsCards =
    Array.isArray(youthEducation.camps?.cards) && youthEducation.camps.cards.length > 0
      ? youthEducation.camps.cards
      : defaultYouthServicesForm.camps.cards
  const reasons =
    Array.isArray(youthEducation.reasons) && youthEducation.reasons.length > 0
      ? youthEducation.reasons
      : defaultYouthServicesForm.reasons
  const navbarAdditionalLinks =
    Array.isArray(youthEducation.navbar?.additionalLinks) && youthEducation.navbar.additionalLinks.length > 0
      ? youthEducation.navbar.additionalLinks
      : defaultAdditionalServiceLinks
  const navbarDefaults = defaultServicesNavbarLabels[servicesEditorLanguage] ?? defaultServicesNavbarLabels.en

  return {
    navbar: {
      label: readLocalizedEditorValue(youthEducation.navbar?.label, servicesEditorLanguage) || navbarDefaults.label,
      s1h: readLocalizedEditorValue(youthEducation.navbar?.s1h, servicesEditorLanguage) || navbarDefaults.s1h,
      s2h: readLocalizedEditorValue(youthEducation.navbar?.s2h, servicesEditorLanguage) || navbarDefaults.s2h,
      gurmukhi:
        readLocalizedEditorValue(youthEducation.navbar?.gurmukhi, servicesEditorLanguage) || navbarDefaults.gurmukhi,
      german: readLocalizedEditorValue(youthEducation.navbar?.german, servicesEditorLanguage) || navbarDefaults.german,
      camps: readLocalizedEditorValue(youthEducation.navbar?.camps, servicesEditorLanguage) || navbarDefaults.camps,
      registration:
        readLocalizedEditorValue(youthEducation.navbar?.registration, servicesEditorLanguage) ||
        navbarDefaults.registration,
      cremationFund:
        readLocalizedEditorValue(youthEducation.navbar?.cremationFund, servicesEditorLanguage) ||
        navbarDefaults.cremationFund,
      additionalLinks: navbarAdditionalLinks.map((link) => ({
        label: readLocalizedEditorValue(link?.label, servicesEditorLanguage),
        to: typeof link?.to === 'string' ? link.to : readLocalizedEditorValue(link?.to, servicesEditorLanguage),
        pageTitle: readLocalizedEditorValue(link?.pageTitle, servicesEditorLanguage),
        pageSubtitle: readLocalizedEditorValue(link?.pageSubtitle, servicesEditorLanguage),
        pageContent: readLocalizedEditorValue(link?.pageContent, servicesEditorLanguage),
        pageImages:
          Array.isArray(link?.pageImages) && link.pageImages.length > 0
            ? link.pageImages.map((image) => (typeof image === 'string' ? image : ''))
            : [''],
      })),
    },
    heading: readLocalizedEditorValue(youthEducation.heading, servicesEditorLanguage),
    subtitle: readLocalizedEditorValue(youthEducation.subtitle, servicesEditorLanguage),
    intro: readLocalizedEditorValue(youthEducation.intro, servicesEditorLanguage),
    gurmukhi: {
      title: readLocalizedEditorValue(youthEducation.gurmukhi?.title, servicesEditorLanguage),
      description: readLocalizedEditorValue(youthEducation.gurmukhi?.description, servicesEditorLanguage),
      image: youthEducation.gurmukhi?.image ?? '',
      scheduleTitle: readLocalizedEditorValue(youthEducation.gurmukhi?.scheduleTitle, servicesEditorLanguage),
      scheduleDay: readLocalizedEditorValue(youthEducation.gurmukhi?.scheduleDay, servicesEditorLanguage),
      scheduleTime: readLocalizedEditorValue(youthEducation.gurmukhi?.scheduleTime, servicesEditorLanguage),
      scheduleLocation: readLocalizedEditorValue(youthEducation.gurmukhi?.scheduleLocation, servicesEditorLanguage),
      levels: Array.from({ length: 3 }).map((_, index) => ({
        title: readLocalizedEditorValue(gurmukhiLevels[index]?.title, servicesEditorLanguage),
        description: readLocalizedEditorValue(gurmukhiLevels[index]?.description, servicesEditorLanguage),
      })),
    },
    german: {
      title: readLocalizedEditorValue(youthEducation.german?.title, servicesEditorLanguage),
      description: readLocalizedEditorValue(youthEducation.german?.description, servicesEditorLanguage),
      image: youthEducation.german?.image ?? '',
      scheduleTitle: readLocalizedEditorValue(youthEducation.german?.scheduleTitle, servicesEditorLanguage),
      scheduleDay: readLocalizedEditorValue(youthEducation.german?.scheduleDay, servicesEditorLanguage),
      scheduleTime: readLocalizedEditorValue(youthEducation.german?.scheduleTime, servicesEditorLanguage),
      scheduleLocation: readLocalizedEditorValue(youthEducation.german?.scheduleLocation, servicesEditorLanguage),
      tracks: Array.from({ length: 3 }).map((_, index) => ({
        title: readLocalizedEditorValue(germanTracks[index]?.title, servicesEditorLanguage),
        description: readLocalizedEditorValue(germanTracks[index]?.description, servicesEditorLanguage),
      })),
    },
    camps: {
      title: readLocalizedEditorValue(youthEducation.camps?.title, servicesEditorLanguage),
      subtitle: readLocalizedEditorValue(youthEducation.camps?.subtitle, servicesEditorLanguage),
      cards: Array.from({ length: 3 }).map((_, index) => ({
        title: readLocalizedEditorValue(campsCards[index]?.title, servicesEditorLanguage),
        description: readLocalizedEditorValue(campsCards[index]?.description, servicesEditorLanguage),
        time: readLocalizedEditorValue(campsCards[index]?.time, servicesEditorLanguage),
      })),
    },
    registration: {
      title: readLocalizedEditorValue(youthEducation.registration?.title, servicesEditorLanguage),
      description: readLocalizedEditorValue(youthEducation.registration?.description, servicesEditorLanguage),
      contactButtonLabel: readLocalizedEditorValue(youthEducation.registration?.contactButtonLabel, servicesEditorLanguage),
      scheduleButtonLabel: readLocalizedEditorValue(youthEducation.registration?.scheduleButtonLabel, servicesEditorLanguage),
    },
    whyEnrollTitle: readLocalizedEditorValue(youthEducation.whyEnrollTitle, servicesEditorLanguage),
    reasons: Array.from({ length: 4 }).map((_, index) => ({
      title: readLocalizedEditorValue(reasons[index]?.title, servicesEditorLanguage),
      text: readLocalizedEditorValue(reasons[index]?.text, servicesEditorLanguage),
    })),
  }
}
