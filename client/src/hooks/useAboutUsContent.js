import { useMemo } from 'react'
import { useSiteContentQuery } from '@/hooks/useContent'

const toText = (value) => (typeof value === 'string' ? value : '')
const toArray = (value) => (Array.isArray(value) ? value : [])

const normalizeAboutUs = (aboutUs = {}) => {
  const history = aboutUs?.history ?? {}
  const mission = aboutUs?.mission ?? {}
  const committee = aboutUs?.committee ?? {}
  const governance = aboutUs?.governance ?? {}
  const navbar = aboutUs?.navbar ?? {}

  return {
    history: {
      heroTitle: toText(history.heroTitle),
      heroSubtitle: toText(history.heroSubtitle),
      heroImage: toText(history.heroImage),
      sections: toArray(history.sections)
        .map((item) => ({ title: toText(item?.title), body: toText(item?.body) }))
        .filter((item) => item.title || item.body),
    },
    mission: {
      heroTitle: toText(mission.heroTitle),
      heroDescription: toText(mission.heroDescription),
      heroImage: toText(mission.heroImage),
      coreValuesTitle: toText(mission.coreValuesTitle),
      cards: toArray(mission.cards)
        .map((item) => ({
          title: toText(item?.title),
          description: toText(item?.description),
          accent: toText(item?.accent),
        }))
        .filter((item) => item.title || item.description || item.accent),
      coreValues: toArray(mission.coreValues)
        .map((item) => ({ title: toText(item?.title), description: toText(item?.description) }))
        .filter((item) => item.title || item.description),
    },
    committee: {
      heroTitle: toText(committee.heroTitle),
      heroSubtitle: toText(committee.heroSubtitle),
      intro: toText(committee.intro),
      members: toArray(committee.members)
        .map((item) => ({
          initials: toText(item?.initials),
          name: toText(item?.name),
          role: toText(item?.role),
          email: toText(item?.email),
          phone: toText(item?.phone),
          image: toText(item?.image),
        }))
        .filter((item) => item.name || item.role || item.email || item.phone || item.image || item.initials),
      ctaTitle: toText(committee.ctaTitle),
      ctaDescription: toText(committee.ctaDescription),
      ctaButtonLabel: toText(committee.ctaButtonLabel),
    },
    governance: {
      heroTitle: toText(governance.heroTitle),
      heroSubtitle: toText(governance.heroSubtitle),
      heroImage: toText(governance.heroImage),
      structureTitle: toText(governance.structureTitle),
      structureIntro: toText(governance.structureIntro),
      structureBlocks: toArray(governance.structureBlocks)
        .map((item) => ({ title: toText(item?.title), body: toText(item?.body) }))
        .filter((item) => item.title || item.body),
      documentsTitle: toText(governance.documentsTitle),
      documents: toArray(governance.documents)
        .map((item) => ({
          title: toText(item?.title),
          size: toText(item?.size),
          accent: toText(item?.accent),
          fileUrl: toText(item?.fileUrl),
        }))
        .filter((item) => item.title || item.size || item.accent || item.fileUrl),
      reportsTitle: toText(governance.reportsTitle),
      reports: toArray(governance.reports)
        .map((item) => ({
          title: toText(item?.title),
          size: toText(item?.size),
          fileUrl: toText(item?.fileUrl),
        }))
        .filter((item) => item.title || item.size || item.fileUrl),
      downloadCtaLabel: toText(governance.downloadCtaLabel),
      financialTitle: toText(governance.financialTitle),
      financialDescription: toText(governance.financialDescription),
      taxTitle: toText(governance.taxTitle),
      taxDescription: toText(governance.taxDescription),
    },
    navbar: {
      label: toText(navbar.label),
      sections: toArray(navbar.sections).map((section) => ({
        heading: toText(section?.heading),
        links: toArray(section?.links)
          .map((link) => ({ label: toText(link?.label), to: toText(link?.to) }))
          .filter((link) => link.label || link.to),
      })),
    },
  }
}

export const useAboutUsContentQuery = () => {
  const query = useSiteContentQuery({
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  })

  const aboutUs = useMemo(() => normalizeAboutUs(query.data?.aboutUs), [query.data])

  return {
    ...query,
    aboutUs,
  }
}
