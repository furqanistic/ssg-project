import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react'

const ToastContext = createContext(null)

const variantStyles = {
  success: {
    accent: 'bg-[#3b82f6]',
    icon: CheckCircle2,
    iconClass: 'text-[#93c5fd]',
  },
  error: {
    accent: 'bg-[#ef4444]',
    icon: AlertCircle,
    iconClass: 'text-[#fca5a5]',
  },
  info: {
    accent: 'bg-[#6366f1]',
    icon: Info,
    iconClass: 'text-[#c4b5fd]',
  },
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback((options) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const toast = {
      id,
      type: options?.type ?? 'info',
      title: options?.title ?? '',
      message: options?.message ?? '',
      duration: typeof options?.duration === 'number' ? options.duration : 4200,
    }

    setToasts((prev) => [...prev, toast].slice(-5))

    window.setTimeout(() => {
      dismiss(id)
    }, toast.duration)

    return id
  }, [dismiss])

  const api = useMemo(() => ({
    push,
    success: (message, title = 'Saved') => push({ type: 'success', title, message }),
    error: (message, title = 'Something went wrong') => push({ type: 'error', title, message }),
    info: (message, title = 'Notice') => push({ type: 'info', title, message }),
    dismiss,
  }), [dismiss, push])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className='pointer-events-none fixed right-5 top-5 z-[200] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-3'>
        {toasts.map((toast) => {
          const styles = variantStyles[toast.type] ?? variantStyles.info
          const Icon = styles.icon

          return (
            <article
              key={toast.id}
              className='pointer-events-auto relative overflow-hidden rounded-[14px] border border-white/10 bg-[#0b1220]/98 p-3.5 text-white shadow-[0_16px_44px_rgba(2,8,23,0.42)] backdrop-blur-md animate-in slide-in-from-right-5 fade-in duration-300'
            >
              <span className={`absolute inset-y-0 left-0 w-1 ${styles.accent}`} />
              <div className='ml-2 flex items-start gap-3'>
                <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5'>
                  <Icon size={16} className={styles.iconClass} />
                </div>
                <div className='min-w-0 flex-1'>
                  {toast.title ? (
                    <p className='text-[12px] font-semibold tracking-[0.02em] text-white/95'>{toast.title}</p>
                  ) : null}
                  {toast.message ? (
                    <p className='mt-0.5 text-[12px] leading-relaxed text-white/75'>{toast.message}</p>
                  ) : null}
                </div>
                <button
                  type='button'
                  onClick={() => dismiss(toast.id)}
                  className='rounded-md p-1 text-white/45 transition hover:bg-white/10 hover:text-white/85'
                  aria-label='Dismiss notification'
                >
                  <X size={14} />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
