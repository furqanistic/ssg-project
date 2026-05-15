// File: client/src/pages/Dashboard/shell/DashboardPageHeader.jsx
import React from 'react'
import { ChevronRight, Save } from 'lucide-react'

const DashboardPageHeader = ({ sectionLabel, active, onSave }) => (
  <div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
    <div>
      <nav className='flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400'>
        <span>Portal</span>
        <ChevronRight size={10} strokeWidth={3} />
        <span className='text-gray-600'>{sectionLabel}</span>
      </nav>
      <h1 className='text-[48px] font-black tracking-[-0.04em] text-gray-900 leading-tight'>
        {sectionLabel}
      </h1>
      <p className='mt-3 text-[16px] text-gray-600 max-w-xl font-medium leading-relaxed'>
        Refine and manage the content displayed on the {sectionLabel.toLowerCase()} section of your public website.
      </p>
    </div>

    {active !== 'profile' ? (
      <div className='flex gap-3'>
        <button
          type='button'
          onClick={onSave}
          className='inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#001da5] px-6 text-[14px] font-bold text-white transition-all hover:bg-[#001580] active:scale-95 shadow-xl shadow-blue-500/20'
        >
          <Save size={18} />
          Publish Changes
        </button>
      </div>
    ) : null}
  </div>
)

export default DashboardPageHeader
