import React from 'react'

const EVENT_GROUPS = [
  {
    key: 'daily',
    title: 'Daily Programs',
    description: 'Programs that should appear under the Daily tab on the Events page.',
  },
  {
    key: 'weekly',
    title: 'Weekly Programs',
    description: 'Recurring weekly sangat activities, classes, and gatherings.',
  },
  {
    key: 'monthly',
    title: 'Monthly Programs',
    description: 'Programs that happen once each month or on a regular monthly cycle.',
  },
  {
    key: 'yearly',
    title: 'Yearly Celebrations',
    description: 'Major annual events like gurpurabs, Vaisakhi, and other large celebrations.',
  },
]

const DashboardEventsSection = ({
  Calendar: calendarIcon,
  Plus: plusIcon,
  ImageIcon,
  Trash2,
  DataTable: dataTableComponent,
  actionButtonClass,
  showForm,
  openForms,
  eventFormRef,
  getPanelClass,
  eventDraft,
  setEventDraft,
  inputClass,
  EVENT_CATEGORIES,
  eventImageFile,
  setEventImageFile,
  uploadEventImage,
  isUploadingEventImage,
  textareaClass,
  hideForm,
  editingEventIndex,
  setEditingEventIndex,
  emptyEvent,
  upsertEvent,
  primaryButtonClass,
  eventsRows,
  startEdit,
  setEventsRows,
}) => {
  const eventEditorCategories = EVENT_CATEGORIES.filter((category) => category !== 'all')

  const openNewEventForm = (category = 'yearly') => {
    setEditingEventIndex(null)
    setEventImageFile(null)
    setEventDraft({ ...emptyEvent, category })
    showForm('events')
  }

  const getCategoryRows = (category) =>
    eventsRows.reduce((accumulator, row, index) => {
      if ((row.category ?? '').trim().toLowerCase() === category) {
        accumulator.push({ row, index })
      }
      return accumulator
    }, [])

  const uncategorizedRows = eventsRows.reduce((accumulator, row, index) => {
    const category = (row.category ?? '').trim().toLowerCase()
    if (!eventEditorCategories.includes(category)) {
      accumulator.push({ row, index })
    }
    return accumulator
  }, [])

  return (
    <div className='mt-10 space-y-8'>
      <div className='rounded-[22px] border border-gray-100 bg-white p-6'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div className='flex items-start gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#001da5]/10 bg-[#001da5]/5 text-[#001da5]'>
              {React.createElement(calendarIcon, { size: 20 })}
            </div>
            <div>
              <h3 className='text-[20px] font-bold tracking-tight text-gray-900'>Events Content</h3>
              <p className='mt-1 max-w-2xl text-[13px] leading-6 text-gray-500'>
                Everything in this section publishes to Supabase and is read back through React
                Query on the public website. Organize events by program type so the page stays easy
                to maintain.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
            {EVENT_GROUPS.map((group) => (
              <div key={group.key} className='rounded-[16px] border border-gray-100 bg-gray-50 px-4 py-3'>
                <p className='text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400'>
                  {group.key}
                </p>
                <p className='mt-2 text-[24px] font-black tracking-tight text-gray-900'>
                  {getCategoryRows(group.key).length}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 flex flex-wrap gap-3'>
          {EVENT_GROUPS.map((group) => (
            <button
              key={`create-${group.key}`}
              type='button'
              onClick={() => openNewEventForm(group.key)}
              className={actionButtonClass}
            >
              {React.createElement(plusIcon, { size: 16, className: 'mr-2' })}
              Add {group.title.replace('Programs', 'Program').replace('Celebrations', 'Event')}
            </button>
          ))}
        </div>
      </div>

      {openForms.events ? (
        <div ref={eventFormRef} className={`${getPanelClass('events-form')} !p-0 border-gray-100 shadow-xl`}>
          <div className='rounded-t-[24px] border-b border-gray-100 bg-gray-50 p-8'>
            <h3 className='text-[20px] font-black tracking-tight text-gray-900'>
              {editingEventIndex === null ? 'Create Event' : 'Update Event'}
            </h3>
            <p className='text-[13px] font-medium text-gray-400'>
              Fill out the event details. This entry will be saved to Supabase when you publish
              changes.
            </p>
          </div>

          <div className='space-y-8 p-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <label className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
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
              <label className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
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
              <label className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
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
              <label className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
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
              <label className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
                Event Category
                <select
                  value={eventEditorCategories.includes(eventDraft.category) ? eventDraft.category : 'yearly'}
                  onChange={(event) =>
                    setEventDraft((prev) => ({ ...prev, category: event.target.value }))
                  }
                  className={inputClass}
                >
                  {eventEditorCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
              <div className='space-y-3'>
                <span className='ml-1 text-[13px] font-bold uppercase tracking-widest text-gray-500'>
                  Cover Image
                </span>
                <div className='flex items-center gap-3'>
                  <label className='flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[12px] border border-gray-100 bg-gray-50 px-4 text-[14px] text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900'>
                    {React.createElement(ImageIcon, { size: 16, className: 'mr-2 font-bold' })}
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

            {eventDraft.image ? (
              <div className='group relative overflow-hidden rounded-[16px] border border-gray-100'>
                <img
                  src={eventDraft.image}
                  alt='Event preview'
                  className='h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent' />
                <button
                  type='button'
                  onClick={() => setEventDraft((prev) => ({ ...prev, image: '' }))}
                  className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 transition-opacity group-hover:opacity-100'
                >
                  {React.createElement(Trash2, { size: 16 })}
                </button>
              </div>
            ) : null}

            <label className='ml-1 block text-[13px] font-bold uppercase tracking-widest text-gray-500'>
              Full Description
              <textarea
                value={eventDraft.description}
                onChange={(event) =>
                  setEventDraft((prev) => ({ ...prev, description: event.target.value }))
                }
                className={textareaClass}
                placeholder='Describe the event, its significance, and what visitors should expect.'
              />
            </label>

            <div className='flex justify-end gap-3 pt-4'>
              <button type='button' onClick={() => hideForm('events')} className={actionButtonClass}>
                Discard
              </button>
              {editingEventIndex !== null ? (
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
              ) : null}
              <button type='button' onClick={upsertEvent} className={primaryButtonClass}>
                {React.createElement(plusIcon, { size: 16, className: 'mr-2' })}
                {editingEventIndex === null ? 'Add Event to Draft' : 'Update Event Draft'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {EVENT_GROUPS.map((group) => {
        const groupedRows = getCategoryRows(group.key)

        return (
          <div key={group.key} className='rounded-[22px] border border-gray-100 bg-white p-6'>
            <div className='mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <div>
                <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>{group.title}</h4>
                <p className='mt-1 text-[12px] text-gray-500'>{group.description}</p>
              </div>
              <button
                type='button'
                onClick={() => openNewEventForm(group.key)}
                className={actionButtonClass}
              >
                {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })}
                Add {group.key.charAt(0).toUpperCase() + group.key.slice(1)} Event
              </button>
            </div>

            {React.createElement(dataTableComponent, {
              title: `${group.title} Table`,
              rows: groupedRows.map((item) => item.row),
              columns: [
                { key: 'title', label: 'Title' },
                { key: 'date', label: 'Date' },
                { key: 'time', label: 'Time' },
                { key: 'location', label: 'Location' },
              ],
              emptyMessage: `No ${group.key} events added yet.`,
              onEdit: (index) => startEdit('events', groupedRows[index].index, groupedRows[index].row),
              onDelete: (index) => {
                const targetIndex = groupedRows[index].index
                setEventsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== targetIndex))
                if (editingEventIndex === targetIndex) {
                  setEditingEventIndex(null)
                  setEventDraft(emptyEvent)
                }
              },
            })}
          </div>
        )
      })}

      {uncategorizedRows.length > 0 ? (
        <div className='rounded-[22px] border border-amber-200 bg-amber-50 p-6'>
          <div className='mb-5'>
            <h4 className='text-[18px] font-bold tracking-tight text-amber-900'>Needs Category Review</h4>
            <p className='mt-1 text-[12px] text-amber-800'>
              These events have an old or unsupported category value. Edit them and assign a proper
              category so they appear in the right tab.
            </p>
          </div>

          {React.createElement(dataTableComponent, {
            title: 'Uncategorized Events',
            rows: uncategorizedRows.map((item) => item.row),
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'date', label: 'Date' },
              { key: 'time', label: 'Time' },
              { key: 'category', label: 'Current Category' },
            ],
            emptyMessage: 'All events are categorized correctly.',
            onEdit: (index) =>
              startEdit('events', uncategorizedRows[index].index, uncategorizedRows[index].row),
            onDelete: (index) => {
              const targetIndex = uncategorizedRows[index].index
              setEventsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== targetIndex))
              if (editingEventIndex === targetIndex) {
                setEditingEventIndex(null)
                setEventDraft(emptyEvent)
              }
            },
          })}
        </div>
      ) : null}
    </div>
  )
}

export default DashboardEventsSection
