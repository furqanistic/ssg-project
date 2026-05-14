import React from 'react'
import { Plus, Save } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorTimingsEditor = ({
  panel,
  DataTable: TableComponent,
  openForms,
  showForm,
  hideForm,
  actionButtonClass,
  primaryButtonClass,
  getPanelClass,
  visitorDrafts,
  setVisitorDrafts,
  textareaClass,
  inputClass,
  visitorsForm,
  setVisitorsForm,
  startEdit,
  removeVisitorsRow,
  upsertVisitorsPair,
  emptyPair,
  visitorDailyFormRef,
  visitorLangarFormRef,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader icon={panel.icon} title='Opening Timings' description='Manage daily and special kitchen schedules.' />

    <div className='grid grid-cols-1 gap-8'>
      <div className='min-w-0 space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-300'>Daily Darshan</h5>
          <button type='button' onClick={() => showForm('visitorsDaily')} className='flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-[#001da5]'>
            <Plus size={12} /> Add Slot
          </button>
        </div>

        {openForms.visitorsDaily ? (
          <div ref={visitorDailyFormRef} className={getPanelClass('visitors-daily-form')}>
            <div className='grid grid-cols-1 gap-4'>
              <label className='text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                Activity Label
                <input
                  value={visitorDrafts.daily.label}
                  onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, daily: { ...prev.daily, label: event.target.value } }))}
                  className={inputClass}
                />
              </label>
              <label className='text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                Time Range
                <input
                  value={visitorDrafts.daily.value}
                  onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, daily: { ...prev.daily, value: event.target.value } }))}
                  className={inputClass}
                />
              </label>
            </div>
            <div className='mt-4 flex justify-end gap-2'>
              <button type='button' onClick={() => hideForm('visitorsDaily')} className={actionButtonClass}>Cancel</button>
              <button type='button' onClick={() => upsertVisitorsPair('daily', 'daily', 'daily')} className={primaryButtonClass}>
                <Save size={14} className='mr-1.5' />
                Save
              </button>
            </div>
          </div>
        ) : null}

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.daily,
          columns: [{ key: 'label', label: 'Activity' }, { key: 'value', label: 'Time' }],
          emptyMessage: 'No daily times set.',
          alwaysShowActions: true,
          actionButtonStyle: 'labeled',
          onEdit: (index) => startEdit('visitors-daily', index, visitorsForm.daily[index]),
          onDelete: (index) => removeVisitorsRow('daily', index, 'daily', { key: 'daily', value: emptyPair }),
        })}
      </div>

      <div className='min-w-0 space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-300'>Langar (Kitchen)</h5>
          <button type='button' onClick={() => showForm('visitorsLangar')} className='flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-[#001da5]'>
            <Plus size={12} /> Add Slot
          </button>
        </div>

        {openForms.visitorsLangar ? (
          <div ref={visitorLangarFormRef} className={getPanelClass('visitors-langar-form')}>
            <div className='grid grid-cols-1 gap-4'>
              <label className='text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                Meal Type
                <input
                  value={visitorDrafts.langar.label}
                  onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, langar: { ...prev.langar, label: event.target.value } }))}
                  className={inputClass}
                />
              </label>
              <label className='text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                Serving Hours
                <input
                  value={visitorDrafts.langar.value}
                  onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, langar: { ...prev.langar, value: event.target.value } }))}
                  className={inputClass}
                />
              </label>
            </div>
            <div className='mt-4 flex justify-end gap-2'>
              <button type='button' onClick={() => hideForm('visitorsLangar')} className={actionButtonClass}>Cancel</button>
              <button type='button' onClick={() => upsertVisitorsPair('langar', 'langar', 'langar')} className={primaryButtonClass}>
                <Save size={14} className='mr-1.5' />
                Save
              </button>
            </div>
          </div>
        ) : null}

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.langar,
          columns: [{ key: 'label', label: 'Meal' }, { key: 'value', label: 'Hours' }],
          emptyMessage: 'No kitchen times set.',
          alwaysShowActions: true,
          actionButtonStyle: 'labeled',
          onEdit: (index) => startEdit('visitors-langar', index, visitorsForm.langar[index]),
          onDelete: (index) => removeVisitorsRow('langar', index, 'langar', { key: 'langar', value: emptyPair }),
        })}
      </div>
    </div>

    <label className='block text-[13px] font-bold uppercase tracking-widest text-gray-500'>
      Sunday Special Program
      <textarea
        value={visitorsForm.sundaySpecial}
        onChange={(event) => setVisitorsForm((prev) => ({ ...prev, sundaySpecial: event.target.value }))}
        className={textareaClass}
        placeholder='Weekly Kirtan Darbar details...'
      />
    </label>
  </div>
)

export default VisitorTimingsEditor

