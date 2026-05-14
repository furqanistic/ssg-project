// File: client/src/pages/Dashboard/sections/visitors/VisitorLocationEditor.jsx
import React from 'react'
import { Plus, Save } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorLocationEditor = ({
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
  inputClass,
  visitorsForm,
  startEdit,
  removeVisitorsRow,
  upsertVisitorsText,
  visitorAddressFormRef,
  visitorReachFormRef,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader icon={panel.icon} title='Location' description='Manage address lines and route instructions.' />

    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-300'>Address Registry</h5>
          <button type='button' onClick={() => showForm('visitorsAddress')} className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#001da5]'>
            <Plus size={12} /> Add Line
          </button>
        </div>

        {openForms.visitorsAddress ? (
          <div ref={visitorAddressFormRef} className={getPanelClass('visitors-address-form')}>
            <label className='block text-[11px] font-bold uppercase tracking-widest text-gray-500'>
              Physical Line
              <input
                value={visitorDrafts.address}
                onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, address: event.target.value }))}
                className={inputClass}
                placeholder='e.g. Alt Biesdorf 71'
              />
            </label>
            <div className='mt-4 flex justify-end gap-2'>
              <button type='button' onClick={() => hideForm('visitorsAddress')} className={actionButtonClass}>Cancel</button>
              <button type='button' onClick={() => upsertVisitorsText('address', 'address', 'address')} className={primaryButtonClass}>
                <Save size={14} className='mr-1.5' />
                Save
              </button>
            </div>
          </div>
        ) : null}

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.address,
          columns: [{ key: 'text', label: 'Registered Line' }],
          emptyMessage: 'No address lines.',
          onEdit: (index) => startEdit('visitors-address', index, visitorsForm.address[index]),
          onDelete: (index) => removeVisitorsRow('address', index, 'address', { key: 'address', value: '' }),
        })}
      </div>

      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h5 className='text-[12px] font-black uppercase tracking-widest text-gray-300'>Route Instructions</h5>
          <button type='button' onClick={() => showForm('visitorsReach')} className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#001da5]'>
            <Plus size={12} /> Add Rule
          </button>
        </div>

        {openForms.visitorsReach ? (
          <div ref={visitorReachFormRef} className={getPanelClass('visitors-reach-form')}>
            <label className='block text-[11px] font-bold uppercase tracking-widest text-gray-500'>
              Instruction
              <input
                value={visitorDrafts.reach}
                onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, reach: event.target.value }))}
                className={inputClass}
                placeholder='U-Bahn: U8 Pankstrasse'
              />
            </label>
            <div className='mt-4 flex justify-end gap-2'>
              <button type='button' onClick={() => hideForm('visitorsReach')} className={actionButtonClass}>Cancel</button>
              <button type='button' onClick={() => upsertVisitorsText('reach', 'reach', 'reach')} className={primaryButtonClass}>
                <Save size={14} className='mr-1.5' />
                Save
              </button>
            </div>
          </div>
        ) : null}

        {React.createElement(TableComponent, {
          title: '',
          rows: visitorsForm.reach,
          columns: [{ key: 'text', label: 'Instruction' }],
          emptyMessage: 'No route info set.',
          onEdit: (index) => startEdit('visitors-reach', index, visitorsForm.reach[index]),
          onDelete: (index) => removeVisitorsRow('reach', index, 'reach', { key: 'reach', value: '' }),
        })}
      </div>
    </div>
  </div>
)

export default VisitorLocationEditor

