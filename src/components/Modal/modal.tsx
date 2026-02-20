import { type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  showCloseButton?: boolean
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md', showCloseButton = true }: ModalProps) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white w-full ${sizeClasses[size]} rounded-lg shadow-lg overflow-hidden`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          {showCloseButton && (
            <button onClick={onClose} className="bg-red-600 px-2 rounded text-white hover:bg-red-700">
              X
            </button>
          )}
        </div>
        <div className="px-4 overflow-y-auto max-h-[60vh]">{children}</div>

        {footer && <div className="p-4">{footer}</div>}
      </div>
    </div>
  )
}
