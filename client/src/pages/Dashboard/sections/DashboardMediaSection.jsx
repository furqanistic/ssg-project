// File: client/src/pages/Dashboard/sections/DashboardMediaSection.jsx
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { InteractiveNavCard } from '@/components/ui/interactive-nav-card'
import { MEDIA_GROUPS, emptyMediaCard, emptyMediaUpdate } from './media/media-group-config'

const DashboardMediaSection = ({
  ImageIcon: imageIcon,
  Plus: plusIcon,
  DataTable: dataTableComponent,
  actionButtonClass,
  deleteMediaRowLocal,
  mediaCardsRows,
  mediaUpdatesRows,
  startEdit,
}) => {
  const [activeGroup, setActiveGroup] = React.useState(null)

  const getGroupRows = (key) =>
    key === 'cards' ? mediaCardsRows : mediaUpdatesRows

  const mediaCards = MEDIA_GROUPS.map((group) => ({
    ...group,
    count: getGroupRows(group.key).length,
  }))

  const activeGroupConfig = MEDIA_GROUPS.find((group) => group.key === activeGroup) ?? null

  const openNewMediaModal = (groupKey) => {
    const empty = groupKey === 'cards' ? emptyMediaCard : emptyMediaUpdate
    startEdit(`media-${groupKey}`, -1, { ...empty })
  }

  const handleDelete = (groupKey, targetIndex) => {
    deleteMediaRowLocal(groupKey, targetIndex)
  }

  const getTableConfig = (groupKey) => {
    if (groupKey === 'cards') {
      return {
        title: 'Media Cards Table',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { key: 'buttonLabel', label: 'Action Button' },
        ],
        emptyMessage: 'No media categories defined.',
        editType: 'media-cards',
        emptyObj: emptyMediaCard,
      }
    }
    return {
      title: 'System Updates Table',
      columns: [
        { key: 'title', label: 'Headline' },
        { key: 'action', label: 'Call to Action' },
        {
          key: 'description',
          label: 'Context',
          render: (row) => row.description || '\u2014',
        },
      ],
      emptyMessage: 'No system updates found.',
      editType: 'media-updates',
      emptyObj: emptyMediaUpdate,
    }
  }

  return (
    <div className='mt-10 space-y-8'>
      {!activeGroup ? (
        <div>
          <div className='mb-4'>
            <h3 className='text-[16px] font-black tracking-[-0.02em] text-gray-900'>Media Sections</h3>
            <p className='mt-1 text-[13px] text-gray-500'>Select a section to open it as a focused editor page.</p>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {mediaCards.map((group) => (
              <InteractiveNavCard
                key={group.key}
                onClick={() => setActiveGroup(group.key)}
                active={activeGroup === group.key}
                title={group.title}
                description={group.description}
                icon={React.createElement(imageIcon, { size: 20 })}
                iconContainerClassName='text-[#001da5] bg-[#001da5]/5 border-[#001da5]/10'
                rightSlot={(
                  <span className='inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gray-600 shadow-sm'>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#001da5]' />
                    {group.count} {group.count === 1 ? 'entry' : 'entries'}
                  </span>
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='rounded-[30px] border border-gray-100 bg-white p-5 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-7'>
          <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <button
              type='button'
              onClick={() => setActiveGroup(null)}
              className='inline-flex w-fit items-center gap-2 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-2 text-[12px] font-bold text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-white hover:text-[#001da5] active:scale-[0.98]'
            >
              <ArrowLeft size={14} />
              Back To Sections
            </button>
            {activeGroupConfig ? (
              <div className='flex items-center gap-3'>
                <span className='text-[13px] text-gray-500'>
                  {activeGroupConfig.title}
                  <span className='ml-1.5 text-gray-300'>·</span>
                  <span className='ml-1.5 font-semibold text-[#001da5]'>{getGroupRows(activeGroupConfig.key).length} entries</span>
                </span>
              </div>
            ) : null}
          </div>

          {activeGroupConfig ? (
            (() => {
              const groupedRows = getGroupRows(activeGroupConfig.key)
              const tableConfig = getTableConfig(activeGroupConfig.key)
              const isCards = activeGroupConfig.key === 'cards'
              return (
                <div className='rounded-[22px] border border-gray-100 bg-white p-6'>
                  <div className='mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                    <div>
                      <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>{activeGroupConfig.title}</h4>
                      <p className='mt-1 text-[13px] text-gray-500'>{activeGroupConfig.description}</p>
                    </div>
                    <button
                      type='button'
                      onClick={() => openNewMediaModal(activeGroupConfig.key)}
                      className={actionButtonClass}
                    >
                      {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })}
                      Add {isCards ? 'Card' : 'Update'}
                    </button>
                  </div>

                  {React.createElement(dataTableComponent, {
                    title: tableConfig.title,
                    rows: groupedRows,
                    columns: tableConfig.columns,
                    emptyMessage: tableConfig.emptyMessage,
                    alwaysShowActions: true,
                    actionButtonStyle: 'labeled',
                    onEdit: (index) => startEdit(tableConfig.editType, index, groupedRows[index]),
                    onDelete: (index) => handleDelete(activeGroupConfig.key, index),
                  })}
                </div>
              )
            })()
          ) : null}
        </div>
      )}
    </div>
  )
}

export default DashboardMediaSection
