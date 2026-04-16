import React from 'react'

const DashboardEventsSection = ({
  Calendar,
  Plus,
  ImageIcon,
  Trash2,
  DataTable,
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
  return (
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
                <input value={eventDraft.title} onChange={(event) => setEventDraft((prev) => ({ ...prev, title: event.target.value }))} className={inputClass} placeholder='e.g. Vaisakhi Celebration 2026' />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Scheduled Date
                <input value={eventDraft.date} onChange={(event) => setEventDraft((prev) => ({ ...prev, date: event.target.value }))} className={inputClass} placeholder='April 14, 2026' />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Timing
                <input value={eventDraft.time} onChange={(event) => setEventDraft((prev) => ({ ...prev, time: event.target.value }))} className={inputClass} placeholder='9:00 AM - 6:00 PM' />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Specific Location
                <input value={eventDraft.location} onChange={(event) => setEventDraft((prev) => ({ ...prev, location: event.target.value }))} className={inputClass} placeholder='Gurdwara Main Hall' />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Event Category
                <select value={eventDraft.category} onChange={(event) => setEventDraft((prev) => ({ ...prev, category: event.target.value }))} className={inputClass}>
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
                    <input type='file' accept='image/*' onChange={(event) => setEventImageFile(event.target.files?.[0] ?? null)} className='hidden' />
                  </label>
                  <button type='button' onClick={uploadEventImage} disabled={isUploadingEventImage || !eventImageFile} className={actionButtonClass}>
                    {isUploadingEventImage ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>

            {eventDraft.image && (
              <div className='relative rounded-[16px] overflow-hidden border border-gray-100 group'>
                <img src={eventDraft.image} alt='Event preview' className='h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent' />
                <button type='button' onClick={() => setEventDraft((prev) => ({ ...prev, image: '' }))} className='absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-red-500/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
              Full Description
              <textarea value={eventDraft.description} onChange={(event) => setEventDraft((prev) => ({ ...prev, description: event.target.value }))} className={textareaClass} placeholder='Elaborate on the significance and itinerary of the event...' />
            </label>

            <div className='flex justify-end gap-3 pt-4'>
              <button type='button' onClick={() => hideForm('events')} className={actionButtonClass}>
                Discard
              </button>
              {editingEventIndex !== null && (
                <button type='button' onClick={() => {
                  setEditingEventIndex(null)
                  setEventDraft(emptyEvent)
                }} className={actionButtonClass}>
                  Cancel Modification
                </button>
              )}
              <button type='button' onClick={upsertEvent} className={primaryButtonClass}>
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
  )
}

export default DashboardEventsSection
