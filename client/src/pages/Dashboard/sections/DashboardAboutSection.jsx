import React from 'react'

const AboutPagePanel = ({
  title,
  description,
  panelClass,
  primaryButtonClass,
  updateMutation,
  saveLabel,
  onSave,
  saveIcon,
  children,
}) => (
  <div className={panelClass}>
    <div className='flex flex-col gap-1 border-b border-gray-100 pb-4'>
      <h3 className='text-[18px] font-bold tracking-tight text-gray-900'>{title}</h3>
      <p className='text-[12px] text-gray-500'>{description}</p>
    </div>
    <div className='mt-5 space-y-5'>{children}</div>
    <div className='mt-6 flex justify-end'>
      <button
        type='button'
        onClick={() => void onSave()}
        disabled={updateMutation.isPending}
        className={primaryButtonClass}
      >
        {React.createElement(saveIcon, { size: 14, className: 'mr-1.5' })}
        {updateMutation.isPending ? 'Saving...' : saveLabel}
      </button>
    </div>
  </div>
)

const FieldGroup = ({ title, description, children }) => (
  <div className='space-y-3 rounded-[14px] border border-gray-100 bg-gray-50/60 p-4'>
    <div>
      <h4 className='text-[14px] font-semibold text-gray-900'>{title}</h4>
      {description ? <p className='mt-1 text-[12px] text-gray-500'>{description}</p> : null}
    </div>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>{children}</div>
  </div>
)

const uploadInputClass =
  'mt-2 inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-gray-700'

const DashboardAboutSection = ({
  Save: saveIcon,
  Plus: plusIcon,
  DataTable: dataTableComponent,
  panelClass,
  aboutUsDirty,
  aboutUsLastSavedLabel,
  aboutEditorLanguage,
  setAboutEditorLanguage,
  aboutUsForm,
  updateAboutUsText,
  inputClass,
  textareaClass,
  saveAboutUsNonPopupSection,
  updateMutation,
  primaryButtonClass,
  uploadAboutImage,
  isUploadingAboutImage,
  actionButtonClass,
  startEdit,
  removeAboutUsArrayItem,
  normalizeColorValue,
}) => {
  const renderImageField = (pageKey, label, successMessage) => (
    <div>
      <input
        value={aboutUsForm[pageKey].heroImage}
        onChange={(event) => updateAboutUsText(pageKey, 'heroImage', event.target.value)}
        className={inputClass}
        placeholder={`${label} image URL`}
      />
      <label className={uploadInputClass}>
        Upload
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            void uploadAboutImage(file, (url) => updateAboutUsText(pageKey, 'heroImage', url), successMessage)
          }}
        />
      </label>
    </div>
  )

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
            {aboutUsDirty ? 'Unsaved changes in About Us pages' : 'All changes saved'}
          </p>
        </div>
        <p className='text-[12px] font-medium text-gray-500'>{aboutUsLastSavedLabel}</p>
      </div>

      <div className='flex items-center justify-between rounded-[14px] border border-gray-200 bg-white px-4 py-3'>
        <p className='text-[13px] font-semibold text-gray-700'>Editing Language</p>
        <div className='flex items-center rounded-full border border-gray-200 bg-gray-50 p-1'>
          {['en', 'de'].map((language) => (
            <button
              key={`about-lang-${language}`}
              type='button'
              onClick={() => setAboutEditorLanguage(language)}
              className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-all ${
                aboutEditorLanguage === language
                  ? 'bg-[#001da5] text-white'
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <AboutPagePanel
        title='History Page'
        description='Edit only the content that appears on the History page.'
        panelClass={panelClass}
        primaryButtonClass={primaryButtonClass}
        updateMutation={updateMutation}
        saveLabel='Save History Page'
        onSave={() => saveAboutUsNonPopupSection('History page')}
        saveIcon={saveIcon}
      >
        <FieldGroup title='Hero Section' description='Main heading, summary text, and image shown at the top of the History page.'>
          <input
            value={aboutUsForm.history.heroTitle}
            onChange={(event) => updateAboutUsText('history', 'heroTitle', event.target.value)}
            className={inputClass}
            placeholder='History page title'
          />
          <input
            value={aboutUsForm.history.heroSubtitle}
            onChange={(event) => updateAboutUsText('history', 'heroSubtitle', event.target.value)}
            className={inputClass}
            placeholder='History page subtitle'
          />
          <div className='md:col-span-2'>
            {renderImageField('history', 'History', 'History image uploaded.')}
          </div>
        </FieldGroup>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'History Content Sections',
            rows: aboutUsForm.history.sections,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'body', label: 'Body' },
            ],
            emptyMessage: 'No history sections yet.',
            onEdit: (index) => startEdit('about-history-section', index, aboutUsForm.history.sections[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('history', 'sections', index, { title: '', body: '' }),
          })}
          <button
            type='button'
            onClick={() => startEdit('about-history-section', -1, { title: '', body: '' })}
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add History Section
          </button>
        </div>
      </AboutPagePanel>

      <AboutPagePanel
        title='Mission & Vision Page'
        description='Edit the page hero, mission cards, and core values for Mission & Vision.'
        panelClass={panelClass}
        primaryButtonClass={primaryButtonClass}
        updateMutation={updateMutation}
        saveLabel='Save Mission & Vision Page'
        onSave={() => saveAboutUsNonPopupSection('Mission and vision page')}
        saveIcon={saveIcon}
      >
        <FieldGroup title='Hero Section' description='Top-level heading, overview, and image for the Mission & Vision page.'>
          <input
            value={aboutUsForm.mission.heroTitle}
            onChange={(event) => updateAboutUsText('mission', 'heroTitle', event.target.value)}
            className={inputClass}
            placeholder='Mission page title'
          />
          <textarea
            value={aboutUsForm.mission.heroDescription}
            onChange={(event) => updateAboutUsText('mission', 'heroDescription', event.target.value)}
            className={textareaClass}
            placeholder='Mission page overview'
          />
          <div className='md:col-span-2'>
            {renderImageField('mission', 'Mission', 'Mission image uploaded.')}
          </div>
        </FieldGroup>

        <FieldGroup title='Core Values Header' description='Heading shown above the core values list.'>
          <input
            value={aboutUsForm.mission.coreValuesTitle}
            onChange={(event) => updateAboutUsText('mission', 'coreValuesTitle', event.target.value)}
            className={inputClass}
            placeholder='Core values section title'
          />
        </FieldGroup>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Mission Cards',
            rows: aboutUsForm.mission.cards,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
              {
                key: 'accent',
                label: 'Accent',
                render: (row) => (
                  <span className='inline-flex items-center gap-2'>
                    <span
                      className='h-4 w-4 rounded-full border border-gray-200'
                      style={{ backgroundColor: normalizeColorValue(row.accent, '#2d4f9f') }}
                    />
                    {normalizeColorValue(row.accent, '#2d4f9f')}
                  </span>
                ),
              },
            ],
            emptyMessage: 'No mission cards yet.',
            onEdit: (index) => startEdit('about-mission-card', index, aboutUsForm.mission.cards[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('mission', 'cards', index, {
                title: '',
                description: '',
                accent: '#2d4f9f',
              }),
          })}
          <button
            type='button'
            onClick={() =>
              startEdit('about-mission-card', -1, {
                title: '',
                description: '',
                accent: '#2d4f9f',
              })
            }
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Mission Card
          </button>
        </div>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Core Values',
            rows: aboutUsForm.mission.coreValues,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
            ],
            emptyMessage: 'No core values yet.',
            onEdit: (index) =>
              startEdit('about-mission-value', index, aboutUsForm.mission.coreValues[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('mission', 'coreValues', index, { title: '', description: '' }),
          })}
          <button
            type='button'
            onClick={() => startEdit('about-mission-value', -1, { title: '', description: '' })}
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Core Value
          </button>
        </div>
      </AboutPagePanel>

      <AboutPagePanel
        title='Committee Page'
        description='Edit the committee introduction, member list, and bottom call-to-action in one place.'
        panelClass={panelClass}
        primaryButtonClass={primaryButtonClass}
        updateMutation={updateMutation}
        saveLabel='Save Committee Page'
        onSave={() => saveAboutUsNonPopupSection('Committee page')}
        saveIcon={saveIcon}
      >
        <FieldGroup title='Hero Section' description='Top section content for the Committee page.'>
          <input
            value={aboutUsForm.committee.heroTitle}
            onChange={(event) => updateAboutUsText('committee', 'heroTitle', event.target.value)}
            className={inputClass}
            placeholder='Committee page title'
          />
          <input
            value={aboutUsForm.committee.heroSubtitle}
            onChange={(event) => updateAboutUsText('committee', 'heroSubtitle', event.target.value)}
            className={inputClass}
            placeholder='Committee page subtitle'
          />
          <div className='md:col-span-2'>
            <textarea
              value={aboutUsForm.committee.intro}
              onChange={(event) => updateAboutUsText('committee', 'intro', event.target.value)}
              className={textareaClass}
              placeholder='Committee page introduction'
            />
          </div>
        </FieldGroup>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Committee Members',
            rows: aboutUsForm.committee.members,
            columns: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'image', label: 'Image URL' },
            ],
            emptyMessage: 'No members yet.',
            onEdit: (index) =>
              startEdit('about-committee-member', index, aboutUsForm.committee.members[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('committee', 'members', index, {
                initials: '',
                name: '',
                role: '',
                email: '',
                phone: '',
                image: '',
              }),
          })}
          <button
            type='button'
            onClick={() =>
              startEdit('about-committee-member', -1, {
                initials: '',
                name: '',
                role: '',
                email: '',
                phone: '',
                image: '',
              })
            }
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Member
          </button>
        </div>

        <FieldGroup title='Bottom CTA Section' description='Call-to-action shown near the bottom of the Committee page.'>
          <input
            value={aboutUsForm.committee.ctaTitle}
            onChange={(event) => updateAboutUsText('committee', 'ctaTitle', event.target.value)}
            className={inputClass}
            placeholder='CTA title'
          />
          <input
            value={aboutUsForm.committee.ctaButtonLabel}
            onChange={(event) => updateAboutUsText('committee', 'ctaButtonLabel', event.target.value)}
            className={inputClass}
            placeholder='CTA button label'
          />
          <div className='md:col-span-2'>
            <textarea
              value={aboutUsForm.committee.ctaDescription}
              onChange={(event) => updateAboutUsText('committee', 'ctaDescription', event.target.value)}
              className={textareaClass}
              placeholder='CTA description'
            />
          </div>
        </FieldGroup>
      </AboutPagePanel>

      <AboutPagePanel
        title='Governance Page'
        description='Edit governance hero content, structure blocks, documents, reports, and trust-related sections.'
        panelClass={panelClass}
        primaryButtonClass={primaryButtonClass}
        updateMutation={updateMutation}
        saveLabel='Save Governance Page'
        onSave={() => saveAboutUsNonPopupSection('Governance page')}
        saveIcon={saveIcon}
      >
        <FieldGroup title='Hero Section' description='Top section content and image for the Governance page.'>
          <input
            value={aboutUsForm.governance.heroTitle}
            onChange={(event) => updateAboutUsText('governance', 'heroTitle', event.target.value)}
            className={inputClass}
            placeholder='Governance page title'
          />
          <input
            value={aboutUsForm.governance.heroSubtitle}
            onChange={(event) => updateAboutUsText('governance', 'heroSubtitle', event.target.value)}
            className={inputClass}
            placeholder='Governance page subtitle'
          />
          <div className='md:col-span-2'>
            {renderImageField('governance', 'Governance', 'Governance image uploaded.')}
          </div>
        </FieldGroup>

        <FieldGroup title='Structure Section' description='Heading and intro shown before the governance structure content blocks.'>
          <input
            value={aboutUsForm.governance.structureTitle}
            onChange={(event) => updateAboutUsText('governance', 'structureTitle', event.target.value)}
            className={inputClass}
            placeholder='Structure section title'
          />
          <textarea
            value={aboutUsForm.governance.structureIntro}
            onChange={(event) => updateAboutUsText('governance', 'structureIntro', event.target.value)}
            className={textareaClass}
            placeholder='Structure section intro'
          />
        </FieldGroup>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Structure Blocks',
            rows: aboutUsForm.governance.structureBlocks,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'body', label: 'Body' },
            ],
            emptyMessage: 'No structure blocks yet.',
            onEdit: (index) =>
              startEdit('about-governance-structure', index, aboutUsForm.governance.structureBlocks[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('governance', 'structureBlocks', index, {
                title: '',
                body: '',
              }),
          })}
          <button
            type='button'
            onClick={() => startEdit('about-governance-structure', -1, { title: '', body: '' })}
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Structure Block
          </button>
        </div>

        <FieldGroup title='Documents and Reports Headers' description='Section labels and button text used in the governance resources area.'>
          <input
            value={aboutUsForm.governance.documentsTitle}
            onChange={(event) => updateAboutUsText('governance', 'documentsTitle', event.target.value)}
            className={inputClass}
            placeholder='Documents section title'
          />
          <input
            value={aboutUsForm.governance.reportsTitle}
            onChange={(event) => updateAboutUsText('governance', 'reportsTitle', event.target.value)}
            className={inputClass}
            placeholder='Reports section title'
          />
          <input
            value={aboutUsForm.governance.downloadCtaLabel}
            onChange={(event) => updateAboutUsText('governance', 'downloadCtaLabel', event.target.value)}
            className={inputClass}
            placeholder='Download button label'
          />
        </FieldGroup>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Governance Documents',
            rows: aboutUsForm.governance.documents,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'size', label: 'Size' },
              {
                key: 'accent',
                label: 'Accent',
                render: (row) => (
                  <span className='inline-flex items-center gap-2'>
                    <span
                      className='h-4 w-4 rounded-full border border-gray-200'
                      style={{ backgroundColor: normalizeColorValue(row.accent, '#f6ab3c') }}
                    />
                    {normalizeColorValue(row.accent, '#f6ab3c')}
                  </span>
                ),
              },
              {
                key: 'fileUrl',
                label: 'File',
                render: (row) =>
                  row.fileUrl ? (
                    <a href={row.fileUrl} target='_blank' rel='noreferrer' className='text-[#001da5] underline'>
                      Open file
                    </a>
                  ) : (
                    '-'
                  ),
              },
            ],
            emptyMessage: 'No documents yet.',
            onEdit: (index) =>
              startEdit('about-governance-document', index, aboutUsForm.governance.documents[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('governance', 'documents', index, {
                title: '',
                size: '',
                accent: '#f6ab3c',
                fileUrl: '',
              }),
          })}
          <button
            type='button'
            onClick={() =>
              startEdit('about-governance-document', -1, {
                title: '',
                size: '',
                accent: '#f6ab3c',
                fileUrl: '',
              })
            }
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Document
          </button>
        </div>

        <div className='space-y-3'>
          {React.createElement(dataTableComponent, {
            title: 'Governance Reports',
            rows: aboutUsForm.governance.reports,
            columns: [
              { key: 'title', label: 'Title' },
              { key: 'size', label: 'Size' },
              {
                key: 'fileUrl',
                label: 'File',
                render: (row) =>
                  row.fileUrl ? (
                    <a href={row.fileUrl} target='_blank' rel='noreferrer' className='text-[#001da5] underline'>
                      Open file
                    </a>
                  ) : (
                    '-'
                  ),
              },
            ],
            emptyMessage: 'No reports yet.',
            onEdit: (index) =>
              startEdit('about-governance-report', index, aboutUsForm.governance.reports[index]),
            onDelete: (index) =>
              removeAboutUsArrayItem('governance', 'reports', index, {
                title: '',
                size: '',
                fileUrl: '',
              }),
          })}
          <button
            type='button'
            onClick={() => startEdit('about-governance-report', -1, { title: '', size: '', fileUrl: '' })}
            className={actionButtonClass}
          >
            {React.createElement(plusIcon, { size: 14, className: 'mr-1.5' })} Add Report
          </button>
        </div>

        <FieldGroup title='Transparency and Tax Sections' description='Text blocks shown lower down on the Governance page.'>
          <input
            value={aboutUsForm.governance.financialTitle}
            onChange={(event) => updateAboutUsText('governance', 'financialTitle', event.target.value)}
            className={inputClass}
            placeholder='Financial transparency title'
          />
          <textarea
            value={aboutUsForm.governance.financialDescription}
            onChange={(event) =>
              updateAboutUsText('governance', 'financialDescription', event.target.value)
            }
            className={textareaClass}
            placeholder='Financial transparency description'
          />
          <input
            value={aboutUsForm.governance.taxTitle}
            onChange={(event) => updateAboutUsText('governance', 'taxTitle', event.target.value)}
            className={inputClass}
            placeholder='Tax section title'
          />
          <textarea
            value={aboutUsForm.governance.taxDescription}
            onChange={(event) => updateAboutUsText('governance', 'taxDescription', event.target.value)}
            className={textareaClass}
            placeholder='Tax section description'
          />
        </FieldGroup>
      </AboutPagePanel>

      {isUploadingAboutImage ? <p className='text-[12px] text-gray-500'>Uploading image...</p> : null}
    </div>
  )
}

export default DashboardAboutSection
