// File: client/src/pages/Dashboard/sections/visitors/VisitorGuideEditor.jsx
import React from 'react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorGuideEditor = ({ panel, visitorsForm, setVisitorsForm, inputClass, textareaClass }) => (
  <div className='space-y-6'>
    <VisitorPanelHeader
      icon={panel.icon}
      title='Visitor Guide'
      description='This content appears in the Visitor Guide section of the public page.'
    />
    <div className='grid grid-cols-1 gap-5'>
      <label className='text-[13px] font-bold uppercase tracking-widest text-gray-500'>
        Guide Title
        <input
          value={visitorsForm.guideTitle}
          onChange={(event) => setVisitorsForm((prev) => ({ ...prev, guideTitle: event.target.value }))}
          className={inputClass}
          placeholder='Visitor Guide'
        />
      </label>
      <label className='text-[13px] font-bold uppercase tracking-widest text-gray-500'>
        Guide Body
        <textarea
          value={visitorsForm.guideBody}
          onChange={(event) => setVisitorsForm((prev) => ({ ...prev, guideBody: event.target.value }))}
          className={`${textareaClass} min-h-[220px]`}
          placeholder='Write the visitor introduction shown on the public page...'
        />
      </label>
    </div>
  </div>
)

export default VisitorGuideEditor
