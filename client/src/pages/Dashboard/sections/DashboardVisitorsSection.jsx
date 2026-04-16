import React from 'react'

const DashboardVisitorsSection = ({
  FileText,
  Clock,
  Plus,
  Save,
  DataTable,
  openForms,
  showForm,
  actionButtonClass,
  visitorRuleFormRef,
  getPanelClass,
  visitorDrafts,
  setVisitorDrafts,
  textareaClass,
  hideForm,
  upsertVisitorsText,
  primaryButtonClass,
  visitorsForm,
  startEdit,
  removeVisitorsRow,
  visitorDailyFormRef,
  inputClass,
  upsertVisitorsPair,
  emptyPair,
  visitorLangarFormRef,
  setVisitorsForm,
  visitorAddressFormRef,
  visitorReachFormRef,
}) => {
  return (
    <div className='mt-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center bg-gray-50 p-5 rounded-[22px] border border-gray-100'>
          <div className='flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
              <FileText size={20} />
            </div>
            <div>
              <h4 className='text-[15px] font-bold text-gray-900'>Rules & Etiquette</h4>
              <p className='text-[12px] text-gray-400'>Define social and religious conduct</p>
            </div>
          </div>
          <button type='button' onClick={() => showForm('visitorsRule')} className={actionButtonClass}>
            <Plus size={16} className='mr-2' />
            New Rule
          </button>
        </div>

        {openForms.visitorsRule ? (
          <div ref={visitorRuleFormRef} className={getPanelClass('visitors-rule-form')}>
            <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
              Rule Text
              <textarea
                value={visitorDrafts.rule}
                onChange={(event) =>
                  setVisitorDrafts((prev) => ({ ...prev, rule: event.target.value }))
                }
                className={textareaClass}
                placeholder='e.g. Please remove shoes...'
              />
            </label>
            <div className='mt-6 flex gap-3 justify-end'>
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

        <DataTable
          title='Current Conduct Policy'
          rows={visitorsForm.rules}
          columns={[{ key: 'text', label: 'Registered Rule' }]}
          emptyMessage='No community rules defined.'
          onEdit={(index) => startEdit('visitors-rule', index, visitorsForm.rules[index])}
          onDelete={(index) => removeVisitorsRow('rules', index, 'rule', { key: 'rule', value: '' })}
        />
      </div>

      <div className='space-y-6 pt-10 border-t border-gray-100'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='flex h-11 w-11 items-center justify-center rounded-[12px] bg-orange-500/5 border border-orange-500/10 text-orange-500'>
            <Clock size={20} />
          </div>
          <div>
            <h4 className='text-[15px] font-bold text-gray-900'>Visitor Timings</h4>
            <p className='text-[12px] text-gray-400'>Manage daily and special kitchen schedules</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-5'>
            <div className='flex justify-between items-center'>
              <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Daily Darshan</h5>
              <button type='button' onClick={() => showForm('visitorsDaily')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5'>
                <Plus size={12} /> Add Slot
              </button>
            </div>

            {openForms.visitorsDaily ? (
              <div ref={visitorDailyFormRef} className={getPanelClass('visitors-daily-form')}>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                    Activity Label
                    <input
                      value={visitorDrafts.daily.label}
                      onChange={(event) =>
                        setVisitorDrafts((prev) => ({
                          ...prev,
                          daily: { ...prev.daily, label: event.target.value },
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                    Time Range
                    <input
                      value={visitorDrafts.daily.value}
                      onChange={(event) =>
                        setVisitorDrafts((prev) => ({
                          ...prev,
                          daily: { ...prev.daily, value: event.target.value },
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className='mt-4 flex gap-2 justify-end'>
                  <button type='button' onClick={() => hideForm('visitorsDaily')} className={actionButtonClass}>
                    Cancel
                  </button>
                  <button type='button' onClick={() => upsertVisitorsPair('daily', 'daily', 'daily')} className={primaryButtonClass}>
                    <Save size={14} className='mr-1.5' />
                    Save
                  </button>
                </div>
              </div>
            ) : null}

            <DataTable
              title=''
              rows={visitorsForm.daily}
              columns={[{ key: 'label', label: 'Activity' }, { key: 'value', label: 'Time' }]}
              emptyMessage='No daily times set.'
              onEdit={(index) => startEdit('visitors-daily', index, visitorsForm.daily[index])}
              onDelete={(index) => removeVisitorsRow('daily', index, 'daily', { key: 'daily', value: emptyPair })}
            />
          </div>

          <div className='space-y-5'>
            <div className='flex justify-between items-center'>
              <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Langar (Kitchen)</h5>
              <button type='button' onClick={() => showForm('visitorsLangar')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5'>
                <Plus size={12} /> Add Slot
              </button>
            </div>

            {openForms.visitorsLangar ? (
              <div ref={visitorLangarFormRef} className={getPanelClass('visitors-langar-form')}>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                    Meal Type
                    <input
                      value={visitorDrafts.langar.label}
                      onChange={(event) =>
                        setVisitorDrafts((prev) => ({
                          ...prev,
                          langar: { ...prev.langar, label: event.target.value },
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                    Serving Hours
                    <input
                      value={visitorDrafts.langar.value}
                      onChange={(event) =>
                        setVisitorDrafts((prev) => ({
                          ...prev,
                          langar: { ...prev.langar, value: event.target.value },
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className='mt-4 flex gap-2 justify-end'>
                  <button type='button' onClick={() => hideForm('visitorsLangar')} className={actionButtonClass}>
                    Cancel
                  </button>
                  <button type='button' onClick={() => upsertVisitorsPair('langar', 'langar', 'langar')} className={primaryButtonClass}>
                    <Save size={14} className='mr-1.5' />
                    Save
                  </button>
                </div>
              </div>
            ) : null}

            <DataTable
              title=''
              rows={visitorsForm.langar}
              columns={[{ key: 'label', label: 'Meal' }, { key: 'value', label: 'Hours' }]}
              emptyMessage='No kitchen times set.'
              onEdit={(index) => startEdit('visitors-langar', index, visitorsForm.langar[index])}
              onDelete={(index) => removeVisitorsRow('langar', index, 'langar', { key: 'langar', value: emptyPair })}
            />
          </div>
        </div>

        <div className='mt-6'>
          <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2'>
            Sunday Special Program
          </label>
          <textarea
            value={visitorsForm.sundaySpecial}
            onChange={(event) =>
              setVisitorsForm((prev) => ({ ...prev, sundaySpecial: event.target.value }))
            }
            className={textareaClass}
            placeholder='Weekly Kirtan Darbar details...'
          />
        </div>
      </div>

      <div className='space-y-10 pt-10 border-t border-gray-100'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-5'>
            <div className='flex justify-between items-center'>
              <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Address Registry</h5>
              <button type='button' onClick={() => showForm('visitorsAddress')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5 font-bold uppercase tracking-widest'>
                <Plus size={12} /> Add Line
              </button>
            </div>

            {openForms.visitorsAddress ? (
              <div ref={visitorAddressFormRef} className={getPanelClass('visitors-address-form')}>
                <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                  Physical Line
                  <input
                    value={visitorDrafts.address}
                    onChange={(event) =>
                      setVisitorDrafts((prev) => ({ ...prev, address: event.target.value }))
                    }
                    className={inputClass}
                    placeholder='e.g. Alt Biesdorf 71'
                  />
                </label>
                <div className='mt-4 flex gap-2 justify-end'>
                  <button type='button' onClick={() => hideForm('visitorsAddress')} className={actionButtonClass}>
                    Cancel
                  </button>
                  <button type='button' onClick={() => upsertVisitorsText('address', 'address', 'address')} className={primaryButtonClass}>
                    <Save size={14} className='mr-1.5' />
                    Save
                  </button>
                </div>
              </div>
            ) : null}

            <DataTable
              title=''
              rows={visitorsForm.address}
              columns={[{ key: 'text', label: 'Registered Line' }]}
              emptyMessage='No address lines.'
              onEdit={(index) => startEdit('visitors-address', index, visitorsForm.address[index])}
              onDelete={(index) => removeVisitorsRow('address', index, 'address', { key: 'address', value: '' })}
            />
          </div>

          <div className='space-y-5'>
            <div className='flex justify-between items-center'>
              <h5 className='text-[12px] font-black text-gray-300 uppercase tracking-widest'>Route Instructions</h5>
              <button type='button' onClick={() => showForm('visitorsReach')} className='text-[11px] font-bold text-gray-400 hover:text-[#001da5] flex items-center gap-1.5 font-bold uppercase tracking-widest'>
                <Plus size={12} /> Add Rule
              </button>
            </div>

            {openForms.visitorsReach ? (
              <div ref={visitorReachFormRef} className={getPanelClass('visitors-reach-form')}>
                <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
                  Instruction
                  <input
                    value={visitorDrafts.reach}
                    onChange={(event) =>
                      setVisitorDrafts((prev) => ({ ...prev, reach: event.target.value }))
                    }
                    className={inputClass}
                    placeholder='U-Bahn: U8 Pankstraße'
                  />
                </label>
                <div className='mt-4 flex gap-2 justify-end'>
                  <button type='button' onClick={() => hideForm('visitorsReach')} className={actionButtonClass}>
                    Cancel
                  </button>
                  <button type='button' onClick={() => upsertVisitorsText('reach', 'reach', 'reach')} className={primaryButtonClass}>
                    <Save size={14} className='mr-1.5' />
                    Save
                  </button>
                </div>
              </div>
            ) : null}

            <DataTable
              title=''
              rows={visitorsForm.reach}
              columns={[{ key: 'text', label: 'Instruction' }]}
              emptyMessage='No route info set.'
              onEdit={(index) => startEdit('visitors-reach', index, visitorsForm.reach[index])}
              onDelete={(index) => removeVisitorsRow('reach', index, 'reach', { key: 'reach', value: '' })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVisitorsSection
