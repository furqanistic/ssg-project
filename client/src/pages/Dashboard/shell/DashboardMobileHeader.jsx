// File: client/src/pages/Dashboard/shell/DashboardMobileHeader.jsx
import React from 'react'
import { ICON_MAP, menu } from '@/pages/Dashboard/shell/dashboardConstants'
import { ChevronRight, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'

const DashboardMobileHeader = ({ active, onSwitchSection, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const activeItem = menu.find((item) => item.key === active) ?? menu[0]
  const ActiveIcon = ICON_MAP[activeItem.icon] ?? LayoutDashboard

  const handleSwitchSection = (key) => {
    onSwitchSection(key)
    setIsOpen(false)
  }

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div className='mb-8 lg:hidden'>
      <div className='rounded-[24px] border border-gray-100 bg-white/90 p-4 shadow-[0_18px_55px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
              <LayoutDashboard size={20} strokeWidth={2.5} />
            </div>
            <div className='min-w-0'>
              <h2 className='truncate text-[14px] font-bold tracking-tight text-gray-900'>SSG Admin</h2>
              <p className='text-[10px] font-bold uppercase leading-none tracking-widest text-gray-400'>
                {activeItem.label}
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={() => setIsOpen(true)}
            className='inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[12px] border border-gray-100 bg-gray-50 px-3 text-[12px] font-bold text-gray-700 transition-all hover:border-[#001da5]/25 hover:bg-white hover:text-[#001da5] active:scale-95'
            aria-label='Open dashboard menu'
            aria-expanded={isOpen}
          >
            <Menu size={17} />
            Menu
          </button>
        </div>

        <div className='mt-4 flex items-center gap-2 rounded-[14px] border border-[#001da5]/10 bg-[#001da5]/5 px-3 py-2 text-[#001da5]'>
          <ActiveIcon size={15} />
          <span className='text-[12px] font-black'>{activeItem.label}</span>
          <span className='ml-auto text-[10px] font-bold uppercase tracking-widest text-[#001da5]/55'>
            Current
          </span>
        </div>
      </div>

      {isOpen ? (
        <div className='fixed inset-0 z-50 bg-slate-950/35 p-3 backdrop-blur-sm'>
          <button
            type='button'
            aria-label='Close dashboard menu overlay'
            className='absolute inset-0 h-full w-full cursor-default'
            onClick={() => setIsOpen(false)}
          />
          <aside className='relative ml-auto flex h-full max-h-[calc(100vh-24px)] w-full max-w-[390px] animate-in slide-in-from-right-5 duration-200 flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_28px_90px_-28px_rgba(2,6,23,0.45)]'>
            <div className='border-b border-gray-100 bg-gray-50/80 p-5'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex min-w-0 items-center gap-3'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#001da5] text-white shadow-lg shadow-blue-500/20'>
                    <LayoutDashboard size={20} strokeWidth={2.5} />
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-[15px] font-black tracking-tight text-gray-950'>Dashboard Menu</p>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>Mobile navigation</p>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:text-gray-900 active:scale-95'
                  aria-label='Close dashboard menu'
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <nav className='flex-1 space-y-2 overflow-y-auto p-4'>
              {menu.map((item) => {
                const Icon = ICON_MAP[item.icon]
                const isActive = active === item.key
                return (
                  <button
                    key={`mobile-sheet-${item.key}`}
                    type='button'
                    onClick={() => handleSwitchSection(item.key)}
                    className={`group flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-[#001da5] text-white shadow-lg shadow-blue-500/20'
                        : 'border border-gray-100 bg-white text-gray-600 hover:border-[#001da5]/20 hover:bg-[#001da5]/5 hover:text-[#001da5]'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${
                        isActive ? 'bg-white/15 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-[#001da5]'
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className='text-[14px] font-black'>{item.label}</span>
                    {isActive ? (
                      <span className='ml-auto rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider'>
                        Active
                      </span>
                    ) : (
                      <ChevronRight size={16} className='ml-auto text-gray-300 group-hover:text-[#001da5]' />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className='border-t border-gray-100 p-4'>
              <button
                type='button'
                onClick={handleLogout}
                className='flex w-full items-center justify-center gap-2 rounded-[16px] border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-black text-red-600 transition hover:bg-red-100 active:scale-[0.99]'
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  )
}

export default DashboardMobileHeader
