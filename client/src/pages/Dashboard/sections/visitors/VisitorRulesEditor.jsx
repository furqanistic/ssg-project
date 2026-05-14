import React from 'react'
import { Plus } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorRulesEditor = ({
  panel,
  DataTable: TableComponent,
  actionButtonClass,
  visitorsForm,
  startEdit,
  deleteVisitorsRule,
  deletingVisitorRuleIndex,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader
      icon={panel.icon}
      title='Rules & Etiquette'
      description='Define social and religious conduct.'
      action={(
        <button
          type='button'
          onClick={() => startEdit('visitors-rule', -1, { text: '' })}
          className={actionButtonClass}
        >
          <Plus size={16} className='mr-2' />
          New Rule
        </button>
      )}
    />

    {React.createElement(TableComponent, {
      title: 'Current Conduct Policy',
      rows: visitorsForm.rules,
      columns: [{ key: 'text', label: 'Registered Rule' }],
      emptyMessage: 'No community rules defined.',
      alwaysShowActions: true,
      actionButtonStyle: 'labeled',
      deletingRowIndex: deletingVisitorRuleIndex,
      onEdit: (index) => startEdit('visitors-rule', index, visitorsForm.rules[index]),
      onDelete: (index) => deleteVisitorsRule(index),
    })}
  </div>
)

export default VisitorRulesEditor

