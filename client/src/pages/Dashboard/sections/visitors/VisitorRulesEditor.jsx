import React from 'react'
import { Plus, Save } from 'lucide-react'
import VisitorPanelHeader from './VisitorPanelHeader'

const VisitorRulesEditor = ({
  panel,
  DataTable: TableComponent,
  openForms,
  showForm,
  hideForm,
  actionButtonClass,
  primaryButtonClass,
  visitorRuleFormRef,
  getPanelClass,
  visitorDrafts,
  setVisitorDrafts,
  textareaClass,
  upsertVisitorsText,
  visitorsForm,
  startEdit,
  removeVisitorsRow,
}) => (
  <div className='space-y-6'>
    <VisitorPanelHeader
      icon={panel.icon}
      title='Rules & Etiquette'
      description='Define social and religious conduct.'
      action={(
        <button type='button' onClick={() => showForm('visitorsRule')} className={actionButtonClass}>
          <Plus size={16} className='mr-2' />
          New Rule
        </button>
      )}
    />

    {openForms.visitorsRule ? (
      <div ref={visitorRuleFormRef} className={getPanelClass('visitors-rule-form')}>
        <label className='block text-[13px] font-bold uppercase tracking-widest text-gray-500'>
          Rule Text
          <textarea
            value={visitorDrafts.rule}
            onChange={(event) => setVisitorDrafts((prev) => ({ ...prev, rule: event.target.value }))}
            className={textareaClass}
            placeholder='e.g. Please remove shoes...'
          />
        </label>
        <div className='mt-6 flex justify-end gap-3'>
          <button type='button' onClick={() => hideForm('visitorsRule')} className={actionButtonClass}>
            Cancel
          </button>
          <button type='button' onClick={() => upsertVisitorsText('rules', 'rule', 'rule')} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            Save Rule
          </button>
        </div>
      </div>
    ) : null}

    {React.createElement(TableComponent, {
      title: 'Current Conduct Policy',
      rows: visitorsForm.rules,
      columns: [{ key: 'text', label: 'Registered Rule' }],
      emptyMessage: 'No community rules defined.',
      onEdit: (index) => startEdit('visitors-rule', index, visitorsForm.rules[index]),
      onDelete: (index) => removeVisitorsRow('rules', index, 'rule', { key: 'rule', value: '' }),
    })}
  </div>
)

export default VisitorRulesEditor

