// File: client/src/pages/Dashboard/shell/DashboardEditModal.jsx
import React from 'react'
import { Image as ImageIcon, Save, Edit2, X } from 'lucide-react'

const DashboardEditModal = ({
  editModal,
  setEditModal,
  closeEditModal,
  handleModalSave,
  modalImageFile,
  setModalImageFile,
  isUploadingModalImage,
  modalUploadProgress,
  actionButtonClass,
  primaryButtonClass,
  inputClass,
  textareaClass,
  EVENT_EDITOR_CATEGORIES,
  normalizeColorValue,
}) => {
  if (!editModal.open) return null

  const isVisitorsTextEdit = ['visitors-rule', 'visitors-address', 'visitors-reach'].includes(
    editModal.type,
  )
  const isNewVisitorSlot =
    (editModal.type === 'visitors-daily' || editModal.type === 'visitors-langar') &&
    editModal.index < 0
  const isNewVisitorRule = editModal.type === 'visitors-rule' && editModal.index < 0
  const isNewVisitorAddress = editModal.type === 'visitors-address' && editModal.index < 0
  const isNewVisitorReach = editModal.type === 'visitors-reach' && editModal.index < 0
  const isNewVisitorFaq = editModal.type === 'visitors-faq' && editModal.index < 0
  const isNewEvent = editModal.type === 'events' && editModal.index < 0
  const isNewMediaCard = editModal.type === 'media-cards' && editModal.index < 0
  const isNewMediaUpdate = editModal.type === 'media-updates' && editModal.index < 0
  const isNewAboutHistory = editModal.type === 'about-history-section' && editModal.index < 0
  const isNewAboutMissionCard = editModal.type === 'about-mission-card' && editModal.index < 0
  const isNewAboutMissionValue = editModal.type === 'about-mission-value' && editModal.index < 0
  const isNewAboutCommitteeMember =
    editModal.type === 'about-committee-member' && editModal.index < 0
  const isNewAboutGovernanceStructure =
    editModal.type === 'about-governance-structure' && editModal.index < 0
  const isNewAboutGovernanceDocument =
    editModal.type === 'about-governance-document' && editModal.index < 0
  const isNewAboutGovernanceReport =
    editModal.type === 'about-governance-report' && editModal.index < 0
  const modalTitle = isNewVisitorSlot
    ? 'Create Slot'
    : isNewEvent
      ? 'Create Event'
    : isNewMediaCard
      ? 'Create Media Card'
    : isNewMediaUpdate
      ? 'Create System Update'
    : isNewAboutHistory
      ? 'Create History Section'
    : isNewAboutMissionCard
      ? 'Create Mission Card'
    : isNewAboutMissionValue
      ? 'Create Core Value'
    : isNewAboutCommitteeMember
      ? 'Create Committee Member'
    : isNewAboutGovernanceStructure
      ? 'Create Structure Block'
    : isNewAboutGovernanceDocument
      ? 'Create Document'
    : isNewAboutGovernanceReport
      ? 'Create Report'
    : isNewVisitorAddress
      ? 'Create Address Line'
      : isNewVisitorReach
        ? 'Create Route Rule'
      : isNewVisitorFaq
        ? 'Create FAQ'
    : isNewVisitorRule
    ? 'Create Rule'
    : isVisitorsTextEdit
      ? 'Update Rule'
      : 'Update Entry'
  const modalSubtitle = isNewVisitorSlot
    ? 'This new slot will appear on the public visitors page after publish.'
    : isNewEvent
      ? 'This new event will appear on the public events page after publish.'
    : isNewMediaCard
      ? 'This new media card will appear on the public media page after publish.'
    : isNewMediaUpdate
      ? 'This new system update will appear on the public media page after publish.'
    : isNewAboutHistory
      ? 'This new history section will appear after saving.'
    : isNewAboutMissionCard
      ? 'This new mission card will appear after saving.'
    : isNewAboutMissionValue
      ? 'This new core value will appear after saving.'
    : isNewAboutCommitteeMember
      ? 'This new committee member will appear after saving.'
    : isNewAboutGovernanceStructure
      ? 'This new structure block will appear after saving.'
    : isNewAboutGovernanceDocument
      ? 'This new document will appear after saving.'
    : isNewAboutGovernanceReport
      ? 'This new report will appear after saving.'
    : isNewVisitorAddress
      ? 'This new address line will appear on the public visitors page after publish.'
    : isNewVisitorReach
        ? 'This new route rule will appear on the public visitors page after publish.'
      : isNewVisitorFaq
        ? 'This new FAQ entry will appear on the public visitors page after publish.'
    : isNewVisitorRule
    ? 'This new rule will be added to the public visitors page after publish.'
    : isVisitorsTextEdit
    ? 'This change will appear on the public visitors page after publish.'
    : 'Save these changes as a dashboard draft. Use Publish Changes to update the public website.'

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300'>
      <div className='flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_30px_100px_-15px_rgba(0,0,0,0.1)] animate-in zoom-in-95 duration-300'>
        <div className='overflow-y-auto px-8 pb-8 pt-8'>
          <div className='flex items-center gap-4 mb-8 pb-6 border-b border-gray-100'>
            <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
              <Edit2 size={24} />
            </div>
            <div>
              <h3 className='text-[20px] font-bold text-gray-900 tracking-tight'>{modalTitle}</h3>
              <p className='text-[13px] text-gray-500'>{modalSubtitle}</p>
            </div>
            <button onClick={closeEditModal} className='ml-auto h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900'>
              <X size={20} />
            </button>
          </div>

          <div className='space-y-6'>
          {['visitors-rule', 'visitors-address', 'visitors-reach', 'contact-address'].includes(
            editModal.type,
          ) ? (
            <label className='block ml-1'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-[12px] font-bold uppercase tracking-[0.14em] text-gray-500'>
                  Text Content
                </span>
                <span className='text-[11px] font-semibold text-gray-400'>
                  {(editModal.data.text ?? '').trim().length} chars
                </span>
              </div>
              <div className='mt-2 rounded-[14px] border border-gray-200 bg-[#fafbff] p-1.5'>
                <textarea
                  value={editModal.data.text ?? ''}
                  onChange={(event) =>
                    setEditModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, text: event.target.value },
                    }))
                  }
                  className={`${textareaClass} !mt-0 !border-0 !bg-transparent !shadow-none focus:!ring-0`}
                  placeholder='Edit text content...'
                />
              </div>
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

          {editModal.type === 'visitors-faq' ? (
            <div className='space-y-6'>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Question
                <input
                  value={editModal.data.question ?? ''}
                  onChange={(event) =>
                    setEditModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, question: event.target.value },
                    }))
                  }
                  className={inputClass}
                  placeholder='Do I need to be Sikh to visit?'
                />
              </label>
              <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Answer
                <textarea
                  value={editModal.data.answer ?? ''}
                  onChange={(event) =>
                    setEditModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, answer: event.target.value },
                    }))
                  }
                  className={textareaClass}
                  placeholder='Write the public answer...'
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
                      <option key={category} value={category} className='bg-white text-gray-900'>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <div className='md:col-span-2 space-y-3'>
                  <span className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>Event Image</span>
                  <div className='flex items-center gap-3'>
                    <label className='flex-1 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-500 transition-all hover:bg-gray-100 hover:text-[#001da5]'>
                      <ImageIcon size={16} />
                      {modalImageFile ? modalImageFile.name : 'Upload event image'}
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(event) => setModalImageFile(event.target.files?.[0] ?? null)}
                        className='hidden'
                      />
                    </label>
                  </div>
                  {editModal.data.image && (
                    <div className='relative mt-3 rounded-[16px] overflow-hidden border border-gray-200 group h-[180px]'>
                      <img src={editModal.data.image} alt='Current' className='h-full w-full object-cover' />
                      <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                         <p className='text-[12px] font-bold text-white'>Current Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
                  placeholder='Enter event description...'
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
                <label className='md:col-span-2 text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
              <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
              <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
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
                Select file, then click Save Changes. The file uploads and the URL is saved automatically.
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
                Select file, then click Save Changes. The file uploads and the URL is saved automatically.
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

          <div className='mt-10 pt-6 border-t border-gray-100 flex justify-end gap-3'>
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
  )
}

export default DashboardEditModal
