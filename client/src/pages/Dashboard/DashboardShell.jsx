// File: client/src/pages/Dashboard/DashboardShell.jsx
import React, { Suspense, lazy, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useSiteContentQuery,
  useUpdateContentSectionMutation,
  useUploadContentFileMutation,
  useUploadContentImageMutation,
} from '@/hooks/useContent'
import {
  useAuthUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateProfileMutation,
} from '@/hooks/useAuthQueries'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '../../components/ui/toast-system.jsx'
import DashboardServicesRenderer from '@/pages/Dashboard/shell/DashboardServicesRenderer'
const DashboardAboutSection = lazy(() => import('@/pages/Dashboard/sections/DashboardAboutSection'))
const DashboardContactSection = lazy(() => import('@/pages/Dashboard/sections/DashboardContactSection'))
const DashboardEventsSection = lazy(() => import('@/pages/Dashboard/sections/DashboardEventsSection'))
const DashboardMediaSection = lazy(() => import('@/pages/Dashboard/sections/DashboardMediaSection'))
const DashboardProfileSection = lazy(() => import('@/pages/Dashboard/sections/DashboardProfileSection'))
const DashboardVisitorsSection = lazy(() => import('@/pages/Dashboard/sections/DashboardVisitorsSection'))
import { 
  Users, 
  Calendar, 
  CalendarDays,
  Clock3 as Clock,
  Image as ImageIcon, 
  Mail, 
  Info, 
  User, 
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  ChevronRight,
  ArrowLeft,
  Menu as MenuIcon,
  X,
  PlusCircle,
  FileText,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Heart,
  Search,
  CircleDollarSign
} from 'lucide-react'
import { InteractiveNavCard } from '@/components/ui/interactive-nav-card'

import DashboardDataTable from '@/pages/Dashboard/shell/DashboardDataTable'
import {
  EVENT_CATEGORIES,
  EVENT_EDITOR_CATEGORIES,
  ICON_MAP,
  actionButtonClass,
  defaultAboutUsForm,
  defaultAdditionalServiceLinks,
  defaultDonateForm,
  defaultServicesForm,
  defaultServicesNavbarLabels,
  defaultYouthServicesForm,
  emptyEvent,
  emptyFaq,
  emptyPair,
  menu,
  panelClass,
  primaryButtonClass,
  inputClass,
  textareaClass,
} from '@/pages/Dashboard/shell/dashboardConstants'
import {
  buildAboutUsEditorForm,
  createAboutUsPayload,
  getEmailFromAccessToken,
  normalizeColorValue,
  readLocalizedEditorValue,
  toPairRows,
  toTextRows,
} from '@/pages/Dashboard/shell/dashboardHelpers'
import DashboardSidebar from '@/pages/Dashboard/shell/DashboardSidebar'
import DashboardMobileHeader from '@/pages/Dashboard/shell/DashboardMobileHeader'
import DashboardPageHeader from '@/pages/Dashboard/shell/DashboardPageHeader'
import DashboardDonateSection from '@/pages/Dashboard/sections/DashboardDonateSection'
import DashboardEditModal from '@/pages/Dashboard/shell/DashboardEditModal'
import { useDashboardHandlers } from '@/pages/Dashboard/shell/useDashboardHandlers'
import { useDashboardEffects } from '@/pages/Dashboard/shell/useDashboardEffects'

const DataTable = DashboardDataTable
const DashboardShell = ({ sectionKey = null }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const session = useAuthStore((state) => state.session)
  const setAuth = useAuthStore((state) => state.setAuth)
  const logout = useAuthStore((state) => state.logout)
  const toast = useToast()

  const initialTab = sectionKey ?? location.pathname.split('/')[2]
  const [active, setActive] = useState(
    menu.some((item) => item.key === initialTab) ? initialTab : 'visitors',
  )
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [visitorsForm, setVisitorsForm] = useState({
    guideTitle: '',
    guideBody: '',
    rules: [],
    daily: [],
    langar: [],
    sundaySpecial: '',
    address: [],
    reach: [],
    faq: [],
  })

  const [eventsRows, setEventsRows] = useState([])
  const [mediaCardsRows, setMediaCardsRows] = useState([])
  const [mediaUpdatesRows, setMediaUpdatesRows] = useState([])
  const [contactForm, setContactForm] = useState({
    phone: '',
    email: '',
    address: [],
  })
  const [servicesEditorLanguage, setServicesEditorLanguage] = useState('en')
  const [aboutEditorLanguage, setAboutEditorLanguage] = useState('en')
  const [donateForm, setDonateForm] = useState(defaultDonateForm)
  const [servicesForm, setServicesForm] = useState(defaultServicesForm)
  const [youthServicesForm, setYouthServicesForm] = useState(defaultYouthServicesForm)
  const [activeServicesEditor, setActiveServicesEditor] = useState(null)
  const [activeYouthServicesEditor, setActiveYouthServicesEditor] = useState('intro')
  const [activeYouthProgramsEditor, setActiveYouthProgramsEditor] = useState('overview')
  const [aboutUsForm, setAboutUsForm] = useState(defaultAboutUsForm)
  const [aboutUsSavedSnapshot, setAboutUsSavedSnapshot] = useState('')
  const [aboutUsLastSavedAt, setAboutUsLastSavedAt] = useState(null)

  const [eventDraft, setEventDraft] = useState(emptyEvent)
  const [editingEventIndex, setEditingEventIndex] = useState(null)
  const [eventImageFile, setEventImageFile] = useState(null)
  const [isUploadingEventImage, setIsUploadingEventImage] = useState(false)

  const [visitorDrafts, setVisitorDrafts] = useState({
    rule: '',
    daily: emptyPair,
    langar: emptyPair,
    address: '',
    reach: '',
    faq: emptyFaq,
  })
  const [visitorEditing, setVisitorEditing] = useState({
    rule: null,
    daily: null,
    langar: null,
    address: null,
    reach: null,
    faq: null,
  })

  const [contactAddressDraft, setContactAddressDraft] = useState('')
  const [editingContactAddressIndex, setEditingContactAddressIndex] = useState(null)
  const [openForms, setOpenForms] = useState({
    visitorsRule: false,
    visitorsDaily: false,
    visitorsLangar: false,
    visitorsAddress: false,
    visitorsReach: false,
    visitorsFaq: false,
    events: false,
    contactAddress: false,
  })
  const [editModal, setEditModal] = useState({
    open: false,
    type: '',
    index: null,
    data: {},
  })
  const [modalImageFile, setModalImageFile] = useState(null)
  const [isUploadingModalImage, setIsUploadingModalImage] = useState(false)
  const [modalUploadProgress, setModalUploadProgress] = useState(0)
  const [isUploadingAboutImage, setIsUploadingAboutImage] = useState(false)
  const [uploadingServicesImageField, setUploadingServicesImageField] = useState('')
  const [isDeletingUserId, setIsDeletingUserId] = useState('')
  const [deletingVisitorRuleIndex, setDeletingVisitorRuleIndex] = useState(null)
  const [profileForm, setProfileForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })

  const currentUserEmail = useMemo(() => {
    const storeEmail = typeof user?.email === 'string' ? user.email.trim() : ''
    if (storeEmail) return storeEmail

    const tokenEmail = getEmailFromAccessToken(session?.accessToken).trim()
    if (tokenEmail) return tokenEmail

    return ''
  }, [session?.accessToken, user])

  const visitorRuleFormRef = useRef(null)
  const visitorDailyFormRef = useRef(null)
  const visitorLangarFormRef = useRef(null)
  const visitorAddressFormRef = useRef(null)
  const visitorReachFormRef = useRef(null)
  const visitorFaqFormRef = useRef(null)
  const eventFormRef = useRef(null)
  const contactAddressFormRef = useRef(null)
  const authFailureHandledRef = useRef(false)

  const { data: content, isLoading, dataUpdatedAt } = useSiteContentQuery()
  const updateMutation = useUpdateContentSectionMutation()
  const uploadImageMutation = useUploadContentImageMutation()
  const uploadFileMutation = useUploadContentFileMutation()
  const updateProfileMutation = useUpdateProfileMutation()
  const createUserMutation = useCreateUserMutation()
  const deleteUserMutation = useDeleteUserMutation()

  const usersQuery = useAuthUsersQuery({
    token: session?.accessToken,
    enabled: active === 'profile' && Boolean(session?.accessToken),
  })
  const users = usersQuery.data ?? []
  const usersLoading = usersQuery.isFetching

  // content loading effect moved to useDashboardEffects

  const sectionLabel = useMemo(
    () => menu.find((item) => item.key === active)?.label ?? 'Content',
    [active],
  )
  const serviceEditorSections = useMemo(
    () => [
      {
        key: 'dropdown-links',
        title: 'Services Dropdown Links',
        description: 'Manage services menu labels and additional links.',
      },
      {
        key: 'cremation-fund',
        title: 'Cremation Fund Page',
        description: 'Edit `/services/antim-sanskar-fund` page content.',
      },
      {
        key: 'youth-labels',
        title: 'Youth Dropdown Labels',
        description: 'Configure class and program labels in dropdown.',
      },
      {
        key: 'youth-page',
        title: 'Youth Education Page',
        description: 'Edit all `/youth-education` sections and cards.',
      },
    ],
    [],
  )
  const aboutUsDirty = useMemo(() => {
    if (active !== 'about-us') {
      return false
    }
    return JSON.stringify(createAboutUsPayload(aboutUsForm)) !== aboutUsSavedSnapshot
  }, [aboutUsForm, aboutUsSavedSnapshot, active])
  const aboutUsLastSavedLabel = useMemo(() => {
    if (!aboutUsLastSavedAt) {
      return 'Not saved yet'
    }
    return `Last saved at ${aboutUsLastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }, [aboutUsLastSavedAt])

  const handlers = useDashboardHandlers({
    navigate, location, user, session, setAuth, logout, toast,
    active, setActive, setError, setSuccess,
    visitorsForm, setVisitorsForm, eventsRows, setEventsRows,
    mediaCardsRows, setMediaCardsRows, mediaUpdatesRows, setMediaUpdatesRows,
    contactForm, setContactForm, donateForm, setDonateForm,
    servicesForm, setServicesForm, youthServicesForm, setYouthServicesForm,
    aboutUsForm, setAboutUsForm, aboutUsSavedSnapshot, setAboutUsSavedSnapshot,
    aboutUsLastSavedAt, setAboutUsLastSavedAt,
    eventDraft, setEventDraft, editingEventIndex, setEditingEventIndex,
    eventImageFile, setEventImageFile, isUploadingEventImage, setIsUploadingEventImage,
    visitorDrafts, setVisitorDrafts, visitorEditing, setVisitorEditing,
    contactAddressDraft, setContactAddressDraft, editingContactAddressIndex, setEditingContactAddressIndex,
    openForms, setOpenForms,
    editModal, setEditModal, modalImageFile, setModalImageFile,
    isUploadingModalImage, setIsUploadingModalImage, modalUploadProgress, setModalUploadProgress,
    isUploadingAboutImage, setIsUploadingAboutImage,
    uploadingServicesImageField, setUploadingServicesImageField,
    isDeletingUserId, setIsDeletingUserId,
    deletingVisitorRuleIndex, setDeletingVisitorRuleIndex,
    profileForm, setProfileForm, newUserForm, setNewUserForm,
    content, servicesEditorLanguage, aboutEditorLanguage,
    currentUserEmail, authFailureHandledRef,
    visitorRuleFormRef, visitorDailyFormRef, visitorLangarFormRef,
    visitorAddressFormRef, visitorReachFormRef, visitorFaqFormRef,
    eventFormRef, contactAddressFormRef,
    updateMutation, uploadImageMutation, uploadFileMutation,
    updateProfileMutation, createUserMutation, deleteUserMutation,
    sectionLabel,
  })

  const {
    startEdit, closeEditModal, switchSection, showForm, hideForm,
    handleLogout, onSave, handleModalSave, saveEventsSection,
    upsertEvent, uploadEventImage,
    upsertVisitorsText, upsertVisitorsPair, upsertVisitorsFaq,
    removeVisitorsRow, removeVisitorsFaq, deleteVisitorsRule,
    upsertContactAddress,
    updateAboutUsText, removeAboutUsArrayItem, uploadAboutImage,
    uploadServicesImage, updateYouthServicesField,
    addAdditionalServiceLink, removeAdditionalServiceLink,
    updateAdditionalServiceLabel, patchAdditionalServiceLink,
    uploadYouthServicesImage, uploadAdditionalServiceLinkImage,
    addAdditionalServiceLinkImage, removeAdditionalServiceLinkImage,
    handleProfileUpdate, handleCreateUser, handleDeleteUser,
    saveAboutUsNonPopupSection,
    deleteMediaRowLocal, handleRequestError,
    saveLocalDraft,
    getPanelClass,
  } = handlers

  useDashboardEffects({
    content, dataUpdatedAt,
    sectionKey, location, navigate,
    active, setActive, setError, setSuccess,
    setVisitorsForm, setEventsRows, setMediaCardsRows, setMediaUpdatesRows,
    setContactForm, setDonateForm, setServicesForm, setYouthServicesForm,
    setAboutUsForm, setAboutUsSavedSnapshot, setAboutUsLastSavedAt,
    setEventDraft, setEditingEventIndex, setEventImageFile,
    setVisitorDrafts, setVisitorEditing,
    setContactAddressDraft, setEditingContactAddressIndex, setOpenForms,
    servicesEditorLanguage, aboutEditorLanguage,
    session,
    error, success, toast,
    activeServicesEditor, setActiveServicesEditor,
    activeYouthServicesEditor, setActiveYouthServicesEditor,
    activeYouthProgramsEditor, setActiveYouthProgramsEditor,
    profileForm, setProfileForm,
    currentUserEmail,
    authFailureHandledRef,
    usersQuery,
    handleRequestError,
    menu,
    switchSection,
    toTextRows, toPairRows, buildAboutUsEditorForm, createAboutUsPayload,
    readLocalizedEditorValue,
    defaultYouthServicesForm, defaultAdditionalServiceLinks, defaultServicesNavbarLabels,
    emptyEvent, emptyPair, emptyFaq,
  })

  if (isLoading) {
    return (
      <div className='grid min-h-screen place-items-center bg-[#f4f7ff] font-["Poppins","Segoe_UI",sans-serif]'>
        <div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5]' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f8faff] font-["Poppins","Segoe_UI",sans-serif] text-gray-900 selection:bg-[#001da5]/10 selection:text-[#001da5]'>
      <div className='mx-auto w-full lg:flex'>
        <DashboardSidebar
          active={active}
          onSwitchSection={switchSection}
          currentUserEmail={currentUserEmail}
          onLogout={handleLogout}
        />

        <main className='flex-1 px-4 py-8 md:px-5 lg:px-5'>
          <DashboardMobileHeader
            active={active}
            onSwitchSection={switchSection}
            onLogout={handleLogout}
          />

          <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <DashboardPageHeader
              sectionLabel={sectionLabel}
              active={active}
              onSave={onSave}
            />

            {active === 'visitors' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardVisitorsSection
                  FileText={FileText}
                  Clock={Clock}
                  Plus={Plus}
                  Save={Save}
                  DataTable={DataTable}
                  openForms={openForms}
                  showForm={showForm}
                  actionButtonClass={actionButtonClass}
                  visitorRuleFormRef={visitorRuleFormRef}
                  getPanelClass={getPanelClass}
                  visitorDrafts={visitorDrafts}
                  setVisitorDrafts={setVisitorDrafts}
                  textareaClass={textareaClass}
                  hideForm={hideForm}
                  upsertVisitorsText={upsertVisitorsText}
                  primaryButtonClass={primaryButtonClass}
                  visitorsForm={visitorsForm}
                  startEdit={startEdit}
                  removeVisitorsRow={removeVisitorsRow}
                  deleteVisitorsRule={deleteVisitorsRule}
                  deletingVisitorRuleIndex={deletingVisitorRuleIndex}
                  visitorDailyFormRef={visitorDailyFormRef}
                  inputClass={inputClass}
                  upsertVisitorsPair={upsertVisitorsPair}
                  emptyPair={emptyPair}
                  visitorLangarFormRef={visitorLangarFormRef}
                  setVisitorsForm={setVisitorsForm}
                  visitorAddressFormRef={visitorAddressFormRef}
                  visitorReachFormRef={visitorReachFormRef}
                  visitorFaqFormRef={visitorFaqFormRef}
                  upsertVisitorsFaq={upsertVisitorsFaq}
                  removeVisitorsFaq={removeVisitorsFaq}
                  emptyFaq={emptyFaq}
                />
              </Suspense>
            ) : null}

            {active === 'events' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardEventsSection
                Calendar={Calendar}
                Plus={Plus}
                ImageIcon={ImageIcon}
                Trash2={Trash2}
                DataTable={DataTable}
                actionButtonClass={actionButtonClass}
                showForm={showForm}
                openForms={openForms}
                eventFormRef={eventFormRef}
                getPanelClass={getPanelClass}
                eventDraft={eventDraft}
                setEventDraft={setEventDraft}
                inputClass={inputClass}
                EVENT_CATEGORIES={EVENT_CATEGORIES}
                eventImageFile={eventImageFile}
                setEventImageFile={setEventImageFile}
                uploadEventImage={uploadEventImage}
                isUploadingEventImage={isUploadingEventImage}
                textareaClass={textareaClass}
                hideForm={hideForm}
                saveEventsSection={saveEventsSection}
                editingEventIndex={editingEventIndex}
                setEditingEventIndex={setEditingEventIndex}
                emptyEvent={emptyEvent}
                upsertEvent={upsertEvent}
                primaryButtonClass={primaryButtonClass}
                eventsRows={eventsRows}
                startEdit={startEdit}
                />
              </Suspense>
            ) : null}

            {active === 'media' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardMediaSection
                ImageIcon={ImageIcon}
                Plus={Plus}
                DataTable={DataTable}
                actionButtonClass={actionButtonClass}
                deleteMediaRowLocal={deleteMediaRowLocal}
                mediaCardsRows={mediaCardsRows}
                mediaUpdatesRows={mediaUpdatesRows}
                startEdit={startEdit}
                />
              </Suspense>
            ) : null}

            {active === 'contact' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardContactSection
                Mail={Mail}
                Plus={Plus}
                Save={Save}
                DataTable={DataTable}
                panelClass={panelClass}
                contactForm={contactForm}
                setContactForm={setContactForm}
                inputClass={inputClass}
                openForms={openForms}
                showForm={showForm}
                actionButtonClass={actionButtonClass}
                contactAddressFormRef={contactAddressFormRef}
                getPanelClass={getPanelClass}
                contactAddressDraft={contactAddressDraft}
                setContactAddressDraft={setContactAddressDraft}
                hideForm={hideForm}
                upsertContactAddress={upsertContactAddress}
                primaryButtonClass={primaryButtonClass}
                editingContactAddressIndex={editingContactAddressIndex}
                startEdit={startEdit}
                />
              </Suspense>
            ) : null}

            {active === 'donate' ? (
              <DashboardDonateSection
                donateForm={donateForm}
                setDonateForm={setDonateForm}
                inputClass={inputClass}
                textareaClass={textareaClass}
                panelClass={panelClass}
              />
            ) : null}

            {active === 'services' ? (
              <DashboardServicesRenderer
                activeServicesEditor={activeServicesEditor}
                activeYouthProgramsEditor={activeYouthProgramsEditor}
                activeYouthServicesEditor={activeYouthServicesEditor}
                addAdditionalServiceLink={addAdditionalServiceLink}
                addAdditionalServiceLinkImage={addAdditionalServiceLinkImage}
                inputClass={inputClass}
                onSave={() => saveLocalDraft('Services')}
                patchAdditionalServiceLink={patchAdditionalServiceLink}
                panelClass={panelClass}
                removeAdditionalServiceLink={removeAdditionalServiceLink}
                removeAdditionalServiceLinkImage={removeAdditionalServiceLinkImage}
                servicesEditorLanguage={servicesEditorLanguage}
                servicesForm={servicesForm}
                serviceEditorSections={serviceEditorSections}
                setActiveServicesEditor={setActiveServicesEditor}
                setActiveYouthProgramsEditor={setActiveYouthProgramsEditor}
                setActiveYouthServicesEditor={setActiveYouthServicesEditor}
                setServicesEditorLanguage={setServicesEditorLanguage}
                setServicesForm={setServicesForm}
                textareaClass={textareaClass}
                updateAdditionalServiceLabel={updateAdditionalServiceLabel}
                updateMutation={updateMutation}
                updateYouthServicesField={updateYouthServicesField}
                uploadAdditionalServiceLinkImage={uploadAdditionalServiceLinkImage}
                uploadingServicesImageField={uploadingServicesImageField}
                uploadServicesImage={uploadServicesImage}
                uploadYouthServicesImage={uploadYouthServicesImage}
                youthServicesForm={youthServicesForm}
              />
            ) : null}
            {active === 'about-us' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardAboutSection
                Save={Save}
                Plus={Plus}
                DataTable={DataTable}
                panelClass={panelClass}
                aboutUsDirty={aboutUsDirty}
                aboutUsLastSavedLabel={aboutUsLastSavedLabel}
                aboutEditorLanguage={aboutEditorLanguage}
                setAboutEditorLanguage={setAboutEditorLanguage}
                aboutUsForm={aboutUsForm}
                updateAboutUsText={updateAboutUsText}
                inputClass={inputClass}
                textareaClass={textareaClass}
                saveAboutUsNonPopupSection={saveAboutUsNonPopupSection}
                updateMutation={updateMutation}
                primaryButtonClass={primaryButtonClass}
                uploadAboutImage={uploadAboutImage}
                isUploadingAboutImage={isUploadingAboutImage}
                setAboutUsForm={setAboutUsForm}
                actionButtonClass={actionButtonClass}
                startEdit={startEdit}
                removeAboutUsArrayItem={removeAboutUsArrayItem}
                normalizeColorValue={normalizeColorValue}
                />
              </Suspense>
            ) : null}
            {active === 'profile' ? (
              <Suspense fallback={<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#001da5] mx-auto my-10' />}>
                <DashboardProfileSection
                User={User}
                PlusCircle={PlusCircle}
                Plus={Plus}
                Save={Save}
                DataTable={DataTable}
                panelClass={panelClass}
                profileForm={profileForm}
                inputClass={inputClass}
                setProfileForm={setProfileForm}
                handleProfileUpdate={handleProfileUpdate}
                isProfileSaving={updateProfileMutation.isPending}
                newUserForm={newUserForm}
                setNewUserForm={setNewUserForm}
                handleCreateUser={handleCreateUser}
                isCreatingUser={createUserMutation.isPending}
                users={users}
                usersLoading={usersLoading}
                isDeletingUserId={isDeletingUserId}
                currentUserId={user?.id ?? ''}
                handleDeleteUser={handleDeleteUser}
                primaryButtonClass={primaryButtonClass}
                />
              </Suspense>
            ) : null}

            <DashboardEditModal
              editModal={editModal}
              setEditModal={setEditModal}
              closeEditModal={closeEditModal}
              handleModalSave={handleModalSave}
              modalImageFile={modalImageFile}
              setModalImageFile={setModalImageFile}
              isUploadingModalImage={isUploadingModalImage}
              modalUploadProgress={modalUploadProgress}
              actionButtonClass={actionButtonClass}
              primaryButtonClass={primaryButtonClass}
              inputClass={inputClass}
              textareaClass={textareaClass}
              EVENT_EDITOR_CATEGORIES={EVENT_EDITOR_CATEGORIES}
              normalizeColorValue={normalizeColorValue}
            />

            {active !== 'profile' && active !== 'about-us' && active !== 'services' ? (
              <button
                type='button'
                onClick={() => saveLocalDraft(sectionLabel)}
                disabled={updateMutation.isPending}
                className='mt-8 inline-flex h-11 items-center justify-center rounded-[10px] bg-black px-6 text-[14px] font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70'
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardShell
