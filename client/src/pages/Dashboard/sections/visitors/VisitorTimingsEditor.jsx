import React from 'react'
import { Plus } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorTimingsEditor = ({
  panel,
  DataTable: TableComponent,
  textareaClass,
  visitorsForm,
  setVisitorsForm,
  startEdit,
  removeVisitorsRow,
  emptyPair,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader icon={panel.icon} title='Opening Timings' description='Manage daily and special kitchen schedules.' />

    <div className='grid grid-cols-1 gap-8'>
      <div className='min-w-0 space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-500'>Daily Darshan</h5>
          <button
            type='button'
            onClick={() => startEdit('visitors-daily', -1, { label: '', value: '' })}
            className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-gray-200 bg-white px-3 text-[11px] font-semibold text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
          >
            <Plus size={12} /> Add Slot
          </button>
        </div>

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
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-500'>Langar (Kitchen)</h5>
          <button
            type='button'
            onClick={() => startEdit('visitors-langar', -1, { label: '', value: '' })}
            className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-gray-200 bg-white px-3 text-[11px] font-semibold text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
          >
            <Plus size={12} /> Add Slot
          </button>
        </div>

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

