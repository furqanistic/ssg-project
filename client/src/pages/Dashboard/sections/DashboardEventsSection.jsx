import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { InteractiveNavCard } from '@/components/ui/interactive-nav-card'

const EVENT_GROUPS = [
  {
    key: 'daily',
    title: 'Daily Programs',
    description: 'Programs that appear under the Daily tab on the Events page.',
  },
  {
    key: 'weekly',
    title: 'Weekly Programs',
    description: 'Recurring sangat activities, classes, and gatherings.',
  },
  {
    key: 'monthly',
    title: 'Monthly Programs',
    description: 'Programs that happen on a regular monthly cycle.',
  },
  {
    key: 'yearly',
    title: 'Yearly Celebrations',
    description: 'Major annual events like gurpurabs, Vaisakhi, and more.',
  },
]

const DashboardEventsSection = ({
  Calendar: calendarIcon,
  Plus: plusIcon,
  DataTable: dataTableComponent,
  actionButtonClass,
  EVENT_CATEGORIES,
  saveEventsSection,
  editingEventIndex,
  setEditingEventIndex,
  emptyEvent,
  eventsRows,
  startEdit,
}) => {
  const eventEditorCategories = EVENT_CATEGORIES.filter((category) => category !== 'all')
  const [activeGroup, setActiveGroup] = React.useState(null)
  const [deletingEventIndex, setDeletingEventIndex] = React.useState(null)

  const getCategoryRows = (category) =>
    eventsRows.reduce((accumulator, row, index) => {
      if ((row.category ?? '').trim().toLowerCase() === category) {
        accumulator.push({ row, index })
      }
      return accumulator
    }, [])

  const uncategorizedRows = eventsRows.reduce((accumulator, row, index) => {
    const category = (row.category ?? '').trim().toLowerCase()
    if (!eventEditorCategories.includes(category)) {
      accumulator.push({ row, index })
    }
    return accumulator
  }, [])

  const openNewEventModal = (category = 'yearly') => {
    startEdit('events', -1, { ...emptyEvent, category })
  }

  const eventCards = EVENT_GROUPS.map((group) => ({
    ...group,
    count: getCategoryRows(group.key).length,
  }))

  const activeGroupConfig = EVENT_GROUPS.find((group) => group.key === activeGroup) ?? null

  return (
    <div className='mt-10 space-y-8'>
      {!activeGroup ? (
        <div>
          <div className='mb-4'>
            <h3 className='text-[16px] font-black tracking-[-0.02em] text-gray-900'>Event Sections</h3>
            <p className='mt-1 text-[13px] text-gray-500'>Select a section to open it as a focused editor page.</p>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2'>
            {eventCards.map((group) => (
              <InteractiveNavCard
                key={group.key}
                onClick={() => setActiveGroup(group.key)}
                active={activeGroup === group.key}
                className='min-h-[248px]'
                title={group.title}
                description={group.description}
                icon={React.createElement(calendarIcon, { size: 20 })}
                iconContainerClassName='text-[#001da5] bg-[#001da5]/5 border-[#001da5]/10'
                rightSlot={(
                  <span className='inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gray-600 shadow-sm'>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#001da5]' />
                    {group.count} {group.count === 1 ? 'event' : 'events'}
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
                  <span className='ml-1.5 font-semibold text-[#001da5]'>{getCategoryRows(activeGroupConfig.key).length} entries</span>
                </span>
              </div>
            ) : null}
          </div>

          {activeGroupConfig ? (
            (() => {
              const groupedRows = getCategoryRows(activeGroupConfig.key)
              const deletingRowIndex =
                deletingEventIndex === null
                  ? null
                  : groupedRows.findIndex((item) => item.index === deletingEventIndex)

              return (
                <>
                  <div className='mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                    <div>
                      <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>{activeGroupConfig.title}</h4>
                      <p className='mt-1 text-[13px] text-gray-500'>{activeGroupConfig.description}</p>
                    </div>
                    <button
                      type='button'
                      onClick={() => openNewEventModal(activeGroupConfig.key)}
                      className={actionButtonClass}
                    >
                      {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })}
                      Add {activeGroupConfig.key.charAt(0).toUpperCase() + activeGroupConfig.key.slice(1)} Event
                    </button>
                  </div>

                  {React.createElement(dataTableComponent, {
                    title: `${activeGroupConfig.title} Table`,
                    rows: groupedRows.map((item) => item.row),
                    columns: [
                      { key: 'title', label: 'Title' },
                      { key: 'date', label: 'Date' },
                      { key: 'time', label: 'Time' },
                      { key: 'location', label: 'Location' },
                    ],
                    emptyMessage: `No ${activeGroupConfig.key} events added yet.`,
                    alwaysShowActions: true,
                    actionButtonStyle: 'labeled',
                    deletingRowIndex,
                    onEdit: (index) => startEdit('events', groupedRows[index].index, groupedRows[index].row),
                    onDelete: async (index) => {
                      const targetIndex = groupedRows[index].index
                      const nextRows = eventsRows.filter((_, itemIndex) => itemIndex !== targetIndex)
                      setDeletingEventIndex(targetIndex)
                      try {
                        await saveEventsSection(
                          nextRows,
                          `${activeGroupConfig.title} draft updated. Click Publish Changes to update the public website.`,
                        )
                      } finally {
                        setDeletingEventIndex(null)
                      }
                      if (editingEventIndex === targetIndex) {
                        setEditingEventIndex(null)
                      }
                    },
                  })}
                </>
              )
            })()
          ) : null}
        </div>
      )}

      {activeGroup === null && uncategorizedRows.length > 0 ? (
        <div className='rounded-[22px] border border-amber-200 bg-amber-50 p-6'>
          <div className='mb-5'>
            <h4 className='text-[18px] font-bold tracking-tight text-amber-900'>Needs Category Review</h4>
            <p className='mt-1 text-[12px] text-amber-800'>
              These events have an old or unsupported category value. Edit them and assign a proper
              category so they appear in the right tab.
            </p>
          </div>

          {React.createElement(dataTableComponent, {
            title: 'Uncategorized Events',
            rows: uncategorizedRows.map((item) => item.row),
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'date', label: 'Date' },
              { key: 'time', label: 'Time' },
              { key: 'category', label: 'Current Category' },
            ],
            emptyMessage: 'All events are categorized correctly.',
            alwaysShowActions: true,
            actionButtonStyle: 'labeled',
            deletingRowIndex:
              deletingEventIndex === null
                ? null
                : uncategorizedRows.findIndex((item) => item.index === deletingEventIndex),
            onEdit: (index) =>
              startEdit('events', uncategorizedRows[index].index, uncategorizedRows[index].row),
            onDelete: async (index) => {
              const targetIndex = uncategorizedRows[index].index
              const nextRows = eventsRows.filter((_, itemIndex) => itemIndex !== targetIndex)
              setDeletingEventIndex(targetIndex)
              try {
                await saveEventsSection(
                  nextRows,
                  'Events draft updated. Click Publish Changes to update the public website.',
                )
              } finally {
                setDeletingEventIndex(null)
              }
              if (editingEventIndex === targetIndex) {
                setEditingEventIndex(null)
              }
            },
          })}
        </div>
      ) : null}
    </div>
  )
}

export default DashboardEventsSection
