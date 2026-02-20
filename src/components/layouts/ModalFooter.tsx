interface ModalFooterProps {
  isLoading: boolean
  isDisabled?: boolean
  submitLabel?: string
  cancelLabel?: string
  formId?: string
  onCancel?: () => void
  submitColor?: 'green' | 'blue' | 'red'
  cancelColor?: 'gray' | 'red'
}

export function ModalFooter({ isLoading, isDisabled = false, submitLabel = 'Salvar', cancelLabel = 'Cancelar', formId, onCancel, submitColor = 'green', cancelColor = 'gray' }: ModalFooterProps) {

  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700',
    gray: 'bg-gray-400 hover:bg-gray-500'
  }

  return (
    <div className="flex gap-2 py-1">
      <button type="submit" form={formId} disabled={isLoading || isDisabled} className={`${colorClasses[submitColor]} text-white px-4 py-2 rounded disabled:opacity-50 flex-1 transition`}>
        {isLoading ? 'Salvando...' : submitLabel}
      </button>

      <button type="button" onClick={onCancel} className={`${colorClasses[cancelColor]} text-white px-4 py-2 rounded flex-1 transition`}>
        {cancelLabel}
      </button>
    </div>
  )
}
