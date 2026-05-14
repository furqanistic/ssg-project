// File: client/src/pages/Dashboard/sections/visitors/VisitorLocationEditor.jsx
import React from 'react'
import { Plus } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorLocationEditor = ({
  panel,
  DataTable: TableComponent,
  visitorsForm,
  startEdit,
  removeVisitorsRow,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader icon={panel.icon} title='Location' description='Manage address lines and route instructions.' />

    <div className='grid grid-cols-1 gap-8'>
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-500'>Address Registry</h5>
          <button
            type='button'
            onClick={() => startEdit('visitors-address', -1, { text: '' })}
            className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-gray-200 bg-white px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
          >
            <Plus size={12} /> Add Line
          </button>
        </div>

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.address,
          columns: [{ key: 'text', label: 'Registered Line' }],
          emptyMessage: 'No address lines.',
          alwaysShowActions: true,
          actionButtonStyle: 'labeled',
          onEdit: (index) => startEdit('visitors-address', index, visitorsForm.address[index]),
          onDelete: (index) => removeVisitorsRow('address', index, 'address', { key: 'address', value: '' }),
        })}
      </div>

      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-500'>Route Instructions</h5>
          <button
            type='button'
            onClick={() => startEdit('visitors-reach', -1, { text: '' })}
            className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-gray-200 bg-white px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
          >
            <Plus size={12} /> Add Rule
          </button>
        </div>

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.reach,
          columns: [{ key: 'text', label: 'Instruction' }],
          emptyMessage: 'No route info set.',
          alwaysShowActions: true,
          actionButtonStyle: 'labeled',
          onEdit: (index) => startEdit('visitors-reach', index, visitorsForm.reach[index]),
          onDelete: (index) => removeVisitorsRow('reach', index, 'reach', { key: 'reach', value: '' }),
        })}
      </div>
    </div>
  </div>
)

export default VisitorLocationEditor
