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
  const adminsCount = users.filter((user) => user.role === 'admin').length

  return (
    <div className='mt-10 space-y-10'>
      <section className='rounded-[18px] border border-gray-200 bg-white px-5 py-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]'>
          <div>
            <p className='text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500'>
              Account Center
            </p>
            <h3 className='mt-1 text-[22px] font-black tracking-tight text-gray-900'>Profile & Access Control</h3>
            <p className='mt-1 max-w-[580px] text-[13px] leading-6 text-gray-500'>
              Keep your administrator account secure and control who can manage website content.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='rounded-[12px] border border-gray-100 bg-gray-50 px-4 py-3'>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500'>Users</p>
              <p className='mt-1 text-[24px] font-black tracking-tight text-gray-900'>{users.length}</p>
            </div>
            <div className='rounded-[12px] border border-gray-100 bg-gray-50 px-4 py-3'>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500'>Admins</p>
              <p className='mt-1 text-[24px] font-black tracking-tight text-gray-900'>{adminsCount}</p>
            </div>
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 gap-8 xl:grid-cols-2'>
        <article className={panelClass}>
          <div className='mb-8 flex items-center gap-4 border-b border-gray-100 pb-6'>
            <div className='flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#001da5]/10 bg-[#001da5]/5 text-[#001da5]'>
              {React.createElement(userIcon, { size: 23 })}
            </div>
            <div>
              <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>My Credentials</h4>
              <p className='text-[12px] text-gray-400'>Update your login email and password</p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6'>
            <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500'>
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
              <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500'>
                New Password
                <input
                  type='password'
                  value={profileForm.password}
                  onChange={(event) =>
                    setProfileForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className={inputClass}
                  placeholder='Minimum 8 characters'
                />
              </label>
              <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500'>
                Confirm Password
                <input
                  type='password'
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
              </label>
            </div>
          </div>

          <div className='mt-8 flex justify-end border-t border-gray-100 pt-6'>
            <button
              type='button'
              onClick={handleProfileUpdate}
              disabled={isProfileSaving}
              className={primaryButtonClass}
            >
              {React.createElement(saveIcon, { size: 16, className: 'mr-2' })}
              {isProfileSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </article>

        <article className={panelClass}>
          <div className='mb-8 flex items-center gap-4 border-b border-gray-100 pb-6'>
            <div className='flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#001da5]/10 bg-[#001da5]/5 text-[#001da5]'>
              {React.createElement(plusCircleIcon, { size: 23 })}
            </div>
            <div>
              <h4 className='text-[18px] font-bold tracking-tight text-gray-900'>Add Team Member</h4>
              <p className='text-[12px] text-gray-400'>Create another dashboard account instantly</p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500 md:col-span-2'>
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
            <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500'>
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
            <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500'>
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
            <label className='ml-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-500 md:col-span-2'>
              Initial Password
              <input
                type='password'
                value={newUserForm.password}
                onChange={(event) =>
                  setNewUserForm((prev) => ({ ...prev, password: event.target.value }))
                }
                className={inputClass}
                placeholder='Minimum 8 characters'
              />
            </label>
          </div>

          <div className='mt-8 flex justify-end border-t border-gray-100 pt-6'>
            <button
              type='button'
              onClick={handleCreateUser}
              disabled={isCreatingUser}
              className={primaryButtonClass}
            >
              {React.createElement(plusIcon, { size: 16, className: 'mr-2' })}
              {isCreatingUser ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </article>
      </div>

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
