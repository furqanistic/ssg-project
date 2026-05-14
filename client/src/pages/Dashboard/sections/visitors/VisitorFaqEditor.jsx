// File: client/src/pages/Dashboard/sections/visitors/VisitorFaqEditor.jsx
import React from 'react'
import { Plus, Save } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorFaqEditor = ({
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
  textareaClass,
  visitorsForm,
  startEdit,
  upsertVisitorsFaq,
  removeVisitorsFaq,
  emptyFaq,
  visitorFaqFormRef,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader
      icon={panel.icon}
      title='FAQ'
      description='Questions and answers shown at the bottom of the public Visitors page.'
      action={(
        <button type='button' onClick={() => showForm('visitorsFaq')} className={actionButtonClass}>
          <Plus size={16} className='mr-2' />
          New FAQ
        </button>
      )}
    />

    {openForms.visitorsFaq ? (
      <div ref={visitorFaqFormRef} className={getPanelClass('visitors-faq-form')}>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-[13px] font-bold uppercase tracking-widest text-gray-500'>
            Question
            <input
              value={visitorDrafts.faq.question}
              onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, faq: { ...prev.faq, question: event.target.value } }))}
              className={inputClass}
              placeholder='Do I need to be Sikh to visit?'
            />
          </label>
          <label className='text-[13px] font-bold uppercase tracking-widest text-gray-500'>
            Answer
            <textarea
              value={visitorDrafts.faq.answer}
              onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, faq: { ...prev.faq, answer: event.target.value } }))}
              className={textareaClass}
              placeholder='Write the public answer...'
            />
          </label>
        </div>
        <div className='mt-6 flex justify-end gap-3'>
          <button type='button' onClick={() => hideForm('visitorsFaq')} className={actionButtonClass}>Cancel</button>
          <button type='button' onClick={upsertVisitorsFaq} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            Save FAQ
          </button>
        </div>
      </div>
    ) : null}

    {React.createElement(TableComponent, {
      title: 'Visitor FAQ',
      rows: visitorsForm.faq,
      columns: [
        { key: 'question', label: 'Question' },
        { key: 'answer', label: 'Answer' },
      ],
      emptyMessage: 'No FAQ entries defined.',
      alwaysShowActions: true,
      actionButtonStyle: 'labeled',
      onEdit: (index) => startEdit('visitors-faq', index, visitorsForm.faq[index]),
      onDelete: (index) => removeVisitorsFaq(index, emptyFaq),
    })}
  </div>
)

export default VisitorFaqEditor
