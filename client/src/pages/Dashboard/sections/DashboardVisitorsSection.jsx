// File: client/src/pages/Dashboard/sections/DashboardVisitorsSection.jsx
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { BookOpen, Clock, HelpCircle, MapPin, ShieldCheck } from 'lucide-react'
import VisitorCardGrid from './visitors/VisitorCardGrid'
import VisitorFaqEditor from './visitors/VisitorFaqEditor'
import VisitorGuideEditor from './visitors/VisitorGuideEditor'
import VisitorLocationEditor from './visitors/VisitorLocationEditor'
import VisitorRulesEditor from './visitors/VisitorRulesEditor'
import VisitorTimingsEditor from './visitors/VisitorTimingsEditor'

const visitorPanels = [
  {
    key: 'guide',
    title: 'Visitor Guide',
    description: 'Edit the intro title and body shown in the visitor guide section.',
    icon: BookOpen,
    accent: 'text-sky-600 bg-sky-50 border-sky-100',
  },
  {
    key: 'rules',
    title: 'Rules & Etiquette',
    description: 'Define social and religious conduct for visitors.',
    icon: ShieldCheck,
    accent: 'text-[#001da5] bg-[#001da5]/5 border-[#001da5]/10',
  },
  {
    key: 'timings',
    title: 'Opening Timings',
    description: 'Manage daily darshan, langar, and Sunday program details.',
    icon: Clock,
    accent: 'text-orange-500 bg-orange-50 border-orange-100',
  },
  {
    key: 'location',
    title: 'Location',
    description: 'Manage address lines and public transport instructions.',
    icon: MapPin,
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    key: 'faq',
    title: 'FAQ',
    description: 'Add questions and answers displayed on the public visitor page.',
    icon: HelpCircle,
    accent: 'text-violet-600 bg-violet-50 border-violet-100',
  },
]

const DashboardVisitorsSection = (props) => {
  const [activePanel, setActivePanel] = React.useState(null)
  const activePanelConfig = visitorPanels.find((panel) => panel.key === activePanel) ?? null

  if (!props.DataTable) {
    return null
  }

  const renderActiveEditor = () => {
    if (activePanel === 'guide') {
      return <VisitorGuideEditor panel={activePanelConfig} {...props} />
    }

    if (activePanel === 'rules') {
      return <VisitorRulesEditor panel={activePanelConfig} {...props} />
    }

    if (activePanel === 'timings') {
      return <VisitorTimingsEditor panel={activePanelConfig} {...props} />
    }

    if (activePanel === 'location') {
      return <VisitorLocationEditor panel={activePanelConfig} {...props} />
    }

    return <VisitorFaqEditor panel={activePanelConfig} {...props} />
  }

  return (
    <div className='mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      {!activePanel ? (
        <div>
          <div className='mb-4'>
            <h3 className='text-[16px] font-black tracking-[-0.02em] text-gray-900'>Visitors Sections</h3>
            <p className='mt-1 text-[13px] text-gray-500'>Select a section to open it as a separate editor page.</p>
          </div>
          <VisitorCardGrid
            panels={visitorPanels}
            activePanel={activePanel}
            onSelectPanel={setActivePanel}
            className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'
          />
        </div>
      ) : (
        <div className='rounded-[30px] border border-gray-100 bg-white p-5 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-7'>
          <button
            type='button'
            onClick={() => setActivePanel(null)}
            className='mb-5 inline-flex items-center gap-2.5 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-2 text-[12px] font-bold text-gray-700 transition-all duration-200 hover:border-[#001da5]/35 hover:bg-white hover:text-[#001da5] active:scale-[0.98]'
          >
            <ArrowLeft size={14} />
            Back To Sections
          </button>
          {renderActiveEditor()}
        </div>
      )}
    </div>
  )
}

export default DashboardVisitorsSection
