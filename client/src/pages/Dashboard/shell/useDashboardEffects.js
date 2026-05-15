import { useEffect, useRef } from 'react'

export function useDashboardEffects({
  content, dataUpdatedAt,
  sectionKey,
  location, navigate,
  active, setActive, setError, setSuccess,
  setVisitorsForm, setEventsRows, setMediaCardsRows, setMediaUpdatesRows,
  setContactForm, setDonateForm, setServicesForm, setYouthServicesForm,
  setAboutUsForm, setAboutUsSavedSnapshot, setAboutUsLastSavedAt,
  setEventDraft, setEditingEventIndex, setEventImageFile,
  setVisitorDrafts, setVisitorEditing,
  setContactAddressDraft, setEditingContactAddressIndex, setOpenForms,
  servicesEditorLanguage, aboutEditorLanguage,
  error, success, toast,
  activeServicesEditor, setActiveServicesEditor,
  activeYouthServicesEditor, setActiveYouthServicesEditor,
  setActiveYouthProgramsEditor,
  setProfileForm,
  currentUserEmail,
  session,
  authFailureHandledRef,
  usersQuery,
  handleRequestError,
  menu,
  toTextRows, toPairRows, buildAboutUsEditorForm, createAboutUsPayload,
  readLocalizedEditorValue,
  defaultYouthServicesForm, defaultAdditionalServiceLinks, defaultServicesNavbarLabels,
  emptyEvent, emptyPair, emptyFaq,
}) {
  const handleRequestErrorRef = useRef(handleRequestError)

  useEffect(() => {
    handleRequestErrorRef.current = handleRequestError
  }, [handleRequestError])

  useEffect(() => {
    if (!content) {
      return
    }

    setVisitorsForm({
      guideTitle: content.visitors?.guide?.title ?? '',
      guideBody: content.visitors?.guide?.body ?? '',
      rules: toTextRows(content.visitors?.rulesEtiquette),
      daily: toPairRows(content.visitors?.openingTimings?.dailySchedule),
      langar: toPairRows(content.visitors?.openingTimings?.langarSchedule),
      sundaySpecial: content.visitors?.openingTimings?.sundaySpecial ?? '',
      address: toTextRows(content.visitors?.location?.addressLines),
      reach: toTextRows(content.visitors?.location?.howToReach),
      faq: (content.visitors?.faq ?? []).map((item) => ({
        question: item?.question ?? '',
        answer: item?.answer ?? '',
      })),
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
    setDonateForm({
      bankName: content.donate?.bankName ?? '',
      accountHolder: content.donate?.accountHolder ?? '',
      iban: content.donate?.iban ?? '',
      bic: content.donate?.bic ?? '',
      officeHours: content.donate?.officeHours ?? '',
      inPersonDescription: content.donate?.inPersonDescription ?? '',
    })
    const cremationFund = content.services?.cremationFund ?? {}
    setServicesForm({
      heroTitle: readLocalizedEditorValue(cremationFund.heroTitle, servicesEditorLanguage),
      heroSubtitle: readLocalizedEditorValue(cremationFund.heroSubtitle, servicesEditorLanguage),
      heroImage: cremationFund.heroImage ?? '',
      aboutTitle: readLocalizedEditorValue(cremationFund.aboutTitle, servicesEditorLanguage),
      aboutText: readLocalizedEditorValue(cremationFund.aboutText, servicesEditorLanguage),
      supportText: readLocalizedEditorValue(cremationFund.supportText, servicesEditorLanguage),
      supportImage: cremationFund.supportImage ?? '',
      contactButtonLabel: readLocalizedEditorValue(
        cremationFund.contactButtonLabel,
        servicesEditorLanguage,
      ),
      donateButtonLabel: readLocalizedEditorValue(
        cremationFund.donateButtonLabel,
        servicesEditorLanguage,
      ),
    })
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
    setYouthServicesForm({
      navbar: {
        label: readLocalizedEditorValue(youthEducation.navbar?.label, servicesEditorLanguage) || navbarDefaults.label,
        s1h: readLocalizedEditorValue(youthEducation.navbar?.s1h, servicesEditorLanguage) || navbarDefaults.s1h,
        s2h: readLocalizedEditorValue(youthEducation.navbar?.s2h, servicesEditorLanguage) || navbarDefaults.s2h,
        gurmukhi:
          readLocalizedEditorValue(youthEducation.navbar?.gurmukhi, servicesEditorLanguage) ||
          navbarDefaults.gurmukhi,
        german:
          readLocalizedEditorValue(youthEducation.navbar?.german, servicesEditorLanguage) || navbarDefaults.german,
        camps: readLocalizedEditorValue(youthEducation.navbar?.camps, servicesEditorLanguage) || navbarDefaults.camps,
        registration: readLocalizedEditorValue(
          youthEducation.navbar?.registration,
          servicesEditorLanguage,
        ) || navbarDefaults.registration,
        cremationFund: readLocalizedEditorValue(
          youthEducation.navbar?.cremationFund,
          servicesEditorLanguage,
        ) || navbarDefaults.cremationFund,
        additionalLinks: navbarAdditionalLinks.map((link) => ({
          label: readLocalizedEditorValue(link?.label, servicesEditorLanguage),
          to:
            typeof link?.to === 'string'
              ? link.to
              : readLocalizedEditorValue(link?.to, servicesEditorLanguage),
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
        description: readLocalizedEditorValue(
          youthEducation.gurmukhi?.description,
          servicesEditorLanguage,
        ),
        image: youthEducation.gurmukhi?.image ?? '',
        scheduleTitle: readLocalizedEditorValue(
          youthEducation.gurmukhi?.scheduleTitle,
          servicesEditorLanguage,
        ),
        scheduleDay: readLocalizedEditorValue(
          youthEducation.gurmukhi?.scheduleDay,
          servicesEditorLanguage,
        ),
        scheduleTime: readLocalizedEditorValue(
          youthEducation.gurmukhi?.scheduleTime,
          servicesEditorLanguage,
        ),
        scheduleLocation: readLocalizedEditorValue(
          youthEducation.gurmukhi?.scheduleLocation,
          servicesEditorLanguage,
        ),
        levels: Array.from({ length: 3 }).map((_, index) => ({
          title: readLocalizedEditorValue(gurmukhiLevels[index]?.title, servicesEditorLanguage),
          description: readLocalizedEditorValue(
            gurmukhiLevels[index]?.description,
            servicesEditorLanguage,
          ),
        })),
      },
      german: {
        title: readLocalizedEditorValue(youthEducation.german?.title, servicesEditorLanguage),
        description: readLocalizedEditorValue(youthEducation.german?.description, servicesEditorLanguage),
        image: youthEducation.german?.image ?? '',
        scheduleTitle: readLocalizedEditorValue(
          youthEducation.german?.scheduleTitle,
          servicesEditorLanguage,
        ),
        scheduleDay: readLocalizedEditorValue(youthEducation.german?.scheduleDay, servicesEditorLanguage),
        scheduleTime: readLocalizedEditorValue(youthEducation.german?.scheduleTime, servicesEditorLanguage),
        scheduleLocation: readLocalizedEditorValue(
          youthEducation.german?.scheduleLocation,
          servicesEditorLanguage,
        ),
        tracks: Array.from({ length: 3 }).map((_, index) => ({
          title: readLocalizedEditorValue(germanTracks[index]?.title, servicesEditorLanguage),
          description: readLocalizedEditorValue(
            germanTracks[index]?.description,
            servicesEditorLanguage,
          ),
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
        description: readLocalizedEditorValue(
          youthEducation.registration?.description,
          servicesEditorLanguage,
        ),
        contactButtonLabel: readLocalizedEditorValue(
          youthEducation.registration?.contactButtonLabel,
          servicesEditorLanguage,
        ),
        scheduleButtonLabel: readLocalizedEditorValue(
          youthEducation.registration?.scheduleButtonLabel,
          servicesEditorLanguage,
        ),
      },
      whyEnrollTitle: readLocalizedEditorValue(youthEducation.whyEnrollTitle, servicesEditorLanguage),
      reasons: Array.from({ length: 4 }).map((_, index) => ({
        title: readLocalizedEditorValue(reasons[index]?.title, servicesEditorLanguage),
        text: readLocalizedEditorValue(reasons[index]?.text, servicesEditorLanguage),
      })),
    })
    const aboutUs = content.aboutUs ?? {}
    const nextAboutUsForm = buildAboutUsEditorForm(aboutUs, aboutEditorLanguage)
    setAboutUsForm(nextAboutUsForm)
    setAboutUsSavedSnapshot(JSON.stringify(createAboutUsPayload(nextAboutUsForm)))
    setAboutUsLastSavedAt(new Date())

    setEventDraft(emptyEvent)
    setEditingEventIndex(null)
    setEventImageFile(null)
    setVisitorDrafts({
      rule: '',
      daily: emptyPair,
      langar: emptyPair,
      address: '',
      reach: '',
      faq: emptyFaq,
    })
    setVisitorEditing({
      rule: null,
      daily: null,
      langar: null,
      address: null,
      reach: null,
      faq: null,
    })
    setContactAddressDraft('')
    setEditingContactAddressIndex(null)
    setOpenForms({
      visitorsRule: false,
      visitorsDaily: false,
      visitorsLangar: false,
      visitorsAddress: false,
      visitorsReach: false,
      visitorsFaq: false,
      events: false,
      contactAddress: false,
    })
  }, [
    aboutEditorLanguage,
    buildAboutUsEditorForm,
    content,
    createAboutUsPayload,
    dataUpdatedAt,
    defaultAdditionalServiceLinks,
    defaultServicesNavbarLabels,
    defaultYouthServicesForm,
    emptyEvent,
    emptyFaq,
    emptyPair,
    readLocalizedEditorValue,
    servicesEditorLanguage,
    setAboutUsForm,
    setAboutUsLastSavedAt,
    setAboutUsSavedSnapshot,
    setContactAddressDraft,
    setContactForm,
    setDonateForm,
    setEditingContactAddressIndex,
    setEditingEventIndex,
    setEventDraft,
    setEventImageFile,
    setEventsRows,
    setMediaCardsRows,
    setMediaUpdatesRows,
    setOpenForms,
    setServicesForm,
    setVisitorDrafts,
    setVisitorEditing,
    setVisitorsForm,
    setYouthServicesForm,
    toPairRows,
    toTextRows,
  ])

  useEffect(() => {
    if (!sectionKey) {
      return
    }

    if (sectionKey !== active) {
      setActive(sectionKey)
      setError('')
      setSuccess('')
    }
  }, [active, sectionKey, setActive, setError, setSuccess])

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
  }, [active, location.pathname, menu, navigate, sectionKey, setActive, setError, setSuccess])

  useEffect(() => {
    if (active !== 'services' && activeServicesEditor !== null) {
      setActiveServicesEditor(null)
    }
  }, [active, activeServicesEditor, setActiveServicesEditor])

  useEffect(() => {
    if (activeServicesEditor !== 'youth-page') {
      setActiveYouthServicesEditor('intro')
    }
  }, [activeServicesEditor, setActiveYouthServicesEditor])

  useEffect(() => {
    if (activeYouthServicesEditor !== 'programs') {
      setActiveYouthProgramsEditor('overview')
    }
  }, [activeYouthServicesEditor, setActiveYouthProgramsEditor])

  useEffect(() => {
    if (!error) {
      return
    }

    toast.error(error)
    setError('')
  }, [error, setError, toast])

  useEffect(() => {
    if (!success) {
      return
    }

    toast.success(success)
    setSuccess('')
  }, [setSuccess, success, toast])

  useEffect(() => {
    setProfileForm((prev) => ({
      ...prev,
      email: currentUserEmail,
    }))
  }, [currentUserEmail, setProfileForm])

  useEffect(() => {
    authFailureHandledRef.current = false
  }, [authFailureHandledRef, session?.accessToken])

  useEffect(() => {
    if (!usersQuery.isError || !usersQuery.error) {
      return
    }

    handleRequestErrorRef.current(usersQuery.error, 'Unable to load user accounts.')
  }, [usersQuery.isError, usersQuery.error])
}


