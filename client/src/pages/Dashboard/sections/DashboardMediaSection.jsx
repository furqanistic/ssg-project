import React from 'react'

const DashboardMediaSection = ({
  ImageIcon,
  Plus,
  PlusCircle,
  LayoutDashboard,
  DataTable,
  openForms,
  showForm,
  hideForm,
  mediaCardFormRef,
  getPanelClass,
  mediaCardDraft,
  setMediaCardDraft,
  inputClass,
  textareaClass,
  actionButtonClass,
  primaryButtonClass,
  upsertMediaCard,
  editingMediaCardIndex,
  mediaCardsRows,
  startEdit,
  setMediaCardsRows,
  mediaUpdateFormRef,
  mediaUpdateDraft,
  setMediaUpdateDraft,
  upsertMediaUpdate,
  editingMediaUpdateIndex,
  mediaUpdatesRows,
  setMediaUpdatesRows,
}) => {
  return (
    <div className='mt-10 space-y-12'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
          <div className='flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
              <ImageIcon size={20} />
            </div>
            <div>
              <h4 className='text-[15px] font-bold text-gray-900'>Interactive Media Cards</h4>
              <p className='text-[12px] text-gray-400'>Manage the quick-access media categories</p>
            </div>
          </div>
          <button type='button' onClick={() => showForm('mediaCards')} className={actionButtonClass}>
            <Plus size={16} className='mr-2' />
            New Card
          </button>
        </div>

        {openForms.mediaCards ? (
          <div ref={mediaCardFormRef} className={getPanelClass('media-card-form')}>
            <div className='flex items-center gap-3 mb-8'>
              <div className='flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                <LayoutDashboard size={20} />
              </div>
              <h3 className='text-[18px] font-black text-gray-900 tracking-tight'>Card Configuration</h3>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Component ID
                <input
                  value={mediaCardDraft.id}
                  onChange={(event) =>
                    setMediaCardDraft((prev) => ({ ...prev, id: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='e.g. photo-gallery'
                />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Primary Title
                <input
                  value={mediaCardDraft.title}
                  onChange={(event) =>
                    setMediaCardDraft((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='Photo Gallery'
                />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1 md:col-span-2'>
                Action Button Label
                <input
                  value={mediaCardDraft.buttonLabel}
                  onChange={(event) =>
                    setMediaCardDraft((prev) => ({
                      ...prev,
                      buttonLabel: event.target.value,
                    }))
                  }
                  className={inputClass}
                  placeholder='View Photo Albums'
                />
              </label>
            </div>
            <label className='mt-6 block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
              Contextual Description
              <textarea
                value={mediaCardDraft.description}
                onChange={(event) =>
                  setMediaCardDraft((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                className={textareaClass}
                placeholder='Describe what users will find here...'
              />
            </label>

            <div className='mt-8 pt-6 border-t border-white/5 flex gap-3 justify-end'>
              <button type='button' onClick={() => hideForm('mediaCards')} className={actionButtonClass}>
                Discard
              </button>
              <button type='button' onClick={upsertMediaCard} className={primaryButtonClass}>
                {editingMediaCardIndex === null ? 'Create Card' : 'Update Card'}
              </button>
            </div>
          </div>
        ) : null}

        <DataTable
          title='Available Media Categories'
          rows={mediaCardsRows}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'buttonLabel', label: 'Action Button' },
          ]}
          emptyMessage='No media categories defined.'
          onEdit={(index) => startEdit('media-cards', index, mediaCardsRows[index])}
          onDelete={(index) => {
            setMediaCardsRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
          }}
        />
      </div>

      <div className='space-y-6 pt-10 border-t border-gray-100'>
        <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
          <div className='flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
              <ImageIcon size={20} />
            </div>
            <div>
              <h4 className='text-[15px] font-bold text-gray-900'>System Updates</h4>
              <p className='text-[12px] text-gray-400'>Push new content notifications</p>
            </div>
          </div>
          <button type='button' onClick={() => showForm('mediaUpdates')} className={actionButtonClass}>
            <Plus size={16} className='mr-2' />
            New Update
          </button>
        </div>

        {openForms.mediaUpdates ? (
          <div ref={mediaUpdateFormRef} className={getPanelClass('media-update-form')}>
            <div className='flex items-center gap-3 mb-8'>
              <div className='flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                <PlusCircle size={20} />
              </div>
              <h3 className='text-[18px] font-black text-gray-900 tracking-tight'>Update Configuration</h3>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                Headline
                <input
                  value={mediaUpdateDraft.title}
                  onChange={(event) =>
                    setMediaUpdateDraft((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='Vaisakhi 2026 Photo Album'
                />
              </label>
              <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                CTA Label
                <input
                  value={mediaUpdateDraft.action}
                  onChange={(event) =>
                    setMediaUpdateDraft((prev) => ({ ...prev, action: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='View Album'
                />
              </label>
            </div>
            <label className='mt-6 block text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
              Short Description
              <textarea
                value={mediaUpdateDraft.description}
                onChange={(event) =>
                  setMediaUpdateDraft((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                className={textareaClass}
                placeholder='Catchy context for the update...'
              />
            </label>

            <div className='mt-8 pt-6 border-t border-white/5 flex gap-3 justify-end'>
              <button type='button' onClick={() => hideForm('mediaUpdates')} className={actionButtonClass}>
                Discard
              </button>
              <button type='button' onClick={upsertMediaUpdate} className={primaryButtonClass}>
                {editingMediaUpdateIndex === null ? 'Publish Update' : 'Synchronize Update'}
              </button>
            </div>
          </div>
        ) : null}

        <DataTable
          title='Recent Media Feed'
          rows={mediaUpdatesRows}
          columns={[
            { key: 'title', label: 'Headline' },
            { key: 'action', label: 'Call to Action' },
            {
              key: 'description',
              label: 'Context',
              render: (row) => row.description || '<span className="text-white/20">Empty</span>',
            },
          ]}
          emptyMessage='No system updates found.'
          onEdit={(index) => startEdit('media-updates', index, mediaUpdatesRows[index])}
          onDelete={(index) => {
            setMediaUpdatesRows((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
          }}
        />
      </div>
    </div>
  )
}

export default DashboardMediaSection
