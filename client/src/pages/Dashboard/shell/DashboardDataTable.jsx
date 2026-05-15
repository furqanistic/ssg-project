import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'
import { panelClass } from './dashboardConstants'

const DashboardDataTable = ({
  title,
  columns,
  rows,
  onEdit,
  onDelete,
  emptyMessage,
  showActions = true,
  alwaysShowActions = false,
  actionButtonStyle = 'default',
  deletingRowIndex = null,
}) => {
  const hasEditAction = showActions && typeof onEdit === 'function'
  const hasDeleteAction = showActions && typeof onDelete === 'function'
  const hasActions = hasEditAction || hasDeleteAction

  return (
    <div className={panelClass}>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>{title}</h3>
          <p className='mt-0.5 text-[12px] text-gray-500'>Total entries: {rows.length}</p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[620px] border-collapse'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='border-b border-gray-100 px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400'
                >
                  {column.label}
                </th>
              ))}
              {hasActions ? (
                <th className='border-b border-gray-100 px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400'>
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={`${title}-${index}`} className='group transition-colors hover:bg-gray-50/50'>
                  {columns.map((column) => (
                    <td key={column.key} className='px-3 py-3 text-[13px] font-medium text-gray-700'>
                      {column.render ? column.render(row) : row[column.key] || '-'}
                    </td>
                  ))}
                  {hasActions ? (
                    <td className='px-3 py-3'>
                      <div
                        className={`flex justify-end gap-1.5 ${
                          alwaysShowActions ? 'opacity-100' : 'opacity-0 transition-opacity group-hover:opacity-100'
                        }`}
                      >
                        {hasEditAction ? (
                          <button
                            type='button'
                            onClick={() => onEdit(index)}
                            className={
                              actionButtonStyle === 'labeled'
                                ? 'inline-flex h-8 w-[92px] items-center justify-center gap-1 rounded-[9px] border border-gray-200 bg-white px-2.5 text-[11px] font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
                                : actionButtonStyle === 'labeled-compact'
                                  ? 'inline-flex h-7 min-w-[70px] whitespace-nowrap items-center justify-center gap-1 rounded-[9px] border border-gray-200 bg-white px-2 text-[11px] font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-[#001da5]/35 hover:bg-[#001da5]/[0.04] hover:text-[#001da5]'
                                  : 'inline-flex h-8 items-center justify-center rounded-[8px] border border-gray-200 px-3 text-[12px] font-bold text-gray-600 transition hover:border-[#001da5]/30 hover:bg-white hover:text-[#001da5]'
                            }
                          >
                            {actionButtonStyle === 'labeled' || actionButtonStyle === 'labeled-compact' ? (
                              <Edit2 size={12} />
                            ) : null}
                            Edit
                          </button>
                        ) : null}
                        {hasDeleteAction ? (
                          <button
                            type='button'
                            onClick={() => onDelete(index)}
                            disabled={deletingRowIndex === index}
                            className={
                              actionButtonStyle === 'labeled'
                                ? 'inline-flex h-8 w-[92px] items-center justify-center gap-1 rounded-[9px] border border-red-200 bg-red-50/70 px-2.5 text-[11px] font-semibold text-red-600 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-red-300 hover:bg-red-100'
                                : actionButtonStyle === 'labeled-compact'
                                  ? 'inline-flex h-7 min-w-[70px] whitespace-nowrap items-center justify-center gap-1 rounded-[9px] border border-red-200 bg-red-50/70 px-2 text-[11px] font-semibold text-red-600 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-red-300 hover:bg-red-100'
                                  : 'inline-flex h-8 items-center justify-center rounded-[8px] border border-red-100 bg-red-50/50 px-3 text-[12px] font-bold text-red-500 transition hover:border-red-200 hover:bg-red-50'
                            }
                          >
                            {actionButtonStyle === 'labeled' || actionButtonStyle === 'labeled-compact' ? (
                              <Trash2 size={12} />
                            ) : null}
                            {deletingRowIndex === index ? 'Deleting...' : 'Delete'}
                          </button>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={hasActions ? columns.length + 1 : columns.length}
                  className='px-4 py-12 text-center text-[13px] text-gray-400'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardDataTable
