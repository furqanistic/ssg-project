import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSiteContentQuery } from '@/hooks/useContent'

const toText = (value, language = 'en') => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || ''
  }
  return ''
}
const toArray = (value) => (Array.isArray(value) ? value : [])

const normalizeAboutUs = (aboutUs = {}, language = 'en') => {
  const history = aboutUs?.history ?? {}
  const mission = aboutUs?.mission ?? {}
  const committee = aboutUs?.committee ?? {}
  const governance = aboutUs?.governance ?? {}
  const navbar = aboutUs?.navbar ?? {}

  return {
    history: {
      heroTitle: toText(history.heroTitle, language),
      heroSubtitle: toText(history.heroSubtitle, language),
      heroImage: toText(history.heroImage),
      sections: toArray(history.sections)
        .map((item) => ({ title: toText(item?.title, language), body: toText(item?.body, language) }))
        .filter((item) => item.title || item.body),
    },
    mission: {
      heroTitle: toText(mission.heroTitle, language),
      heroDescription: toText(mission.heroDescription, language),
      heroImage: toText(mission.heroImage),
      coreValuesTitle: toText(mission.coreValuesTitle, language),
      cards: toArray(mission.cards)
        .map((item) => ({
          title: toText(item?.title, language),
          description: toText(item?.description, language),
          accent: toText(item?.accent),
        }))
        .filter((item) => item.title || item.description || item.accent),
      coreValues: toArray(mission.coreValues)
        .map((item) => ({
          title: toText(item?.title, language),
          description: toText(item?.description, language),
        }))
        .filter((item) => item.title || item.description),
    },
    committee: {
      heroTitle: toText(committee.heroTitle, language),
      heroSubtitle: toText(committee.heroSubtitle, language),
      intro: toText(committee.intro, language),
      members: toArray(committee.members)
        .map((item) => ({
          initials: toText(item?.initials, language),
          name: toText(item?.name, language),
          role: toText(item?.role, language),
          email: toText(item?.email, language),
          phone: toText(item?.phone, language),
          image: toText(item?.image),
        }))
        .filter((item) => item.name || item.role || item.email || item.phone || item.image || item.initials),
      ctaTitle: toText(committee.ctaTitle, language),
      ctaDescription: toText(committee.ctaDescription, language),
      ctaButtonLabel: toText(committee.ctaButtonLabel, language),
    },
    governance: {
      heroTitle: toText(governance.heroTitle, language),
      heroSubtitle: toText(governance.heroSubtitle, language),
      heroImage: toText(governance.heroImage),
      structureTitle: toText(governance.structureTitle, language),
      structureIntro: toText(governance.structureIntro, language),
      structureBlocks: toArray(governance.structureBlocks)
        .map((item) => ({
          title: toText(item?.title, language),
          body: toText(item?.body, language),
        }))
        .filter((item) => item.title || item.body),
      documentsTitle: toText(governance.documentsTitle, language),
      documents: toArray(governance.documents)
        .map((item) => ({
          title: toText(item?.title, language),
          size: toText(item?.size, language),
          accent: toText(item?.accent),
          fileUrl: toText(item?.fileUrl),
        }))
        .filter((item) => item.title || item.size || item.accent || item.fileUrl),
      reportsTitle: toText(governance.reportsTitle, language),
      reports: toArray(governance.reports)
        .map((item) => ({
          title: toText(item?.title, language),
          size: toText(item?.size, language),
          fileUrl: toText(item?.fileUrl),
        }))
        .filter((item) => item.title || item.size || item.fileUrl),
      downloadCtaLabel: toText(governance.downloadCtaLabel, language),
      financialTitle: toText(governance.financialTitle, language),
      financialDescription: toText(governance.financialDescription, language),
      taxTitle: toText(governance.taxTitle, language),
      taxDescription: toText(governance.taxDescription, language),
    },
    navbar: {
      label: toText(navbar.label, language),
      sections: toArray(navbar.sections).map((section) => ({
        heading: toText(section?.heading, language),
        links: toArray(section?.links)
          .map((link) => ({ label: toText(link?.label, language), to: toText(link?.to) }))
          .filter((link) => link.label || link.to),
      })),
    },
  }
}

export const useAboutUsContentQuery = () => {
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const query = useSiteContentQuery({
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  })

  const aboutUs = useMemo(() => normalizeAboutUs(query.data?.aboutUs, language), [language, query.data])

  return {
    ...query,
    aboutUs,
  }
}
