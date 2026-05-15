import React from 'react'

const DashboardProfileSection = ({
  User: userIcon,
  PlusCircle: plusCircleIcon,
  Plus: plusIcon,
  Save: saveIcon,
  DataTable: dataTableComponent,
  panelClass,
  profileForm,
  inputClass,
  setProfileForm,
  handleProfileUpdate,
  isProfileSaving,
  newUserForm,
  setNewUserForm,
  handleCreateUser,
  isCreatingUser,
  users,
  usersLoading,
  isDeletingUserId,
  currentUserId,
  handleDeleteUser,
  primaryButtonClass,
}) => {
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [showInitialPassword, setShowInitialPassword] = React.useState(false)
  const [activeProfileTab, setActiveProfileTab] = React.useState('credentials')

  const adminsCount = users.filter((user) => user.role === 'admin').length
  const fieldLabelClass = 'ml-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500'
  const password = profileForm.password || ''
  const confirmPassword = profileForm.confirmPassword || ''
  const hasPasswordInput = Boolean(password || confirmPassword)
  const passwordMismatch = hasPasswordInput && password !== confirmPassword
  const passwordTooShort = Boolean(password) && password.length < 8
  const canSaveProfile = hasPasswordInput && !passwordMismatch && !passwordTooShort && !isProfileSaving

  const newUserName = (newUserForm.name || '').trim()
  const newUserEmail = (newUserForm.email || '').trim()
  const newUserPassword = newUserForm.password || ''
  const newUserPasswordTooShort = Boolean(newUserPassword) && newUserPassword.length < 8
  const canCreateUser =
    Boolean(newUserName && newUserEmail && newUserPassword) && !newUserPasswordTooShort && !isCreatingUser

  return (
    <div className='mt-10 space-y-8'>
      <section className='rounded-[18px] border border-gray-200 bg-white px-5 py-5'>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr] lg:items-center'>
          <div>
            <p className='text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500'>
              Account Center
            </p>
            <h3 className='mt-1 text-[22px] font-black tracking-tight text-gray-900'>Profile & Access Control</h3>
            <p className='mt-1 max-w-[580px] text-[13px] leading-6 text-gray-500'>
              Keep your administrator account secure and control who can manage website content.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-3 sm:max-w-[320px] lg:ml-auto'>
            <div className='rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3'>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500'>Users</p>
              <p className='mt-1 text-[24px] font-black tracking-tight text-gray-900'>{users.length}</p>
            </div>
            <div className='rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3'>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500'>Admins</p>
              <p className='mt-1 text-[24px] font-black tracking-tight text-gray-900'>{adminsCount}</p>
            </div>
          </div>
        </div>
      </section>

      <article className={panelClass}>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5'>
          <div className='flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#001da5]/10 bg-[#001da5]/5 text-[#001da5]'>
              {activeProfileTab === 'credentials'
                ? React.createElement(userIcon, { size: 23 })
                : React.createElement(plusCircleIcon, { size: 23 })}
            </div>
            <div>
              <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>
                {activeProfileTab === 'credentials' ? 'My Credentials' : 'Add Team Member'}
              </h4>
              <p className='text-[12px] text-gray-400'>
                {activeProfileTab === 'credentials'
                  ? 'Update your login email and password'
                  : 'Create another dashboard account instantly'}
              </p>
            </div>
          </div>
          <div className='inline-flex rounded-[10px] border border-gray-200 bg-gray-50 p-1'>
            <button
              type='button'
              onClick={() => setActiveProfileTab('credentials')}
              className={`rounded-[8px] px-3 py-1.5 text-[12px] font-bold ${
                activeProfileTab === 'credentials' ? 'bg-white text-[#001da5] shadow-sm' : 'text-gray-600'
              }`}
            >
              My Credentials
            </button>
            <button
              type='button'
              onClick={() => setActiveProfileTab('member')}
              className={`rounded-[8px] px-3 py-1.5 text-[12px] font-bold ${
                activeProfileTab === 'member' ? 'bg-white text-[#001da5] shadow-sm' : 'text-gray-600'
              }`}
            >
              Add Team Member
            </button>
          </div>
        </div>

        {activeProfileTab === 'credentials' ? (
          <>
            <div className='grid grid-cols-1 gap-6'>
            <label className={fieldLabelClass}>
              Login Email
              <input
                type='email'
                value={profileForm.email}
                readOnly
                className={`${inputClass} cursor-not-allowed opacity-60`}
                placeholder='you@example.com'
              />
            </label>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <label className={fieldLabelClass}>
                New Password
                <div className='relative'>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={profileForm.password}
                    onChange={(event) =>
                      setProfileForm((prev) => ({ ...prev, password: event.target.value }))
                    }
                    className={inputClass}
                    placeholder='Minimum 8 characters'
                  />
                  <button
                    type='button'
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-500 hover:text-[#001da5]'
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
              <label className={fieldLabelClass}>
                Confirm Password
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={profileForm.confirmPassword}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder='Repeat new password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-500 hover:text-[#001da5]'
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </div>
            {passwordTooShort ? (
              <p className='text-[12px] font-semibold text-red-500'>Password must be at least 8 characters.</p>
            ) : null}
            {passwordMismatch ? (
              <p className='text-[12px] font-semibold text-red-500'>Passwords do not match.</p>
            ) : null}
            </div>

            <div className='mt-7 flex justify-end border-t border-gray-100 pt-5'>
              <button
                type='button'
                onClick={handleProfileUpdate}
                disabled={!canSaveProfile}
                className={`${primaryButtonClass} disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {React.createElement(saveIcon, { size: 16, className: 'mr-2' })}
                {isProfileSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <label className={`${fieldLabelClass} md:col-span-2`}>
              Full Name
              <input
                value={newUserForm.name}
                onChange={(event) =>
                  setNewUserForm((prev) => ({ ...prev, name: event.target.value }))
                }
                className={inputClass}
                placeholder='Full name'
              />
            </label>
            <label className={fieldLabelClass}>
              Email Address
              <input
                type='email'
                value={newUserForm.email}
                onChange={(event) =>
                  setNewUserForm((prev) => ({ ...prev, email: event.target.value }))
                }
                className={inputClass}
                placeholder='email@example.com'
              />
            </label>
            <label className={fieldLabelClass}>
              Access Level
              <select
                value={newUserForm.role}
                onChange={(event) =>
                  setNewUserForm((prev) => ({ ...prev, role: event.target.value }))
                }
                className={inputClass}
              >
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            </label>
            <label className={`${fieldLabelClass} md:col-span-2`}>
              Initial Password
              <div className='relative'>
                <input
                  type={showInitialPassword ? 'text' : 'password'}
                  value={newUserForm.password}
                  onChange={(event) =>
                    setNewUserForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='Minimum 8 characters'
                />
                <button
                  type='button'
                  onClick={() => setShowInitialPassword((prev) => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-500 hover:text-[#001da5]'
                >
                  {showInitialPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            <p className='md:col-span-2 text-[12px] text-gray-500'>Admin can manage all sections. User has limited dashboard access.</p>
            {newUserPasswordTooShort ? (
              <p className='md:col-span-2 text-[12px] font-semibold text-red-500'>
                Initial password must be at least 8 characters.
              </p>
            ) : null}
            </div>

            <div className='mt-7 flex justify-end border-t border-gray-100 pt-5'>
              <button
                type='button'
                onClick={handleCreateUser}
                disabled={!canCreateUser}
                className={`${primaryButtonClass} w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {React.createElement(plusIcon, { size: 16, className: 'mr-2' })}
                {isCreatingUser ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </>
        )}
      </article>

      {React.createElement(dataTableComponent, {
        title: 'System Access Directory',
        rows: users,
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email Address' },
          {
            key: 'role',
            label: 'Role',
            render: (row) => (
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                  row.role === 'admin'
                    ? 'border-[#001da5]/15 bg-[#001da5]/5 text-[#001da5]'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                }`}
              >
                {row.role.toUpperCase()}
              </span>
            ),
          },
        ],
        emptyMessage: usersLoading ? 'Loading team members...' : 'No additional users found.',
        showActions: true,
        onDelete: (index) => {
          const targetUser = users[index]
          const targetId = (targetUser?.id ?? '').trim()
          const actingUserId = (currentUserId ?? '').trim()

          if (!targetId || (actingUserId && targetId === actingUserId) || isDeletingUserId) {
            return
          }

          handleDeleteUser(targetUser)
        },
      })}
    </div>
  )
}

export default DashboardProfileSection
