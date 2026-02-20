import { type ReactNode } from 'react'

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
  className?: string
  headerClassName?: string
  cellClassName?: string
  align?: 'left' | 'center' | 'right'
}

export interface BaseTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: (item: T) => ReactNode
  actionsHeader?: string
  isLoading?: boolean
  emptyMessage?: string
  keyExtractor: (item: T) => string | number
  onRowClick?: (item: T) => void
  className?: string
}

export function BaseTable<T>({ data, columns, actions, actionsHeader = 'Ações', isLoading = false, emptyMessage = 'Nenhum registro encontrado.', keyExtractor, onRowClick, className = '' }: BaseTableProps<T>) {

  if (isLoading) {
    return (
      <div className="w-full border border-gray-300 rounded-lg p-6 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full border border-gray-300 rounded-lg p-6 text-center text-gray-500">
        <p className="text-lg mb-2">📭</p>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  const renderCellValue = (item: T, column: Column<T>): ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item)
    }
    return item[column.accessor] as ReactNode
  }

  const alignClasses = {
    left: 'text-center',
    center: 'text-center',
    right: 'text-center'
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
        <thead className="bg-green-800 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`p-3 border border-gray-300 font-semibold ${column.headerClassName || ''} ${alignClasses[column.align || 'left']}`}>
                {column.header}
              </th>
            ))}

            {actions && <th className={`p-3 border border-gray-300 font-semibold text-center w-48`}>{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={keyExtractor(item)} className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(item)}>
              {columns.map((column, index) => (
                <td key={index} className={`p-3 border border-gray-300 ${column.cellClassName || ''} ${alignClasses[column.align || 'left']}`}>
                  {renderCellValue(item, column)}
                </td>
              ))}

              {actions && (
                <td className="p-3 border border-gray-300">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">{actions(item)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
