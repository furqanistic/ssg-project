import {
  cleanFaqRows,
  cleanPairRows,
  cleanTextRows,
  createAboutUsPayload,
  createServicePath,
  buildLocalizedAboutUsPayload,
  localizedValueHasContent,
  normalizeColorValue,
  upsertLocalizedValue,
} from '@/pages/Dashboard/shell/dashboardHelpers'
import {
  panelClass,
  emptyPair,
  emptyFaq,
  emptyAdditionalServiceLink,
  emptyEvent,
} from '@/pages/Dashboard/shell/dashboardConstants'

export const useDashboardHandlers = ({
  navigate,
  user,
  session,
  setAuth,
  logout,
  toast,
  active,
  setActive,
  setError,
  setSuccess,
  visitorsForm,
  setVisitorsForm,
  eventsRows,
  setEventsRows,
  mediaCardsRows,
  setMediaCardsRows,
  mediaUpdatesRows,
  setMediaUpdatesRows,
  contactForm,
  setContactForm,
  donateForm,
  servicesForm,
  setServicesForm,
  youthServicesForm,
  setYouthServicesForm,
  aboutUsForm,
  setAboutUsForm,
  setAboutUsSavedSnapshot,
  setAboutUsLastSavedAt,
  eventDraft,
  setEventDraft,
  editingEventIndex,
  setEditingEventIndex,
  eventImageFile,
  setEventImageFile,
  setIsUploadingEventImage,
  visitorDrafts,
  setVisitorDrafts,
  visitorEditing,
  setVisitorEditing,
  contactAddressDraft,
  setContactAddressDraft,
  editingContactAddressIndex,
  setEditingContactAddressIndex,
  setOpenForms,
  editModal,
  setEditModal,
  modalImageFile,
  setModalImageFile,
  setIsUploadingModalImage,
  setModalUploadProgress,
  setIsUploadingAboutImage,
  setUploadingServicesImageField,
  setIsDeletingUserId,
  setDeletingVisitorRuleIndex,
  profileForm,
  setProfileForm,
  newUserForm,
  setNewUserForm,
  content,
  servicesEditorLanguage,
  aboutEditorLanguage,
  authFailureHandledRef,
  updateMutation,
  uploadImageMutation,
  uploadFileMutation,
  updateProfileMutation,
  createUserMutation,
  deleteUserMutation,
  sectionLabel,
}) => {
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

  const buildVisitorsPayload = (form = visitorsForm) => ({
    guide: {
      title: form.guideTitle.trim(),
      body: form.guideBody.trim(),
    },
    rulesEtiquette: cleanTextRows(form.rules),
    openingTimings: {
      dailySchedule: cleanPairRows(form.daily),
      langarSchedule: cleanPairRows(form.langar),
      sundaySpecial: form.sundaySpecial.trim(),
    },
    location: {
      addressLines: cleanTextRows(form.address),
      howToReach: cleanTextRows(form.reach),
    },
    faq: cleanFaqRows(form.faq),
  })

  const isUnauthorizedRequestError = (requestError) => {
    if (requestError?.status === 401) {
      return true
    }

    const message = typeof requestError?.message === 'string' ? requestError.message : ''
    return /authorization token|session expired|invalid or expired/i.test(message)
  }

  const handleRequestError = (requestError, fallbackMessage = 'Request failed. Please try again.') => {
    if (isUnauthorizedRequestError(requestError)) {
      if (!authFailureHandledRef.current) {
        authFailureHandledRef.current = true
        logout()
        toast.error('Your session expired. Please sign in again.')
        navigate('/auth', { replace: true })
      }
      return
    }

    const message =
      typeof requestError?.message === 'string' && requestError.message.trim()
        ? requestError.message
        : fallbackMessage
    setError(message)
  }

  const getPanelClass = () => panelClass

  const saveEventsSection = async (
    rows,
    successMessage = 'Events draft saved locally. Click Publish Changes to update the public website.',
  ) => {
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

    setEventsRows(cleanedRows)
    setSuccess(successMessage)
  }

  const _saveMediaSection = async (rows, groupKey, successMessage) => {
    const isCards = groupKey === 'cards'
    const cleanedCards = isCards
      ? rows
          .map((row) => ({
            id: row.id.trim(),
            title: row.title.trim(),
            description: row.description.trim(),
            buttonLabel: row.buttonLabel.trim(),
          }))
          .filter((row) => row.id || row.title || row.description || row.buttonLabel)
      : mediaCardsRows
          .map((row) => ({
            id: row.id.trim(),
            title: row.title.trim(),
            description: row.description.trim(),
            buttonLabel: row.buttonLabel.trim(),
          }))
          .filter((row) => row.id || row.title || row.description || row.buttonLabel)
    const cleanedUpdates = !isCards
      ? rows
          .map((row) => ({
            title: row.title.trim(),
            description: row.description.trim(),
            action: row.action.trim(),
          }))
          .filter((row) => row.title || row.description || row.action)
      : mediaUpdatesRows
          .map((row) => ({
            title: row.title.trim(),
            description: row.description.trim(),
            action: row.action.trim(),
          }))
          .filter((row) => row.title || row.description || row.action)

    setMediaCardsRows(cleanedCards)
    setMediaUpdatesRows(cleanedUpdates)

    setSuccess(
      successMessage ||
        `${isCards ? 'Media cards' : 'System updates'} draft saved locally. Click Publish Changes to update the public website.`,
    )
  }

  const deleteMediaRowLocal = (groupKey, index) => {
    resetStatus()
    if (groupKey === 'cards') {
      setMediaCardsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
      return
    }
    setMediaUpdatesRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
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
        editingEventIndex === null
          ? 'Event draft added. Click Publish Changes to update the public website.'
          : 'Event draft updated. Click Publish Changes to update the public website.',
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
      const uploaded = await uploadImageMutation.mutateAsync({ file: eventImageFile, section: 'events' })
      setEventDraft((prev) => ({ ...prev, image: uploaded.url || '' }))
      setSuccess('Event image uploaded to Supabase Storage.')
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload event image.')
    } finally {
      setIsUploadingEventImage(false)
    }
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

  const upsertVisitorsFaq = () => {
    resetStatus()
    const question = visitorDrafts.faq.question.trim()
    const answer = visitorDrafts.faq.answer.trim()

    if (!question && !answer) {
      setError('Please enter a question or answer before adding.')
      return
    }

    setVisitorsForm((prev) => ({
      ...prev,
      faq: replaceOrAppend(prev.faq, visitorEditing.faq, { question, answer }),
    }))
    setVisitorDrafts((prev) => ({ ...prev, faq: emptyFaq }))
    setVisitorEditing((prev) => ({ ...prev, faq: null }))
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

  const removeVisitorsFaq = (index, draftReset) => {
    setVisitorsForm((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, itemIndex) => itemIndex !== index),
    }))

    if (visitorEditing.faq === index) {
      setVisitorEditing((prev) => ({ ...prev, faq: null }))
      setVisitorDrafts((prev) => ({ ...prev, faq: draftReset }))
    }
  }

  const deleteVisitorsRule = async (index) => {
    resetStatus()
    const nextVisitors = {
      ...visitorsForm,
      rules: visitorsForm.rules.filter((_, itemIndex) => itemIndex !== index),
    }

    setDeletingVisitorRuleIndex(index)
    setVisitorsForm(nextVisitors)
    setSuccess('Rule draft deleted. Click Publish Changes to update the public website.')
    setDeletingVisitorRuleIndex(null)
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
      const uploaded = await uploadImageMutation.mutateAsync({ file, section: 'aboutUs' })
      applyUrl(uploaded.url || '')
      setSuccess(successMessage)
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload image.')
    } finally {
      setIsUploadingAboutImage(false)
    }
  }

  const uploadServicesImage = async (file, field) => {
    resetStatus()
    if (!file) {
      setError('Please choose an image file first.')
      return
    }

    try {
      setUploadingServicesImageField(field)
      const uploaded = await uploadImageMutation.mutateAsync({ file, section: 'services' })
      setServicesForm((prev) => ({ ...prev, [field]: uploaded.url || '' }))
      setSuccess('Service image uploaded to Supabase Storage.')
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload image.')
    } finally {
      setUploadingServicesImageField('')
    }
  }

  const updateYouthServicesField = (path, value) => {
    setYouthServicesForm((prev) => {
      const keys = path.split('.')
      const next = { ...prev }
      let cursor = next

      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i]
        const isArrayKey = Number.isInteger(Number(key))

        if (isArrayKey) {
          const arrayIndex = Number(key)
          cursor[arrayIndex] = { ...(cursor[arrayIndex] ?? {}) }
          cursor = cursor[arrayIndex]
          continue
        }

        const currentValue = cursor[key]
        if (Array.isArray(currentValue)) {
          cursor[key] = [...currentValue]
        } else {
          cursor[key] = { ...(currentValue ?? {}) }
        }
        cursor = cursor[key]
      }

      const lastKey = keys[keys.length - 1]
      if (Number.isInteger(Number(lastKey))) {
        cursor[Number(lastKey)] = value
      } else {
        cursor[lastKey] = value
      }

      return next
    })
  }

  const addAdditionalServiceLink = () => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: [...(prev.navbar.additionalLinks ?? []), emptyAdditionalServiceLink],
      },
    }))
  }

  const removeAdditionalServiceLink = (indexToRemove) => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: (prev.navbar.additionalLinks ?? []).filter((_, index) => index !== indexToRemove),
      },
    }))
  }

  const updateAdditionalServiceLabel = (index, value) => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: (prev.navbar.additionalLinks ?? []).map((link, linkIndex) => {
          if (linkIndex !== index) {
            return link
          }

          return {
            ...link,
            label: value,
            pageTitle: link.pageTitle || value,
            to: link.to || createServicePath(value),
          }
        }),
      },
    }))
  }

  const patchAdditionalServiceLink = (index, patch) => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: (prev.navbar.additionalLinks ?? []).map((link, linkIndex) =>
          linkIndex === index ? { ...link, ...patch } : link,
        ),
      },
    }))
  }

  const uploadYouthServicesImage = async (file, fieldPath) => {
    resetStatus()
    if (!file) {
      setError('Please choose an image file first.')
      return
    }

    try {
      setUploadingServicesImageField(fieldPath)
      const uploaded = await uploadImageMutation.mutateAsync({ file, section: 'services' })
      updateYouthServicesField(fieldPath, uploaded.url || '')
      setSuccess('Youth image uploaded to Supabase Storage.')
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to upload image.')
    } finally {
      setUploadingServicesImageField('')
    }
  }

  const uploadAdditionalServiceLinkImage = async (file, linkIndex, imageIndex) => {
    await uploadYouthServicesImage(file, `navbar.additionalLinks.${linkIndex}.pageImages.${imageIndex}`)
  }

  const addAdditionalServiceLinkImage = (linkIndex) => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: (prev.navbar.additionalLinks ?? []).map((link, index) => {
          if (index !== linkIndex) return link
          return {
            ...link,
            pageImages: [...(Array.isArray(link.pageImages) ? link.pageImages : []), ''],
          }
        }),
      },
    }))
  }

  const removeAdditionalServiceLinkImage = (linkIndex, imageIndexToRemove) => {
    setYouthServicesForm((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        additionalLinks: (prev.navbar.additionalLinks ?? []).map((link, index) => {
          if (index !== linkIndex) return link
          const nextImages = (Array.isArray(link.pageImages) ? link.pageImages : []).filter(
            (_, imageIndex) => imageIndex !== imageIndexToRemove,
          )
          return {
            ...link,
            pageImages: nextImages.length > 0 ? nextImages : [''],
          }
        }),
      },
    }))
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
      const response = await updateProfileMutation.mutateAsync({
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
      handleRequestError(requestError, 'Failed to update profile.')
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
      await createUserMutation.mutateAsync({
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
    } catch (requestError) {
      handleRequestError(requestError, 'Failed to create user.')
    }
  }

  const handleDeleteUser = async (targetUser) => {
    resetStatus()

    if (!session?.accessToken) {
      setError('You need to login again to delete users.')
      return
    }

    const targetId = (targetUser?.id ?? '').trim()
    const targetEmail = (targetUser?.email ?? '').trim()
    const currentUserId = (user?.id ?? '').trim()

    if (!targetId) {
      setError('Unable to delete this user because id is missing.')
      return
    }

    if (currentUserId && targetId === currentUserId) {
      setError('You cannot delete your own account.')
      return
    }

    const confirmDelete = window.confirm(
      `Delete user "${targetEmail || targetId}"? This action cannot be undone.`,
    )

    if (!confirmDelete) {
      return
    }

    try {
      setIsDeletingUserId(targetId)
      await deleteUserMutation.mutateAsync({
        token: session.accessToken,
        userId: targetId,
      })
      setSuccess('User deleted successfully.')
    } catch (requestError) {
      handleRequestError(requestError, 'Failed to delete user.')
    } finally {
      setIsDeletingUserId('')
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
        const uploaded = await uploadImageMutation.mutateAsync({
          file: modalImageFile,
          section: type === 'events' ? 'events' : 'aboutUs',
        })
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
        const uploaded = await uploadFileMutation.mutateAsync({
          file: modalImageFile,
          section: type === 'about-governance-document'
            ? 'aboutUs/governance-documents'
            : 'aboutUs/governance-reports',
          onProgress: (percent) => setModalUploadProgress(percent),
        })
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
        type === 'visitors-reach' ||
        type === 'visitors-faq'
      ) {
        const nextVisitors = {
          ...visitorsForm,
          rules:
            type === 'visitors-rule'
              ? index < 0
                ? [...visitorsForm.rules, { text: nextData.text ?? '' }]
                : visitorsForm.rules.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.rules,
          daily:
            type === 'visitors-daily'
              ? index < 0
                ? [...visitorsForm.daily, { label: nextData.label ?? '', value: nextData.value ?? '' }]
                : visitorsForm.daily.map((row, i) =>
                    i === index ? { label: nextData.label ?? '', value: nextData.value ?? '' } : row,
                  )
              : visitorsForm.daily,
          langar:
            type === 'visitors-langar'
              ? index < 0
                ? [...visitorsForm.langar, { label: nextData.label ?? '', value: nextData.value ?? '' }]
                : visitorsForm.langar.map((row, i) =>
                    i === index ? { label: nextData.label ?? '', value: nextData.value ?? '' } : row,
                  )
              : visitorsForm.langar,
          address:
            type === 'visitors-address'
              ? index < 0
                ? [...visitorsForm.address, { text: nextData.text ?? '' }]
                : visitorsForm.address.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.address,
          reach:
            type === 'visitors-reach'
              ? index < 0
                ? [...visitorsForm.reach, { text: nextData.text ?? '' }]
                : visitorsForm.reach.map((row, i) => (i === index ? { text: nextData.text ?? '' } : row))
              : visitorsForm.reach,
          faq:
            type === 'visitors-faq'
              ? index < 0
                ? [...visitorsForm.faq, { question: nextData.question ?? '', answer: nextData.answer ?? '' }]
                : visitorsForm.faq.map((row, i) =>
                    i === index ? { question: nextData.question ?? '', answer: nextData.answer ?? '' } : row,
                  )
              : visitorsForm.faq,
        }

        setVisitorsForm(nextVisitors)
      }

      if (type === 'events') {
        const nextEvents =
          index < 0
            ? [...eventsRows, { ...nextData }]
                : eventsRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
        setEventsRows(nextEvents)
      }

      if (type === 'media-cards' || type === 'media-updates') {
        const nextMediaCards =
          type === 'media-cards'
            ? index < 0
              ? [...mediaCardsRows, { ...nextData }]
              : mediaCardsRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
            : mediaCardsRows
        const nextMediaUpdates =
          type === 'media-updates'
            ? index < 0
              ? [...mediaUpdatesRows, { ...nextData }]
              : mediaUpdatesRows.map((row, i) => (i === index ? { ...row, ...nextData } : row))
            : mediaUpdatesRows

        setMediaCardsRows(nextMediaCards)
        setMediaUpdatesRows(nextMediaUpdates)
      }

      if (type === 'contact-address') {
        const nextContact = {
          ...contactForm,
          address: contactForm.address.map((row, i) =>
            i === index ? { text: nextData.text ?? '' } : row,
          ),
        }
        setContactForm(nextContact)
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
      }

      closeEditModal()
      setSuccess(
        isAboutModalType
          ? 'Draft updated. Click Save About Page or Publish Changes to apply publicly.'
          : 'Draft updated. Click Publish Changes to update the public website.',
      )
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
          data: buildVisitorsPayload(),
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

      if (active === 'donate') {
        await updateMutation.mutateAsync({
          section: 'donate',
          data: {
            bankName: donateForm.bankName.trim(),
            accountHolder: donateForm.accountHolder.trim(),
            iban: donateForm.iban.trim(),
            bic: donateForm.bic.trim(),
            officeHours: donateForm.officeHours.trim(),
            inPersonDescription: donateForm.inPersonDescription.trim(),
          },
        })
      }

      if (active === 'services') {
        const existingServices = content?.services ?? {}
        const existingCremation = existingServices.cremationFund ?? {}
        const existingYouth = existingServices.youthEducation ?? {}
        const language = servicesEditorLanguage

        await updateMutation.mutateAsync({
          section: 'services',
          data: {
            cremationFund: {
              heroTitle: upsertLocalizedValue(existingCremation.heroTitle, language, servicesForm.heroTitle),
              heroSubtitle: upsertLocalizedValue(
                existingCremation.heroSubtitle,
                language,
                servicesForm.heroSubtitle,
              ),
              heroImage: servicesForm.heroImage.trim(),
              aboutTitle: upsertLocalizedValue(existingCremation.aboutTitle, language, servicesForm.aboutTitle),
              aboutText: upsertLocalizedValue(existingCremation.aboutText, language, servicesForm.aboutText),
              supportText: upsertLocalizedValue(
                existingCremation.supportText,
                language,
                servicesForm.supportText,
              ),
              supportImage: servicesForm.supportImage.trim(),
              contactButtonLabel: upsertLocalizedValue(
                existingCremation.contactButtonLabel,
                language,
                servicesForm.contactButtonLabel,
              ),
              donateButtonLabel: upsertLocalizedValue(
                existingCremation.donateButtonLabel,
                language,
                servicesForm.donateButtonLabel,
              ),
            },
            youthEducation: {
              navbar: {
                label: upsertLocalizedValue(existingYouth.navbar?.label, language, youthServicesForm.navbar.label),
                s1h: upsertLocalizedValue(existingYouth.navbar?.s1h, language, youthServicesForm.navbar.s1h),
                s2h: upsertLocalizedValue(existingYouth.navbar?.s2h, language, youthServicesForm.navbar.s2h),
                gurmukhi: upsertLocalizedValue(
                  existingYouth.navbar?.gurmukhi,
                  language,
                  youthServicesForm.navbar.gurmukhi,
                ),
                german: upsertLocalizedValue(
                  existingYouth.navbar?.german,
                  language,
                  youthServicesForm.navbar.german,
                ),
                camps: upsertLocalizedValue(existingYouth.navbar?.camps, language, youthServicesForm.navbar.camps),
                registration: upsertLocalizedValue(
                  existingYouth.navbar?.registration,
                  language,
                  youthServicesForm.navbar.registration,
                ),
                cremationFund: upsertLocalizedValue(
                  existingYouth.navbar?.cremationFund,
                  language,
                  youthServicesForm.navbar.cremationFund,
                ),
                additionalLinks: (youthServicesForm.navbar.additionalLinks ?? [])
                  .map((link, index) => ({
                    label: upsertLocalizedValue(
                      existingYouth.navbar?.additionalLinks?.[index]?.label,
                      language,
                      link.label,
                    ),
                    to: upsertLocalizedValue(
                      existingYouth.navbar?.additionalLinks?.[index]?.to,
                      language,
                      link.to,
                    ),
                    pageTitle: upsertLocalizedValue(
                      existingYouth.navbar?.additionalLinks?.[index]?.pageTitle,
                      language,
                      link.pageTitle,
                    ),
                    pageSubtitle: upsertLocalizedValue(
                      existingYouth.navbar?.additionalLinks?.[index]?.pageSubtitle,
                      language,
                      link.pageSubtitle,
                    ),
                    pageContent: upsertLocalizedValue(
                      existingYouth.navbar?.additionalLinks?.[index]?.pageContent,
                      language,
                      link.pageContent,
                    ),
                    pageImages: (Array.isArray(link.pageImages) ? link.pageImages : [])
                      .map((image) => (typeof image === 'string' ? image.trim() : ''))
                      .filter(Boolean),
                  }))
                  .filter(
                    (link) => localizedValueHasContent(link.label) && localizedValueHasContent(link.to),
                  ),
              },
              heading: upsertLocalizedValue(existingYouth.heading, language, youthServicesForm.heading),
              subtitle: upsertLocalizedValue(existingYouth.subtitle, language, youthServicesForm.subtitle),
              intro: upsertLocalizedValue(existingYouth.intro, language, youthServicesForm.intro),
              gurmukhi: {
                title: upsertLocalizedValue(
                  existingYouth.gurmukhi?.title,
                  language,
                  youthServicesForm.gurmukhi.title,
                ),
                description: upsertLocalizedValue(
                  existingYouth.gurmukhi?.description,
                  language,
                  youthServicesForm.gurmukhi.description,
                ),
                image: youthServicesForm.gurmukhi.image.trim(),
                scheduleTitle: upsertLocalizedValue(
                  existingYouth.gurmukhi?.scheduleTitle,
                  language,
                  youthServicesForm.gurmukhi.scheduleTitle,
                ),
                scheduleDay: upsertLocalizedValue(
                  existingYouth.gurmukhi?.scheduleDay,
                  language,
                  youthServicesForm.gurmukhi.scheduleDay,
                ),
                scheduleTime: upsertLocalizedValue(
                  existingYouth.gurmukhi?.scheduleTime,
                  language,
                  youthServicesForm.gurmukhi.scheduleTime,
                ),
                scheduleLocation: upsertLocalizedValue(
                  existingYouth.gurmukhi?.scheduleLocation,
                  language,
                  youthServicesForm.gurmukhi.scheduleLocation,
                ),
                levels: youthServicesForm.gurmukhi.levels
                  .map((item, index) => ({
                    title: upsertLocalizedValue(
                      existingYouth.gurmukhi?.levels?.[index]?.title,
                      language,
                      item.title,
                    ),
                    description: upsertLocalizedValue(
                      existingYouth.gurmukhi?.levels?.[index]?.description,
                      language,
                      item.description,
                    ),
                  }))
                  .filter((item) => localizedValueHasContent(item.title) || localizedValueHasContent(item.description)),
              },
              german: {
                title: upsertLocalizedValue(existingYouth.german?.title, language, youthServicesForm.german.title),
                description: upsertLocalizedValue(
                  existingYouth.german?.description,
                  language,
                  youthServicesForm.german.description,
                ),
                image: youthServicesForm.german.image.trim(),
                scheduleTitle: upsertLocalizedValue(
                  existingYouth.german?.scheduleTitle,
                  language,
                  youthServicesForm.german.scheduleTitle,
                ),
                scheduleDay: upsertLocalizedValue(
                  existingYouth.german?.scheduleDay,
                  language,
                  youthServicesForm.german.scheduleDay,
                ),
                scheduleTime: upsertLocalizedValue(
                  existingYouth.german?.scheduleTime,
                  language,
                  youthServicesForm.german.scheduleTime,
                ),
                scheduleLocation: upsertLocalizedValue(
                  existingYouth.german?.scheduleLocation,
                  language,
                  youthServicesForm.german.scheduleLocation,
                ),
                tracks: youthServicesForm.german.tracks
                  .map((item, index) => ({
                    title: upsertLocalizedValue(
                      existingYouth.german?.tracks?.[index]?.title,
                      language,
                      item.title,
                    ),
                    description: upsertLocalizedValue(
                      existingYouth.german?.tracks?.[index]?.description,
                      language,
                      item.description,
                    ),
                  }))
                  .filter((item) => localizedValueHasContent(item.title) || localizedValueHasContent(item.description)),
              },
              camps: {
                title: upsertLocalizedValue(existingYouth.camps?.title, language, youthServicesForm.camps.title),
                subtitle: upsertLocalizedValue(
                  existingYouth.camps?.subtitle,
                  language,
                  youthServicesForm.camps.subtitle,
                ),
                cards: youthServicesForm.camps.cards
                  .map((item, index) => ({
                    title: upsertLocalizedValue(
                      existingYouth.camps?.cards?.[index]?.title,
                      language,
                      item.title,
                    ),
                    description: upsertLocalizedValue(
                      existingYouth.camps?.cards?.[index]?.description,
                      language,
                      item.description,
                    ),
                    time: upsertLocalizedValue(
                      existingYouth.camps?.cards?.[index]?.time,
                      language,
                      item.time,
                    ),
                  }))
                  .filter(
                    (item) =>
                      localizedValueHasContent(item.title) ||
                      localizedValueHasContent(item.description) ||
                      localizedValueHasContent(item.time),
                  ),
              },
              registration: {
                title: upsertLocalizedValue(
                  existingYouth.registration?.title,
                  language,
                  youthServicesForm.registration.title,
                ),
                description: upsertLocalizedValue(
                  existingYouth.registration?.description,
                  language,
                  youthServicesForm.registration.description,
                ),
                contactButtonLabel: upsertLocalizedValue(
                  existingYouth.registration?.contactButtonLabel,
                  language,
                  youthServicesForm.registration.contactButtonLabel,
                ),
                scheduleButtonLabel: upsertLocalizedValue(
                  existingYouth.registration?.scheduleButtonLabel,
                  language,
                  youthServicesForm.registration.scheduleButtonLabel,
                ),
              },
              whyEnrollTitle: upsertLocalizedValue(
                existingYouth.whyEnrollTitle,
                language,
                youthServicesForm.whyEnrollTitle,
              ),
              reasons: youthServicesForm.reasons
                .map((item, index) => ({
                  title: upsertLocalizedValue(
                    existingYouth.reasons?.[index]?.title,
                    language,
                    item.title,
                  ),
                  text: upsertLocalizedValue(existingYouth.reasons?.[index]?.text, language, item.text),
                }))
                .filter((item) => localizedValueHasContent(item.title) || localizedValueHasContent(item.text)),
            },
          },
        })
      }

      if (active === 'about-us') {
        await updateMutation.mutateAsync({
          section: 'aboutUs',
          data: buildAboutUsPayload(aboutUsForm, content?.aboutUs ?? {}, aboutEditorLanguage),
        })
        setAboutUsSavedSnapshot(JSON.stringify(createAboutUsPayload(aboutUsForm)))
        setAboutUsLastSavedAt(new Date())
      }

      setSuccess(`${sectionLabel} changes published successfully.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const buildAboutUsPayload = (
    sourceForm = aboutUsForm,
    existingAboutUs = content?.aboutUs ?? {},
    language = aboutEditorLanguage,
  ) => buildLocalizedAboutUsPayload(sourceForm, existingAboutUs, language)

  const saveAboutUsNonPopupSection = async (sectionLabel = 'About section') => {
    setError('')
    setSuccess(
      `${sectionLabel} draft updated. Click top "Publish Changes" to push updates to the public website.`,
    )
  }

  const saveLocalDraft = (draftLabel = sectionLabel) => {
    setError('')
    setSuccess(`${draftLabel} draft saved locally. Click Publish Changes to update the public website.`)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  return {
    startEdit,
    closeEditModal,
    switchSection,
    showForm,
    hideForm,
    replaceOrAppend,
    resetStatus,
    buildVisitorsPayload,
    isUnauthorizedRequestError,
    handleRequestError,
    getPanelClass,
    saveEventsSection,
    _saveMediaSection,
    deleteMediaRowLocal,
    upsertEvent,
    uploadEventImage,
    upsertVisitorsText,
    upsertVisitorsPair,
    upsertVisitorsFaq,
    removeVisitorsRow,
    removeVisitorsFaq,
    deleteVisitorsRule,
    upsertContactAddress,
    updateAboutUsText,
    removeAboutUsArrayItem,
    uploadAboutImage,
    uploadServicesImage,
    updateYouthServicesField,
    addAdditionalServiceLink,
    removeAdditionalServiceLink,
    updateAdditionalServiceLabel,
    patchAdditionalServiceLink,
    uploadYouthServicesImage,
    uploadAdditionalServiceLinkImage,
    addAdditionalServiceLinkImage,
    removeAdditionalServiceLinkImage,
    handleProfileUpdate,
    handleCreateUser,
    handleDeleteUser,
    handleModalSave,
    onSave,
    buildAboutUsPayload,
    saveAboutUsNonPopupSection,
    saveLocalDraft,
    handleLogout,
  }
}

export default useDashboardHandlers
