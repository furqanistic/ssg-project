// File: client/src/pages/Dashboard/sections/visitors/VisitorPanelHeader.jsx
import React from 'react'

const VisitorPanelHeader = ({ icon: Icon, title, description, action }) => (
  <div className='flex flex-col gap-4 rounded-[22px] border border-gray-100 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between'>
    <div className='flex items-center gap-4'>
      <div className='flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#001da5]/10 bg-[#001da5]/5 text-[#001da5]'>
        {React.createElement(Icon, { size: 20 })}
      </div>
      <div>
        <h4 className='text-[15px] font-bold text-gray-900'>{title}</h4>
        <p className='text-[12px] text-gray-400'>{description}</p>
      </div>
    </div>
    {action}
  </div>
)

export default VisitorPanelHeader
