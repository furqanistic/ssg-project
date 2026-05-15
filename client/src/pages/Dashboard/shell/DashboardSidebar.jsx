// File: client/src/pages/Dashboard/shell/DashboardSidebar.jsx
import React from 'react'
import { ICON_MAP, menu } from '@/pages/Dashboard/shell/dashboardConstants'
import { ChevronRight, LogOut, LayoutDashboard, User } from 'lucide-react'

const DashboardSidebar = ({ active, onSwitchSection, currentUserEmail, onLogout }) => (
  <aside className='sticky top-0 hidden h-screen w-[280px] shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-8 lg:flex lg:flex-col lg:self-start'>
    <div className='mb-10 flex items-center gap-3 px-2'>
      <img
        src='/logo.png'
        alt='SSG Logo'
        className='h-10 w-10 object-contain'
      />
      <div>
        <h2 className='text-[15px] font-bold tracking-tight text-gray-900'>SSG Admin</h2>
        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Control Center</p>
      </div>
    </div>

    <div className='mb-8 px-2'>
      <p className='text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1'>
        Management
      </p>
      <nav className='space-y-1.5'>
        {menu.map((item) => {
          const Icon = ICON_MAP[item.icon]
          return (
            <button
              key={item.key}
              type='button'
              onClick={() => onSwitchSection(item.key)}
              className={`group flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[14px] font-bold transition-all duration-300 ${
                active === item.key
                  ? 'bg-[#001da5] text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#001da5]'
              }`}
            >
              <Icon size={18} className={`${active === item.key ? 'text-white' : 'text-gray-400 group-hover:text-[#001da5]'} transition-colors`} />
              {item.label}
              {active === item.key && <ChevronRight size={14} className='ml-auto' />}
            </button>
          )
        })}
      </nav>
    </div>

    <div className='mt-auto pt-8 border-t border-gray-100 px-2'>
      <div className='mb-6 flex items-center gap-3 px-1'>
        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 border border-gray-100'>
          <User size={16} className='text-gray-400' />
        </div>
        <div className='flex-1 overflow-hidden'>
          <p className='text-[13px] font-bold text-gray-900 truncate'>{currentUserEmail ? currentUserEmail.split('@')[0] : 'Admin'}</p>
          <p className='text-[11px] text-gray-400 truncate'>{currentUserEmail || 'admin@example.com'}</p>
        </div>
      </div>

      <button
        type='button'
        onClick={onLogout}
        className='flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[14px] font-bold text-red-500/70 transition-all hover:bg-red-50 hover:text-red-600'
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  </aside>
)

export default DashboardSidebar
