import React from 'react'

const PAGE_SIZE = 5

const PaginatedEditableTable = ({
  title,
  rows,
  columns,
  page,
  onPageChange,
  onCellChange,
  onAdd,
  onRemove,
}) => {
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pagedRows = rows.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <div className='rounded-[12px] border border-[#dce4f0] bg-[#fbfcff] p-4'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <h3 className='text-[14px] font-bold text-[#1a2333]'>{title}</h3>
        <button
          type='button'
          onClick={onAdd}
          className='inline-flex h-8 items-center justify-center rounded-[8px] bg-[#2b4faa] px-3 text-[12px] font-semibold text-white transition hover:bg-[#244599]'
        >
          Add Row
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[520px] border-collapse'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='border-b border-[#e3e9f4] px-2 py-2 text-left text-[12px] font-semibold uppercase tracking-[0.05em] text-[#6a7790]'
                >
                  {column.label}
                </th>
              ))}
              <th className='border-b border-[#e3e9f4] px-2 py-2 text-left text-[12px] font-semibold uppercase tracking-[0.05em] text-[#6a7790]'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.length > 0 ? (
              pagedRows.map((row, pageIndex) => {
                const rowIndex = startIndex + pageIndex
                return (
                  <tr key={`${title}-${rowIndex}`}>
                    {columns.map((column) => (
                      <td key={column.key} className='border-b border-[#eef2f8] px-2 py-2'>
                        {column.type === 'textarea' ? (
                          <textarea
                            value={row[column.key] ?? ''}
                            onChange={(event) =>
                              onCellChange(rowIndex, column.key, event.target.value)
                            }
                            placeholder={column.placeholder ?? ''}
                            className='min-h-[72px] w-full rounded-[8px] border border-[#dce4f0] bg-white px-2 py-2 text-[13px] outline-none focus:border-[#9bb0e1]'
                          />
                        ) : (
                          <input
                            value={row[column.key] ?? ''}
                            onChange={(event) =>
                              onCellChange(rowIndex, column.key, event.target.value)
                            }
                            placeholder={column.placeholder ?? ''}
                            className='h-9 w-full rounded-[8px] border border-[#dce4f0] bg-white px-2 text-[13px] outline-none focus:border-[#9bb0e1]'
                          />
                        )}
                      </td>
                    ))}
                    <td className='border-b border-[#eef2f8] px-2 py-2'>
                      <button
                        type='button'
                        onClick={() => onRemove(rowIndex)}
                        className='inline-flex h-8 items-center justify-center rounded-[8px] border border-[#f0caca] px-3 text-[12px] font-semibold text-[#b63b3b] transition hover:bg-[#fff3f3]'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className='px-2 py-5 text-center text-[13px] text-[#6a7790]'
                >
                  No rows yet. Click Add Row.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='mt-3 flex items-center justify-between text-[12px] text-[#6a7790]'>
        <span>
          Page {safePage} of {totalPages}
        </span>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => onPageChange(Math.max(1, safePage - 1))}
            disabled={safePage === 1}
            className='inline-flex h-8 items-center justify-center rounded-[8px] border border-[#dce4f0] px-3 font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff] disabled:cursor-not-allowed disabled:opacity-60'
          >
            Prev
          </button>
          <button
            type='button'
            onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
            disabled={safePage === totalPages}
            className='inline-flex h-8 items-center justify-center rounded-[8px] border border-[#dce4f0] px-3 font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff] disabled:cursor-not-allowed disabled:opacity-60'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaginatedEditableTable
