import { BaseTable, type Column } from '../../components/layouts/BaseTable'
import type { ProductionCapacity } from '../../services/productionsApi'

interface Props {
  data: ProductionCapacity[]
  onProduce: (product: ProductionCapacity) => void
  isLoading?: boolean
}

export function ProductionCapacityTable({ data, onProduce, isLoading }: Props) {
  const columns: Column<ProductionCapacity>[] = [
    {
      header: 'Produto',
      accessor: 'productName',
      align: 'left'
    },
    {
      header: 'Máx. Produzível',
      accessor: 'maxProducibleQuantity',
      align: 'right'
    }
  ]

  return (
    <BaseTable
      data={data}
      columns={columns}
      keyExtractor={(item) => item.productId}
      isLoading={isLoading}
      emptyMessage="Nenhum produto disponível para produção."
      actions={(item) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onProduce(item)
          }}
          disabled={item.maxProducibleQuantity === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-1 rounded text-sm font-medium transition-colors"
        >
          Produzir
        </button>
      )}
      actionsHeader="Ação"
    />
  )
}
