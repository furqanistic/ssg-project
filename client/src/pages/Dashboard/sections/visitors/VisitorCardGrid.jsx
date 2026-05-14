import React from 'react'
import { InteractiveNavCard } from '@/components/ui/interactive-nav-card'

const VisitorCardGrid = ({ panels, activePanel, onSelectPanel, className = '', compact = false }) => (
  <div className={className || 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5'}>
    {panels.map((panel) => {
      const isActive = activePanel === panel.key

      return (
        <InteractiveNavCard
          key={panel.key}
          onClick={() => onSelectPanel(panel.key)}
          active={isActive}
          compact={compact}
          iconContainerClassName={panel.accent}
          icon={React.createElement(panel.icon, { size: 20 })}
          title={panel.title}
          description={panel.description}
        />
      )
    })}
  </div>
)

export default VisitorCardGrid
