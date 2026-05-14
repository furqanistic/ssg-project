// File: client/src/pages/Dashboard/sections/visitors/VisitorFaqEditor.jsx
import React from 'react'
import { Plus } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorFaqEditor = ({
  panel,
  DataTable: TableComponent,
  actionButtonClass,
  visitorsForm,
  startEdit,
  removeVisitorsFaq,
  emptyFaq,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader
      icon={panel.icon}
      title='FAQ'
      description='Questions and answers shown at the bottom of the public Visitors page.'
      action={(
        <button type='button' onClick={() => startEdit('visitors-faq', -1, { question: '', answer: '' })} className={actionButtonClass}>
          <Plus size={16} className='mr-2' />
          New FAQ
        </button>
      )}
    />

    {React.createElement(TableComponent, {
      title: 'Visitor FAQ',
      rows: visitorsForm.faq,
      columns: [
        { key: 'question', label: 'Question' },
        { key: 'answer', label: 'Answer' },
      ],
      emptyMessage: 'No FAQ entries defined.',
      alwaysShowActions: true,
      actionButtonStyle: 'labeled-compact',
      onEdit: (index) => startEdit('visitors-faq', index, visitorsForm.faq[index]),
      onDelete: (index) => removeVisitorsFaq(index, emptyFaq),
    })}
  </div>
)

export default VisitorFaqEditor
