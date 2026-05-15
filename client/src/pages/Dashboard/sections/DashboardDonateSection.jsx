// File: client/src/pages/Dashboard/sections/DashboardDonateSection.jsx
import React from 'react'

const DashboardDonateSection = ({ donateForm, setDonateForm, inputClass, textareaClass, panelClass }) => (
  <section className='space-y-6'>
    <article className={panelClass}>
      <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Bank Transfer Details</h3>
      <p className='mt-1 text-[13px] text-gray-500'>
        These values are shown on the public Donate page and can be copied by visitors.
      </p>
      <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Bank Name</label>
          <input
            type='text'
            value={donateForm.bankName}
            onChange={(event) =>
              setDonateForm((prev) => ({ ...prev, bankName: event.target.value }))
            }
            className={inputClass}
            placeholder='Commerzbank'
          />
        </div>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Account Holder</label>
          <input
            type='text'
            value={donateForm.accountHolder}
            onChange={(event) =>
              setDonateForm((prev) => ({ ...prev, accountHolder: event.target.value }))
            }
            className={inputClass}
            placeholder='Singh Sabha Gurudwara Berlin e.V.'
          />
        </div>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>IBAN</label>
          <input
            type='text'
            value={donateForm.iban}
            onChange={(event) =>
              setDonateForm((prev) => ({ ...prev, iban: event.target.value }))
            }
            className={inputClass}
            placeholder='DE89 3704 0044 0532 0130 00'
          />
        </div>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>BIC</label>
          <input
            type='text'
            value={donateForm.bic}
            onChange={(event) =>
              setDonateForm((prev) => ({ ...prev, bic: event.target.value }))
            }
            className={inputClass}
            placeholder='COBADEFFXXX'
          />
        </div>
      </div>
    </article>

    <article className={panelClass}>
      <h3 className='text-[20px] font-black tracking-tight text-gray-900'>In-Person Donation Details</h3>
      <div className='mt-6 space-y-4'>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Office Hours</label>
          <input
            type='text'
            value={donateForm.officeHours}
            onChange={(event) =>
              setDonateForm((prev) => ({ ...prev, officeHours: event.target.value }))
            }
            className={inputClass}
            placeholder='Mon - Sun, 9:00 AM - 7:00 PM'
          />
        </div>
        <div>
          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Description</label>
          <textarea
            value={donateForm.inPersonDescription}
            onChange={(event) =>
              setDonateForm((prev) => ({
                ...prev,
                inPersonDescription: event.target.value,
              }))
            }
            className={textareaClass}
            placeholder='Share where and how visitors can donate in person.'
          />
        </div>
      </div>
    </article>
  </section>
)

export default DashboardDonateSection
