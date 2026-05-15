import React from 'react'
import { ArrowLeft, BookOpen, CalendarDays, ChevronRight, FileText, GraduationCap, Heart, LayoutDashboard, Plus, Save } from 'lucide-react'
import { InteractiveNavCard } from '@/components/ui/interactive-nav-card'

const DashboardServicesRenderer = ({
  activeServicesEditor,
  activeYouthProgramsEditor,
  activeYouthServicesEditor,
  addAdditionalServiceLink,
  addAdditionalServiceLinkImage,
  inputClass,
  onSave,
  patchAdditionalServiceLink,
  panelClass,
  removeAdditionalServiceLink,
  removeAdditionalServiceLinkImage,
  servicesEditorLanguage,
  servicesForm,
  serviceEditorSections,
  setActiveServicesEditor,
  setActiveYouthProgramsEditor,
  setActiveYouthServicesEditor,
  setServicesEditorLanguage,
  setServicesForm,
  textareaClass,
  updateMutation,
  updateAdditionalServiceLabel,
  updateYouthServicesField,
  uploadAdditionalServiceLinkImage,
  uploadingServicesImageField,
  uploadServicesImage,
  uploadYouthServicesImage,
  youthServicesForm,
}) => (
              <section className='space-y-6'>
                <article className='sticky top-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-blue-100 bg-white/95 px-5 py-4 shadow-[0_16px_35px_rgba(0,29,165,0.12)] backdrop-blur'>
                  <div>
                    <h3 className='text-[15px] font-black tracking-tight text-gray-900'>Save Services Changes</h3>
                    <p className='mt-0.5 text-[12px] font-medium text-gray-500'>
                      Save after editing links or page content so the navbar and service page update.
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={onSave}
                    disabled={updateMutation.isPending}
                    className='inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#001da5] px-5 text-[13px] font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#001580] disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    <Save className='h-4 w-4' />
                    {updateMutation.isPending ? 'Saving...' : 'Save Services'}
                  </button>
                </article>

                {!activeServicesEditor ? (
                  <article className={panelClass}>
                    <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Service Sections</h3>
                    <p className='mt-1 text-[13px] text-gray-500'>
                      Select a card to open one focused editor section.
                    </p>
                    <div className='mt-6 grid grid-cols-1 gap-5 md:grid-cols-2'>
                      {serviceEditorSections.map((section) => (
                        <InteractiveNavCard
                          key={section.key}
                          onClick={() => setActiveServicesEditor(section.key)}
                          title={section.title}
                          description={section.description}
                          icon={<FileText size={18} />}
                          iconContainerClassName='text-[#001da5] bg-[#001da5]/5 border-[#001da5]/10'
                        />
                      ))}
                    </div>
                  </article>
                ) : (
                  <div className='rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <button
                        type='button'
                        onClick={() => setActiveServicesEditor(null)}
                        className='inline-flex w-fit items-center gap-2 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-2 text-[12px] font-bold text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-white hover:text-[#001da5]'
                      >
                        <ArrowLeft size={14} />
                        Back To Sections
                      </button>
                      <div className='flex items-center rounded-full border border-gray-200 bg-gray-50 p-1'>
                        {['en', 'de'].map((language) => (
                          <button
                            key={`services-lang-${language}`}
                            type='button'
                            onClick={() => setServicesEditorLanguage(language)}
                            className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-all ${
                              servicesEditorLanguage === language
                                ? 'bg-[#001da5] text-white'
                                : 'text-gray-600 hover:bg-white'
                            }`}
                          >
                            {language}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className='mt-5'>
                {activeServicesEditor === 'dropdown-links' ? (
                <article className={panelClass}>
                  <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Services Dropdown Links</h3>
                  <p className='mt-1 text-[13px] text-gray-500'>
                    Manage the Services menu and content pages shown on the website.
                  </p>
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Menu Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.label}
                        onChange={(event) => updateYouthServicesField('navbar.label', event.target.value)}
                        className={inputClass}
                        placeholder='Services'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Antim Sanskar Link Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.cremationFund}
                        onChange={(event) => updateYouthServicesField('navbar.cremationFund', event.target.value)}
                        className={inputClass}
                        placeholder='Cremation Fund (Antim Sanskar Fund)'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div>
                          <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>
                            Additional Service Links
                          </label>
                          <p className='mt-1 text-[12px] text-gray-500'>
                            Use /services/example for a dashboard-managed page, or link to an existing page like /resources/library.
                          </p>
                        </div>
                        <button
                          type='button'
                          onClick={addAdditionalServiceLink}
                          className='inline-flex items-center gap-2 rounded-[10px] bg-[#001da5] px-3 py-2 text-[12px] font-bold text-white transition hover:bg-[#00167c]'
                        >
                          <Plus className='h-4 w-4' />
                          Add Service
                        </button>
                      </div>
                      <div className='mt-3 space-y-3'>
                        {(youthServicesForm.navbar.additionalLinks ?? []).map((link, index) => (
                          <div
                            key={`additional-service-link-${index}`}
                            className='grid grid-cols-1 gap-3 rounded-[14px] border border-gray-200 bg-gray-50 p-3 md:grid-cols-2'
                          >
                            <div>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Label
                              </label>
                              <input
                                type='text'
                                value={link.label}
                                onChange={(event) => updateAdditionalServiceLabel(index, event.target.value)}
                                className={inputClass}
                                placeholder='Library'
                              />
                            </div>
                            <div>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Link / Path
                              </label>
                              <input
                                type='text'
                                value={link.to ?? ''}
                                onChange={(event) => patchAdditionalServiceLink(index, { to: event.target.value })}
                                className={inputClass}
                                placeholder='/services/library'
                              />
                            </div>
                            <div>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Page Title
                              </label>
                              <input
                                type='text'
                                value={link.pageTitle}
                                onChange={(event) =>
                                  updateYouthServicesField(
                                    `navbar.additionalLinks.${index}.pageTitle`,
                                    event.target.value,
                                  )
                                }
                                className={inputClass}
                                placeholder='Library'
                              />
                            </div>
                            <div>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Page Subtitle
                              </label>
                              <input
                                type='text'
                                value={link.pageSubtitle}
                                onChange={(event) =>
                                  updateYouthServicesField(
                                    `navbar.additionalLinks.${index}.pageSubtitle`,
                                    event.target.value,
                                  )
                                }
                                className={inputClass}
                                placeholder='Short introduction for this service'
                              />
                            </div>
                            <div className='md:col-span-2'>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Page Content
                              </label>
                              <textarea
                                value={link.pageContent}
                                onChange={(event) =>
                                  updateYouthServicesField(
                                    `navbar.additionalLinks.${index}.pageContent`,
                                    event.target.value,
                                  )
                                }
                                className={textareaClass}
                                placeholder='Describe this service. This content appears on the generated service page.'
                              />
                            </div>
                            <div className='md:col-span-2'>
                              <label className='text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                                Service Images
                              </label>
                              <p className='mt-1 text-[12px] text-gray-500'>
                                These images appear on the service detail page in an animated 3-per-row grid.
                              </p>
                              <div className='mt-2 grid grid-cols-1 gap-3 md:grid-cols-2'>
                                {(Array.isArray(link.pageImages) && link.pageImages.length > 0
                                  ? link.pageImages
                                  : ['']
                                ).map((imageUrl, imageIndex) => {
                                  const imagePath = `navbar.additionalLinks.${index}.pageImages.${imageIndex}`
                                  return (
                                    <div
                                      key={`service-link-${index}-image-${imageIndex}`}
                                      className='rounded-[10px] border border-gray-200 bg-white p-2'
                                    >
                                      <label className='text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                                        Image {imageIndex + 1}
                                      </label>
                                      <input
                                        type='text'
                                        value={imageUrl}
                                        onChange={(event) =>
                                          updateYouthServicesField(imagePath, event.target.value)
                                        }
                                        className={inputClass}
                                        placeholder='https://...'
                                      />
                                      <div className='mt-2'>
                                        <label className='inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-gray-200 px-2.5 py-1.5 text-[11px] font-semibold text-gray-700 hover:bg-gray-50'>
                                          <input
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={(event) => {
                                              const file = event.target.files?.[0]
                                              if (!file) return
                                              uploadAdditionalServiceLinkImage(file, index, imageIndex)
                                            }}
                                          />
                                          <ImageIcon className='h-3.5 w-3.5' />
                                          {uploadingServicesImageField === imagePath ? 'Uploading...' : 'Upload'}
                                        </label>
                                      </div>
                                      {imageUrl ? (
                                        <img
                                          src={imageUrl}
                                          alt={`Service preview ${imageIndex + 1}`}
                                          className='mt-2 h-20 w-full rounded-[8px] border border-gray-100 object-cover'
                                        />
                                      ) : null}
                                      <button
                                        type='button'
                                        onClick={() => removeAdditionalServiceLinkImage(index, imageIndex)}
                                        className='mt-2 inline-flex h-8 items-center justify-center gap-1 rounded-[8px] border border-red-100 px-2 text-[11px] font-semibold text-red-600 transition hover:bg-red-50'
                                      >
                                        <Trash2 className='h-3.5 w-3.5' />
                                        Remove Image
                                      </button>
                                    </div>
                                  )
                                })}
                              </div>
                              <button
                                type='button'
                                onClick={() => addAdditionalServiceLinkImage(index)}
                                className='mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-3 text-[12px] font-semibold text-gray-700 transition hover:bg-gray-50'
                              >
                                <Plus className='h-3.5 w-3.5' />
                                Add Image
                              </button>
                            </div>
                            <div className='md:col-span-2 flex justify-end'>
                            <button
                              type='button'
                              onClick={() => removeAdditionalServiceLink(index)}
                              className='inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-red-100 bg-white px-3 text-[12px] font-bold text-red-600 transition hover:bg-red-50'
                              aria-label={`Remove service link ${index + 1}`}
                            >
                              <Trash2 className='h-4 w-4' />
                              Remove Service
                            </button>
                            </div>
                          </div>
                        ))}
                        {(youthServicesForm.navbar.additionalLinks ?? []).length === 0 ? (
                          <p className='rounded-[12px] border border-dashed border-gray-200 px-4 py-3 text-[13px] text-gray-500'>
                            No additional service links yet. Use "Add Service" to list another page in the dropdown.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
                ) : null}

                {activeServicesEditor === 'cremation-fund' ? (
                <article className={panelClass}>
                  <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Cremation Fund Page</h3>
                  <p className='mt-1 text-[13px] text-gray-500'>
                    These fields are rendered on `/services/antim-sanskar-fund`.
                  </p>
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Hero Title</label>
                      <input
                        type='text'
                        value={servicesForm.heroTitle}
                        onChange={(event) =>
                          setServicesForm((prev) => ({ ...prev, heroTitle: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='Page heading'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Hero Subtitle</label>
                      <textarea
                        value={servicesForm.heroSubtitle}
                        onChange={(event) =>
                          setServicesForm((prev) => ({ ...prev, heroSubtitle: event.target.value }))
                        }
                        className={textareaClass}
                        placeholder='Short supporting intro'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Hero Image URL</label>
                      <input
                        type='text'
                        value={servicesForm.heroImage}
                        onChange={(event) =>
                          setServicesForm((prev) => ({ ...prev, heroImage: event.target.value }))
                        }
                        className={inputClass}
                        placeholder='https://...'
                      />
                      <div className='mt-2 flex items-center gap-3'>
                        <label className='inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50'>
                          <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                uploadServicesImage(file, 'heroImage')
                              }
                              event.target.value = ''
                            }}
                          />
                          Upload Hero Image
                        </label>
                        {uploadingServicesImageField === 'heroImage' ? (
                          <span className='text-[12px] font-medium text-gray-500'>Uploading...</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {servicesForm.heroImage ? (
                    <img
                      src={servicesForm.heroImage}
                      alt='Hero preview'
                      className='mt-4 h-40 w-full rounded-[12px] border border-gray-100 object-cover'
                    />
                  ) : null}

                  <div className='mt-8 border-t border-gray-100 pt-6'>
                    <h4 className='text-[16px] font-bold text-gray-900'>Main Content</h4>
                    <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='md:col-span-2'>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Section Title</label>
                        <input
                          type='text'
                          value={servicesForm.aboutTitle}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, aboutTitle: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Section heading'
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>About Text</label>
                        <textarea
                          value={servicesForm.aboutText}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, aboutText: event.target.value }))
                          }
                          className={textareaClass}
                          placeholder='Main paragraph'
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Support Text</label>
                        <textarea
                          value={servicesForm.supportText}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, supportText: event.target.value }))
                          }
                          className={textareaClass}
                          placeholder='Secondary paragraph'
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Support Image URL</label>
                        <input
                          type='text'
                          value={servicesForm.supportImage}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, supportImage: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='https://...'
                        />
                        <div className='mt-2 flex items-center gap-3'>
                          <label className='inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50'>
                            <input
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(event) => {
                                const file = event.target.files?.[0]
                                if (file) {
                                  uploadServicesImage(file, 'supportImage')
                                }
                                event.target.value = ''
                              }}
                            />
                            Upload Support Image
                          </label>
                          {uploadingServicesImageField === 'supportImage' ? (
                            <span className='text-[12px] font-medium text-gray-500'>Uploading...</span>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Contact Button Label</label>
                        <input
                          type='text'
                          value={servicesForm.contactButtonLabel}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, contactButtonLabel: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Contact us'
                        />
                      </div>
                      <div>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Donate Button Label</label>
                        <input
                          type='text'
                          value={servicesForm.donateButtonLabel}
                          onChange={(event) =>
                            setServicesForm((prev) => ({ ...prev, donateButtonLabel: event.target.value }))
                          }
                          className={inputClass}
                          placeholder='Donate now'
                        />
                      </div>
                    </div>
                    {servicesForm.supportImage ? (
                      <img
                        src={servicesForm.supportImage}
                        alt='Support preview'
                        className='mt-4 h-40 w-full rounded-[12px] border border-gray-100 object-cover'
                      />
                    ) : null}
                  </div>
                </article>
                ) : null}

                {activeServicesEditor === 'youth-labels' ? (
                <article className={panelClass}>
                  <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Youth Dropdown Labels</h3>
                  <p className='mt-1 text-[13px] text-gray-500'>
                    These are the class and program labels shown in the Services dropdown.
                  </p>
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Section 1 Heading</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.s1h}
                        onChange={(event) => updateYouthServicesField('navbar.s1h', event.target.value)}
                        className={inputClass}
                        placeholder='CLASSES'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Section 2 Heading</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.s2h}
                        onChange={(event) => updateYouthServicesField('navbar.s2h', event.target.value)}
                        className={inputClass}
                        placeholder='PROGRAMS'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Gurmukhi Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.gurmukhi}
                        onChange={(event) => updateYouthServicesField('navbar.gurmukhi', event.target.value)}
                        className={inputClass}
                        placeholder='Gurmukhi Class'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>German Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.german}
                        onChange={(event) => updateYouthServicesField('navbar.german', event.target.value)}
                        className={inputClass}
                        placeholder='German Class'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Camps Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.camps}
                        onChange={(event) => updateYouthServicesField('navbar.camps', event.target.value)}
                        className={inputClass}
                        placeholder='Camps & Workshops'
                      />
                    </div>
                    <div>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Registration Label</label>
                      <input
                        type='text'
                        value={youthServicesForm.navbar.registration}
                        onChange={(event) => updateYouthServicesField('navbar.registration', event.target.value)}
                        className={inputClass}
                        placeholder='Registration'
                      />
                    </div>
                  </div>
                </article>
                ) : null}

                {activeServicesEditor === 'youth-page' ? (
                <article className={panelClass}>
                  <h3 className='text-[20px] font-black tracking-tight text-gray-900'>Youth Education Page</h3>
                  <p className='mt-1 text-[13px] text-gray-500'>
                    These fields are rendered on `/youth-education` (all sections from your dropdown).
                  </p>
                  <div className='mt-5 grid grid-cols-2 gap-3'>
                      {[
                        { key: 'intro', title: 'Page Intro', icon: LayoutDashboard },
                        { key: 'gurmukhi', title: 'Gurmukhi Section', icon: BookOpen },
                        { key: 'german', title: 'German Section', icon: GraduationCap },
                        { key: 'programs', title: 'Programs & Reasons', icon: Heart },
                      ].map((item) => (
                      <button
                        key={item.key}
                        type='button'
                        onClick={() => setActiveYouthServicesEditor(item.key)}
                        className={`group rounded-[14px] border px-4 py-3 text-left transition-all duration-200 ${
                          activeYouthServicesEditor === item.key
                            ? 'border-[#001da5]/45 bg-[#001da5]/6 text-[#001da5] shadow-[0_8px_20px_-16px_rgba(0,29,165,0.55)]'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-[#001da5]/30 hover:bg-[#001da5]/[0.03] hover:text-[#001da5]'
                        }`}
                      >
                        <div className='flex items-center justify-between gap-3'>
                          <div className='flex items-center gap-3'>
                              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-[10px] ${
                                activeYouthServicesEditor === item.key
                                  ? 'bg-[#001da5]/10 text-[#001da5]'
                                  : 'border border-gray-200 bg-gray-50 text-gray-500 group-hover:border-[#001da5]/20 group-hover:bg-[#001da5]/10 group-hover:text-[#001da5]'
                              }`}>
                              {React.createElement(item.icon, { size: 15 })}
                            </span>
                            <span className='text-[13px] font-bold'>{item.title}</span>
                          </div>
                          <ChevronRight
                            size={15}
                            className={`transition-transform ${
                              activeYouthServicesEditor === item.key ? 'translate-x-0.5 text-[#001da5]' : 'text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#001da5]'
                            }`}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                  {activeYouthServicesEditor === 'intro' ? (
                  <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Page Heading</label>
                      <input
                        type='text'
                        value={youthServicesForm.heading}
                        onChange={(event) => updateYouthServicesField('heading', event.target.value)}
                        className={inputClass}
                        placeholder='Youth & Education'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Page Subtitle</label>
                      <textarea
                        value={youthServicesForm.subtitle}
                        onChange={(event) => updateYouthServicesField('subtitle', event.target.value)}
                        className={textareaClass}
                        placeholder='Subtitle'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Intro</label>
                      <textarea
                        value={youthServicesForm.intro}
                        onChange={(event) => updateYouthServicesField('intro', event.target.value)}
                        className={textareaClass}
                        placeholder='Intro paragraph'
                      />
                    </div>
                  </div>
                  ) : null}

                  {activeYouthServicesEditor === 'gurmukhi' ? (
                  <div className='mt-8 rounded-[16px] border border-gray-100 p-5'>
                    <h4 className='text-[16px] font-bold text-gray-900'>Gurmukhi Section</h4>
                    <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Title</label>
                        <input
                          type='text'
                          value={youthServicesForm.gurmukhi.title}
                          onChange={(event) => updateYouthServicesField('gurmukhi.title', event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Image URL</label>
                        <input
                          type='text'
                          value={youthServicesForm.gurmukhi.image}
                          onChange={(event) => updateYouthServicesField('gurmukhi.image', event.target.value)}
                          className={inputClass}
                        />
                        <div className='mt-2 flex items-center gap-3'>
                          <label className='inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50'>
                            <input
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(event) => {
                                const file = event.target.files?.[0]
                                if (file) uploadYouthServicesImage(file, 'gurmukhi.image')
                                event.target.value = ''
                              }}
                            />
                            Upload Image
                          </label>
                          {uploadingServicesImageField === 'gurmukhi.image' ? (
                            <span className='text-[12px] font-medium text-gray-500'>Uploading...</span>
                          ) : null}
                        </div>
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Description</label>
                        <textarea
                          value={youthServicesForm.gurmukhi.description}
                          onChange={(event) => updateYouthServicesField('gurmukhi.description', event.target.value)}
                          className={textareaClass}
                        />
                      </div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Title</label><input type='text' value={youthServicesForm.gurmukhi.scheduleTitle} onChange={(event) => updateYouthServicesField('gurmukhi.scheduleTitle', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Day</label><input type='text' value={youthServicesForm.gurmukhi.scheduleDay} onChange={(event) => updateYouthServicesField('gurmukhi.scheduleDay', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Time</label><input type='text' value={youthServicesForm.gurmukhi.scheduleTime} onChange={(event) => updateYouthServicesField('gurmukhi.scheduleTime', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Location</label><input type='text' value={youthServicesForm.gurmukhi.scheduleLocation} onChange={(event) => updateYouthServicesField('gurmukhi.scheduleLocation', event.target.value)} className={inputClass} /></div>
                    </div>
                  </div>
                  ) : null}

                  {activeYouthServicesEditor === 'german' ? (
                  <div className='mt-6 rounded-[16px] border border-gray-100 p-5'>
                    <h4 className='text-[16px] font-bold text-gray-900'>German Section</h4>
                    <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Title</label><input type='text' value={youthServicesForm.german.title} onChange={(event) => updateYouthServicesField('german.title', event.target.value)} className={inputClass} /></div>
                      <div>
                        <label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Image URL</label>
                        <input type='text' value={youthServicesForm.german.image} onChange={(event) => updateYouthServicesField('german.image', event.target.value)} className={inputClass} />
                        <div className='mt-2 flex items-center gap-3'>
                          <label className='inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50'>
                            <input
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(event) => {
                                const file = event.target.files?.[0]
                                if (file) uploadYouthServicesImage(file, 'german.image')
                                event.target.value = ''
                              }}
                            />
                            Upload Image
                          </label>
                          {uploadingServicesImageField === 'german.image' ? (
                            <span className='text-[12px] font-medium text-gray-500'>Uploading...</span>
                          ) : null}
                        </div>
                      </div>
                      <div className='md:col-span-2'><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Description</label><textarea value={youthServicesForm.german.description} onChange={(event) => updateYouthServicesField('german.description', event.target.value)} className={textareaClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Title</label><input type='text' value={youthServicesForm.german.scheduleTitle} onChange={(event) => updateYouthServicesField('german.scheduleTitle', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Day</label><input type='text' value={youthServicesForm.german.scheduleDay} onChange={(event) => updateYouthServicesField('german.scheduleDay', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Time</label><input type='text' value={youthServicesForm.german.scheduleTime} onChange={(event) => updateYouthServicesField('german.scheduleTime', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Schedule Location</label><input type='text' value={youthServicesForm.german.scheduleLocation} onChange={(event) => updateYouthServicesField('german.scheduleLocation', event.target.value)} className={inputClass} /></div>
                    </div>
                  </div>
                  ) : null}

                  {activeYouthServicesEditor === 'programs' ? (
                  <div className='mt-6 rounded-[16px] border border-gray-100 p-5'>
                    <h4 className='text-[16px] font-bold text-gray-900'>Programs, Registration & Reasons</h4>
                    <div className='mt-4 grid grid-cols-2 gap-2 rounded-[12px] border border-gray-200 bg-gray-50/70 p-2 md:grid-cols-3'>
                      {[
                        { key: 'overview', title: 'Overview & Registration', icon: LayoutDashboard },
                        { key: 'gurmukhi-levels', title: 'Gurmukhi Levels', icon: BookOpen },
                        { key: 'german-tracks', title: 'German Tracks', icon: GraduationCap },
                        { key: 'camp-cards', title: 'Camp Cards', icon: CalendarDays },
                        { key: 'reasons', title: 'Reasons', icon: Heart },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type='button'
                          onClick={() => setActiveYouthProgramsEditor(item.key)}
                          className={`inline-flex w-full items-center justify-between gap-2 rounded-[10px] border px-3 py-2 text-[12px] font-bold transition ${
                            activeYouthProgramsEditor === item.key
                              ? 'border-[#001da5]/35 bg-[#001da5]/8 text-[#001da5]'
                              : 'border-transparent bg-white text-gray-700 hover:border-[#001da5]/25 hover:text-[#001da5]'
                          }`}
                        >
                          <span className='flex items-center gap-2'>
                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-[8px] ${
                              activeYouthProgramsEditor === item.key
                                ? 'bg-[#001da5]/12 text-[#001da5]'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {React.createElement(item.icon, { size: 13 })}
                            </span>
                            <span>{item.title}</span>
                          </span>
                          <ChevronRight size={14} className={activeYouthProgramsEditor === item.key ? 'text-[#001da5]' : 'text-gray-400'} />
                        </button>
                      ))}
                    </div>
                    {activeYouthProgramsEditor === 'overview' ? (
                    <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Camps Title</label><input type='text' value={youthServicesForm.camps.title} onChange={(event) => updateYouthServicesField('camps.title', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Why Enroll Title</label><input type='text' value={youthServicesForm.whyEnrollTitle} onChange={(event) => updateYouthServicesField('whyEnrollTitle', event.target.value)} className={inputClass} /></div>
                      <div className='md:col-span-2'><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Camps Subtitle</label><textarea value={youthServicesForm.camps.subtitle} onChange={(event) => updateYouthServicesField('camps.subtitle', event.target.value)} className={textareaClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Registration Title</label><input type='text' value={youthServicesForm.registration.title} onChange={(event) => updateYouthServicesField('registration.title', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Registration Contact Button</label><input type='text' value={youthServicesForm.registration.contactButtonLabel} onChange={(event) => updateYouthServicesField('registration.contactButtonLabel', event.target.value)} className={inputClass} /></div>
                      <div><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Registration Schedule Button</label><input type='text' value={youthServicesForm.registration.scheduleButtonLabel} onChange={(event) => updateYouthServicesField('registration.scheduleButtonLabel', event.target.value)} className={inputClass} /></div>
                      <div className='md:col-span-2'><label className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Registration Description</label><textarea value={youthServicesForm.registration.description} onChange={(event) => updateYouthServicesField('registration.description', event.target.value)} className={textareaClass} /></div>
                    </div>
                    ) : null}

                    {activeYouthProgramsEditor === 'gurmukhi-levels' ? (
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      {youthServicesForm.gurmukhi.levels.map((_, index) => (
                        <div key={`gurmukhi-level-${index}`} className='rounded-[12px] border border-gray-100 p-4'>
                          <p className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Gurmukhi Level {index + 1}</p>
                          <input
                            type='text'
                            value={youthServicesForm.gurmukhi.levels[index].title}
                            onChange={(event) =>
                              updateYouthServicesField(`gurmukhi.levels.${index}.title`, event.target.value)
                            }
                            className={inputClass}
                            placeholder='Title'
                          />
                          <textarea
                            value={youthServicesForm.gurmukhi.levels[index].description}
                            onChange={(event) =>
                              updateYouthServicesField(`gurmukhi.levels.${index}.description`, event.target.value)
                            }
                            className={textareaClass}
                            placeholder='Description'
                          />
                        </div>
                      ))}
                    </div>
                    ) : null}

                    {activeYouthProgramsEditor === 'german-tracks' ? (
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      {youthServicesForm.german.tracks.map((_, index) => (
                        <div key={`german-track-${index}`} className='rounded-[12px] border border-gray-100 p-4'>
                          <p className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>German Track {index + 1}</p>
                          <input
                            type='text'
                            value={youthServicesForm.german.tracks[index].title}
                            onChange={(event) =>
                              updateYouthServicesField(`german.tracks.${index}.title`, event.target.value)
                            }
                            className={inputClass}
                            placeholder='Title'
                          />
                          <textarea
                            value={youthServicesForm.german.tracks[index].description}
                            onChange={(event) =>
                              updateYouthServicesField(`german.tracks.${index}.description`, event.target.value)
                            }
                            className={textareaClass}
                            placeholder='Description'
                          />
                        </div>
                      ))}
                    </div>
                    ) : null}

                    {activeYouthProgramsEditor === 'camp-cards' ? (
                    <div className='mt-6 grid grid-cols-1 gap-6'>
                      {youthServicesForm.camps.cards.map((_, index) => (
                        <div key={`camp-card-${index}`} className='rounded-[12px] border border-gray-100 p-4'>
                          <p className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Camp Card {index + 1}</p>
                          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <input
                              type='text'
                              value={youthServicesForm.camps.cards[index].title}
                              onChange={(event) =>
                                updateYouthServicesField(`camps.cards.${index}.title`, event.target.value)
                              }
                              className={inputClass}
                              placeholder='Title'
                            />
                            <input
                              type='text'
                              value={youthServicesForm.camps.cards[index].time}
                              onChange={(event) =>
                                updateYouthServicesField(`camps.cards.${index}.time`, event.target.value)
                              }
                              className={inputClass}
                              placeholder='Time label'
                            />
                          </div>
                          <textarea
                            value={youthServicesForm.camps.cards[index].description}
                            onChange={(event) =>
                              updateYouthServicesField(`camps.cards.${index}.description`, event.target.value)
                            }
                            className={textareaClass}
                            placeholder='Description'
                          />
                        </div>
                      ))}
                    </div>
                    ) : null}

                    {activeYouthProgramsEditor === 'reasons' ? (
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      {youthServicesForm.reasons.map((_, index) => (
                        <div key={`reason-${index}`} className='rounded-[12px] border border-gray-100 p-4'>
                          <p className='text-[12px] font-bold uppercase tracking-wider text-gray-500'>Reason {index + 1}</p>
                          <input
                            type='text'
                            value={youthServicesForm.reasons[index].title}
                            onChange={(event) =>
                              updateYouthServicesField(`reasons.${index}.title`, event.target.value)
                            }
                            className={inputClass}
                            placeholder='Reason title'
                          />
                          <textarea
                            value={youthServicesForm.reasons[index].text}
                            onChange={(event) =>
                              updateYouthServicesField(`reasons.${index}.text`, event.target.value)
                            }
                            className={textareaClass}
                            placeholder='Reason text'
                          />
                        </div>
                      ))}
                    </div>
                    ) : null}
                  </div>
                  ) : null}
                </article>
                ) : null}
                    </div>
                  </div>
                )}
              </section>
)

export default DashboardServicesRenderer
