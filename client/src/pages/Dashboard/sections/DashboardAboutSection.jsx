import React from 'react'

const DashboardAboutSection = ({
  Save,
  Plus,
  DataTable,
  panelClass,
  aboutUsDirty,
  aboutUsLastSavedLabel,
  aboutUsForm,
  updateAboutUsText,
  inputClass,
  textareaClass,
  saveAboutUsNonPopupSection,
  updateMutation,
  primaryButtonClass,
  uploadAboutImage,
  isUploadingAboutImage,
  setAboutUsForm,
  actionButtonClass,
  startEdit,
  removeAboutUsArrayItem,
  normalizeColorValue,
}) => {
  return (
    <div className='mt-10 space-y-8'>
      <div className='flex items-center justify-between rounded-[14px] border border-gray-200 bg-white px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span
            className={`inline-flex h-2.5 w-2.5 rounded-full ${
              aboutUsDirty ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />
          <p className='text-[13px] font-semibold text-gray-700'>
            {aboutUsDirty ? 'Unsaved changes in text sections' : 'All changes saved'}
          </p>
        </div>
        <p className='text-[12px] font-medium text-gray-500'>{aboutUsLastSavedLabel}</p>
      </div>

      <div className={panelClass}>
        <h3 className='text-[18px] font-bold text-gray-900 tracking-tight'>About Pages Overview</h3>
        <p className='mt-1 text-[12px] text-gray-500'>Update core headings and media. Use tables below for item-level edits.</p>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <input value={aboutUsForm.history.heroTitle} onChange={(event) => updateAboutUsText('history', 'heroTitle', event.target.value)} className={inputClass} placeholder='History hero title' />
          <input value={aboutUsForm.history.heroSubtitle} onChange={(event) => updateAboutUsText('history', 'heroSubtitle', event.target.value)} className={inputClass} placeholder='History hero subtitle' />
          <input value={aboutUsForm.mission.heroTitle} onChange={(event) => updateAboutUsText('mission', 'heroTitle', event.target.value)} className={inputClass} placeholder='Mission hero title' />
          <textarea value={aboutUsForm.mission.heroDescription} onChange={(event) => updateAboutUsText('mission', 'heroDescription', event.target.value)} className={textareaClass} placeholder='Mission hero description' />
          <input value={aboutUsForm.mission.coreValuesTitle} onChange={(event) => updateAboutUsText('mission', 'coreValuesTitle', event.target.value)} className={inputClass} placeholder='Mission core values section title' />
          <input value={aboutUsForm.committee.heroTitle} onChange={(event) => updateAboutUsText('committee', 'heroTitle', event.target.value)} className={inputClass} placeholder='Committee hero title' />
          <input value={aboutUsForm.committee.heroSubtitle} onChange={(event) => updateAboutUsText('committee', 'heroSubtitle', event.target.value)} className={inputClass} placeholder='Committee hero subtitle' />
          <textarea value={aboutUsForm.committee.intro} onChange={(event) => updateAboutUsText('committee', 'intro', event.target.value)} className={textareaClass} placeholder='Committee intro' />
          <input value={aboutUsForm.governance.heroTitle} onChange={(event) => updateAboutUsText('governance', 'heroTitle', event.target.value)} className={inputClass} placeholder='Governance hero title' />
          <input value={aboutUsForm.governance.heroSubtitle} onChange={(event) => updateAboutUsText('governance', 'heroSubtitle', event.target.value)} className={inputClass} placeholder='Governance hero subtitle' />
          <input value={aboutUsForm.governance.structureTitle} onChange={(event) => updateAboutUsText('governance', 'structureTitle', event.target.value)} className={inputClass} placeholder='Governance structure section title' />
          <textarea value={aboutUsForm.governance.structureIntro} onChange={(event) => updateAboutUsText('governance', 'structureIntro', event.target.value)} className={textareaClass} placeholder='Governance structure intro' />
          <input value={aboutUsForm.governance.documentsTitle} onChange={(event) => updateAboutUsText('governance', 'documentsTitle', event.target.value)} className={inputClass} placeholder='Governance documents title' />
          <input value={aboutUsForm.governance.reportsTitle} onChange={(event) => updateAboutUsText('governance', 'reportsTitle', event.target.value)} className={inputClass} placeholder='Governance reports title' />
          <input value={aboutUsForm.governance.downloadCtaLabel} onChange={(event) => updateAboutUsText('governance', 'downloadCtaLabel', event.target.value)} className={inputClass} placeholder='Download button label' />
          <input value={aboutUsForm.governance.financialTitle} onChange={(event) => updateAboutUsText('governance', 'financialTitle', event.target.value)} className={inputClass} placeholder='Financial transparency section title' />
          <textarea value={aboutUsForm.governance.financialDescription} onChange={(event) => updateAboutUsText('governance', 'financialDescription', event.target.value)} className={textareaClass} placeholder='Financial transparency description' />
          <input value={aboutUsForm.governance.taxTitle} onChange={(event) => updateAboutUsText('governance', 'taxTitle', event.target.value)} className={inputClass} placeholder='Tax section title' />
          <textarea value={aboutUsForm.governance.taxDescription} onChange={(event) => updateAboutUsText('governance', 'taxDescription', event.target.value)} className={textareaClass} placeholder='Tax section description' />
        </div>
        <div className='mt-4 flex justify-end'>
          <button type='button' onClick={() => void saveAboutUsNonPopupSection('About headings')} disabled={updateMutation.isPending} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={panelClass}>
        <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>Hero Images</h3>
        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <input value={aboutUsForm.history.heroImage} onChange={(event) => updateAboutUsText('history', 'heroImage', event.target.value)} className={inputClass} placeholder='History image URL' />
            <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
              Upload
              <input type='file' accept='image/*' className='hidden' onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                void uploadAboutImage(file, (url) => updateAboutUsText('history', 'heroImage', url), 'History image uploaded.')
              }} />
            </label>
          </div>
          <div>
            <input value={aboutUsForm.mission.heroImage} onChange={(event) => updateAboutUsText('mission', 'heroImage', event.target.value)} className={inputClass} placeholder='Mission image URL' />
            <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
              Upload
              <input type='file' accept='image/*' className='hidden' onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                void uploadAboutImage(file, (url) => updateAboutUsText('mission', 'heroImage', url), 'Mission image uploaded.')
              }} />
            </label>
          </div>
          <div>
            <input value={aboutUsForm.governance.heroImage} onChange={(event) => updateAboutUsText('governance', 'heroImage', event.target.value)} className={inputClass} placeholder='Governance image URL' />
            <label className='mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'>
              Upload
              <input type='file' accept='image/*' className='hidden' onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                void uploadAboutImage(file, (url) => updateAboutUsText('governance', 'heroImage', url), 'Governance image uploaded.')
              }} />
            </label>
          </div>
        </div>
        {isUploadingAboutImage ? <p className='mt-2 text-[12px] text-gray-500'>Uploading...</p> : null}
        <div className='mt-4 flex justify-end'>
          <button type='button' onClick={() => void saveAboutUsNonPopupSection('About images')} disabled={updateMutation.isPending} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={panelClass}>
        <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>Committee CTA</h3>
        <p className='mt-1 text-[12px] text-gray-500'>Content shown in the call-to-action area at the bottom of Committee page.</p>
        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <input value={aboutUsForm.committee.ctaTitle} onChange={(event) => updateAboutUsText('committee', 'ctaTitle', event.target.value)} className={inputClass} placeholder='CTA title' />
          <input value={aboutUsForm.committee.ctaButtonLabel} onChange={(event) => updateAboutUsText('committee', 'ctaButtonLabel', event.target.value)} className={inputClass} placeholder='CTA button label' />
          <textarea value={aboutUsForm.committee.ctaDescription} onChange={(event) => updateAboutUsText('committee', 'ctaDescription', event.target.value)} className={textareaClass} placeholder='CTA description' />
        </div>
        <div className='mt-4 flex justify-end'>
          <button type='button' onClick={() => void saveAboutUsNonPopupSection('Committee CTA')} disabled={updateMutation.isPending} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={panelClass}>
        <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>About Navbar Menu</h3>
        <p className='mt-1 text-[12px] text-gray-500'>Manage About Us dropdown label, headings, and listed page names shown in the top navigation.</p>
        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <input value={aboutUsForm.navbar.label} onChange={(event) => updateAboutUsText('navbar', 'label', event.target.value)} className={inputClass} placeholder='Main menu label (e.g. About Us)' />
          <input value={aboutUsForm.navbar.sections[0]?.heading ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 0 ? { ...section, heading: event.target.value } : section) } }))} className={inputClass} placeholder='First heading (e.g. Our Story)' />
          <input value={aboutUsForm.navbar.sections[0]?.links?.[0]?.label ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 0 ? { ...section, links: (Array.isArray(section.links) ? section.links : []).map((link, linkIdx) => linkIdx === 0 ? { ...link, label: event.target.value } : link) } : section) } }))} className={inputClass} placeholder='First page label (History)' />
          <input value={aboutUsForm.navbar.sections[0]?.links?.[1]?.label ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 0 ? { ...section, links: (Array.isArray(section.links) ? section.links : []).map((link, linkIdx) => linkIdx === 1 ? { ...link, label: event.target.value } : link) } : section) } }))} className={inputClass} placeholder='Second page label (Mission)' />
          <input value={aboutUsForm.navbar.sections[1]?.heading ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 1 ? { ...section, heading: event.target.value } : section) } }))} className={inputClass} placeholder='Second heading (e.g. Organization)' />
          <input value={aboutUsForm.navbar.sections[1]?.links?.[0]?.label ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 1 ? { ...section, links: (Array.isArray(section.links) ? section.links : []).map((link, linkIdx) => linkIdx === 0 ? { ...link, label: event.target.value } : link) } : section) } }))} className={inputClass} placeholder='Third page label (Committee)' />
          <input value={aboutUsForm.navbar.sections[1]?.links?.[1]?.label ?? ''} onChange={(event) => setAboutUsForm((prev) => ({ ...prev, navbar: { ...prev.navbar, sections: prev.navbar.sections.map((section, idx) => idx === 1 ? { ...section, links: (Array.isArray(section.links) ? section.links : []).map((link, linkIdx) => linkIdx === 1 ? { ...link, label: event.target.value } : link) } : section) } }))} className={inputClass} placeholder='Fourth page label (Governance)' />
        </div>
        <div className='mt-4 flex justify-end'>
          <button type='button' onClick={() => void saveAboutUsNonPopupSection('About navbar')} disabled={updateMutation.isPending} className={primaryButtonClass}>
            <Save size={14} className='mr-1.5' />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <DataTable title='History Sections' rows={aboutUsForm.history.sections} columns={[{ key: 'title', label: 'Title' }, { key: 'body', label: 'Body' }]} emptyMessage='No history sections yet.' onEdit={(index) => startEdit('about-history-section', index, aboutUsForm.history.sections[index])} onDelete={(index) => removeAboutUsArrayItem('history', 'sections', index, { title: '', body: '' })} />
      <button type='button' onClick={() => startEdit('about-history-section', -1, { title: '', body: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add History Section
      </button>

      <DataTable title='Mission Cards' rows={aboutUsForm.mission.cards} columns={[{ key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }, { key: 'accent', label: 'Accent', render: (row) => (<span className='inline-flex items-center gap-2'><span className='h-4 w-4 rounded-full border border-gray-200' style={{ backgroundColor: normalizeColorValue(row.accent, '#2d4f9f') }} />{normalizeColorValue(row.accent, '#2d4f9f')}</span>) }]} emptyMessage='No mission cards yet.' onEdit={(index) => startEdit('about-mission-card', index, aboutUsForm.mission.cards[index])} onDelete={(index) => removeAboutUsArrayItem('mission', 'cards', index, { title: '', description: '', accent: '#2d4f9f' })} />
      <button type='button' onClick={() => startEdit('about-mission-card', -1, { title: '', description: '', accent: '#2d4f9f' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Mission Card
      </button>

      <DataTable title='Mission Core Values' rows={aboutUsForm.mission.coreValues} columns={[{ key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }]} emptyMessage='No core values yet.' onEdit={(index) => startEdit('about-mission-value', index, aboutUsForm.mission.coreValues[index])} onDelete={(index) => removeAboutUsArrayItem('mission', 'coreValues', index, { title: '', description: '' })} />
      <button type='button' onClick={() => startEdit('about-mission-value', -1, { title: '', description: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Core Value
      </button>

      <DataTable title='Committee Members' rows={aboutUsForm.committee.members} columns={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'image', label: 'Image URL' }]} emptyMessage='No members yet.' onEdit={(index) => startEdit('about-committee-member', index, aboutUsForm.committee.members[index])} onDelete={(index) => removeAboutUsArrayItem('committee', 'members', index, { initials: '', name: '', role: '', email: '', phone: '', image: '' })} />
      <button type='button' onClick={() => startEdit('about-committee-member', -1, { initials: '', name: '', role: '', email: '', phone: '', image: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Member
      </button>

      <DataTable title='Governance Structure Blocks' rows={aboutUsForm.governance.structureBlocks} columns={[{ key: 'title', label: 'Title' }, { key: 'body', label: 'Body' }]} emptyMessage='No structure blocks yet.' onEdit={(index) => startEdit('about-governance-structure', index, aboutUsForm.governance.structureBlocks[index])} onDelete={(index) => removeAboutUsArrayItem('governance', 'structureBlocks', index, { title: '', body: '' })} />
      <button type='button' onClick={() => startEdit('about-governance-structure', -1, { title: '', body: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Structure Block
      </button>

      <DataTable title='Governance Documents' rows={aboutUsForm.governance.documents} columns={[{ key: 'title', label: 'Title' }, { key: 'size', label: 'Size' }, { key: 'accent', label: 'Accent', render: (row) => (<span className='inline-flex items-center gap-2'><span className='h-4 w-4 rounded-full border border-gray-200' style={{ backgroundColor: normalizeColorValue(row.accent, '#f6ab3c') }} />{normalizeColorValue(row.accent, '#f6ab3c')}</span>) }, { key: 'fileUrl', label: 'File', render: (row) => row.fileUrl ? (<a href={row.fileUrl} target='_blank' rel='noreferrer' className='text-[#001da5] underline'>Open file</a>) : ('-') }]} emptyMessage='No documents yet.' onEdit={(index) => startEdit('about-governance-document', index, aboutUsForm.governance.documents[index])} onDelete={(index) => removeAboutUsArrayItem('governance', 'documents', index, { title: '', size: '', accent: '#f6ab3c', fileUrl: '' })} />
      <button type='button' onClick={() => startEdit('about-governance-document', -1, { title: '', size: '', accent: '#f6ab3c', fileUrl: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Document
      </button>

      <DataTable title='Governance Reports' rows={aboutUsForm.governance.reports} columns={[{ key: 'title', label: 'Title' }, { key: 'size', label: 'Size' }, { key: 'fileUrl', label: 'File', render: (row) => row.fileUrl ? (<a href={row.fileUrl} target='_blank' rel='noreferrer' className='text-[#001da5] underline'>Open file</a>) : ('-') }]} emptyMessage='No reports yet.' onEdit={(index) => startEdit('about-governance-report', index, aboutUsForm.governance.reports[index])} onDelete={(index) => removeAboutUsArrayItem('governance', 'reports', index, { title: '', size: '', fileUrl: '' })} />
      <button type='button' onClick={() => startEdit('about-governance-report', -1, { title: '', size: '', fileUrl: '' })} className={actionButtonClass}>
        <Plus size={14} className='mr-1.5' /> Add Report
      </button>
    </div>
  )
}

export default DashboardAboutSection
