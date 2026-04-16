import React from 'react'

const DashboardProfileSection = ({
  User,
  PlusCircle,
  Plus,
  Save,
  DataTable,
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
  primaryButtonClass,
}) => {
  return (
    <div className='mt-10 space-y-8'>
      <div className={panelClass}>
        <div className='flex items-center gap-4 mb-8 pb-6 border-b border-white/5'>
          <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/5 border border-white/10 text-white'>
            <User size={24} />
          </div>
          <div>
            <h3 className='text-[18px] font-bold text-white tracking-tight'>My Profile</h3>
            <p className='text-[12px] text-white/40'>Manage your personal account credentials</p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1 md:col-span-2'>
            Login Email
            <input type='email' value={profileForm.email} readOnly className={`${inputClass} opacity-50 cursor-not-allowed`} placeholder='you@example.com' />
          </label>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            New Password
            <input type='password' value={profileForm.password} onChange={(event) => setProfileForm((prev) => ({ ...prev, password: event.target.value }))} className={inputClass} placeholder='Min 8 characters' />
          </label>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Confirm New Password
            <input type='password' value={profileForm.confirmPassword} onChange={(event) => setProfileForm((prev) => ({ ...prev, confirmPassword: event.target.value }))} className={inputClass} placeholder='Repeat password' />
          </label>
        </div>
        <div className='mt-8 pt-6 border-t border-white/5 flex justify-end'>
          <button type='button' onClick={handleProfileUpdate} disabled={isProfileSaving} className={primaryButtonClass}>
            <Save size={16} className='mr-2' />
            {isProfileSaving ? 'Updating...' : 'Save Profile Changes'}
          </button>
        </div>
      </div>

      <div className={panelClass}>
        <div className='flex items-center gap-4 mb-8 pb-6 border-b border-white/5'>
          <div className='flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/5 border border-white/10 text-white'>
            <PlusCircle size={24} />
          </div>
          <div>
            <h3 className='text-[18px] font-bold text-white tracking-tight'>System Users</h3>
            <p className='text-[12px] text-white/40'>Grant administrative access to others</p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Name
            <input value={newUserForm.name} onChange={(event) => setNewUserForm((prev) => ({ ...prev, name: event.target.value }))} className={inputClass} placeholder='Full Name' />
          </label>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Access Level
            <select value={newUserForm.role} onChange={(event) => setNewUserForm((prev) => ({ ...prev, role: event.target.value }))} className={inputClass}>
              <option value='user' className='bg-[#0a0a0b]'>User</option>
              <option value='admin' className='bg-[#0a0a0b]'>Admin</option>
            </select>
          </label>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Email Address
            <input type='email' value={newUserForm.email} onChange={(event) => setNewUserForm((prev) => ({ ...prev, email: event.target.value }))} className={inputClass} placeholder='email@example.com' />
          </label>
          <label className='text-[13px] font-bold text-white/60 uppercase tracking-widest ml-1'>
            Initial Password
            <input type='password' value={newUserForm.password} onChange={(event) => setNewUserForm((prev) => ({ ...prev, password: event.target.value }))} className={inputClass} placeholder='Min 8 chars' />
          </label>
        </div>
        <div className='mt-8 pt-6 border-t border-white/5 flex justify-end'>
          <button type='button' onClick={handleCreateUser} disabled={isCreatingUser} className={primaryButtonClass}>
            <Plus size={16} className='mr-2' />
            {isCreatingUser ? 'Creating...' : 'Register New User'}
          </button>
        </div>
      </div>

      <div className='mt-8'>
        <DataTable
          title='Current Administrators'
          rows={users}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email Address' },
            {
              key: 'role',
              label: 'Access Role',
              render: (row) => (
                <span className='inline-flex items-center rounded-full bg-[#001da5]/5 px-2.5 py-0.5 text-[11px] font-bold text-[#001da5] border border-[#001da5]/10'>
                  {row.role.toUpperCase()}
                </span>
              ),
            },
          ]}
          emptyMessage={usersLoading ? 'Synchronizing user database...' : 'No other administrators found.'}
          showActions={false}
        />
      </div>
    </div>
  )
}

export default DashboardProfileSection
