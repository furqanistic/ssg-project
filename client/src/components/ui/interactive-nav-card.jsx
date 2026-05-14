import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

function InteractiveNavCard({
  title,
  description,
  icon,
  iconContainerClassName,
  active = false,
  compact = false,
  onClick,
  rightSlot,
  className,
  ...props
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        "group cursor-pointer border text-left transition-all duration-300 ease-out",
        compact ? "rounded-[18px] p-4" : "rounded-[24px] p-5",
        active
          ? "border-[#001da5]/35 bg-[#fafdff] ring-2 ring-[#001da5]/10"
          : "border-gray-200 bg-[#fcfdff] hover:border-[#001da5]/25 hover:bg-[#f6faff]",
        className,
      )}
      {...props}
    >
      <div className='mb-4 flex items-center justify-between'>
        <div
          className={cn(
            "flex items-center justify-center border",
            compact ? "h-10 w-10 rounded-[12px]" : "h-11 w-11 rounded-[14px]",
            iconContainerClassName,
          )}
        >
          {icon}
        </div>
        {rightSlot ?? (
          <span
            className={cn(
              "h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-300",
              active ? "bg-[#001da5]" : "bg-gray-200 group-hover:bg-[#001da5]/45",
            )}
          />
        )}
      </div>

      <h3 className='text-[14px] font-black tracking-[-0.02em] text-gray-900'>{title}</h3>
      <p className={cn("mt-1.5 text-[12px] font-medium leading-relaxed text-gray-500", compact && "line-clamp-2")}>
        {description}
      </p>

      <div className='mt-3 flex items-center justify-end'>
        <span className='inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 transition-colors duration-300 group-hover:text-[#001da5]'>
          Open
          <ChevronRight size={12} />
        </span>
      </div>
    </button>
  )
}

export { InteractiveNavCard }
