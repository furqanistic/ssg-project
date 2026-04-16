import React from 'react'

const DashboardContactSection = ({
  Mail,
  Plus,
  Save,
  DataTable,
  panelClass,
  contactForm,
  setContactForm,
  inputClass,
  openForms,
  showForm,
  actionButtonClass,
  contactAddressFormRef,
  getPanelClass,
  contactAddressDraft,
  setContactAddressDraft,
  hideForm,
  upsertContactAddress,
  primaryButtonClass,
  editingContactAddressIndex,
  startEdit,
}) => {
  return (
    <div className='mt-10 space-y-10'>
      <div className={panelClass}>
        <div className='flex items-center gap-4 mb-8 pb-6 border-b border-gray-100'>
          <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#001da5]/5 border border-[#001da5]/10 text-[#001da5]'>
            <Mail size={24} />
          </div>
          <div>
            <h3 className='text-[18px] font-bold text-gray-900 tracking-tight'>Direct Communications</h3>
            <p className='text-[12px] text-gray-400'>Update primary reachable contact channels</p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <label className='text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
            Public Phone Number
            <input
              value={contactForm.phone}
              onChange={(event) =>
                setContactForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              className={inputClass}
              placeholder='+49 (0) 123 456789'
            />
          </label>

          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Official Support Email
            <input
              value={contactForm.email}
              onChange={(event) =>
                setContactForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className={inputClass}
              placeholder='contact@gurdwara-berlin.de'
            />
          </label>
        </div>
      </div>

      <div className='space-y-6 pt-10 border-t border-gray-100'>
        <div className='flex justify-between items-center bg-gray-50 p-4 rounded-[18px] border border-gray-100'>
          <div>
            <h4 className='text-[14px] font-bold text-gray-900'>Regional Office Address</h4>
            <p className='text-[12px] text-gray-400'>Manage display address lines</p>
          </div>
          <button type='button' onClick={() => showForm('contactAddress')} className={actionButtonClass}>
            <Plus size={16} className='mr-2' />
            Add Line
          </button>
        </div>

        {openForms.contactAddress ? (
          <div ref={contactAddressFormRef} className={getPanelClass('contact-address-form')}>
            <label className='block text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1'>
              Physical Address Line
              <input
                value={contactAddressDraft}
                onChange={(event) => setContactAddressDraft(event.target.value)}
                className={inputClass}
                placeholder='12683 Berlin'
              />
            </label>
            <div className='mt-6 flex gap-3 justify-end'>
              <button type='button' onClick={() => hideForm('contactAddress')} className={actionButtonClass}>
                Discard
              </button>
              <button type='button' onClick={upsertContactAddress} className={primaryButtonClass}>
                <Save size={16} className='mr-2' />
                {editingContactAddressIndex === null ? 'Add Address' : 'Update Address'}
              </button>
            </div>
          </div>
        ) : null}

        <DataTable
          title='Contact Address Repository'
          rows={contactForm.address}
          columns={[{ key: 'text', label: 'Registered Line' }]}
          emptyMessage='No contact address lines defined.'
          onEdit={(index) => startEdit('contact-address', index, contactForm.address[index])}
          onDelete={(index) => {
            setContactForm((prev) => ({
              ...prev,
              address: prev.address.filter((_, itemIndex) => itemIndex !== index),
            }))
          }}
        />
      </div>
    </div>
  )
}

export default DashboardContactSection
