import { useEffect, useState } from 'react'
import { useGetProductionCapacityQuery } from '../services/productionsApi'
import { ProductionCapacityTable } from '../features/production/ProductionCapacityTable'
import type { ProductionCapacity } from '../services/productionsApi'
import { ProduceProductModal } from '../components/productions/ProduceProductModal'

export default function ProductionPage() {
  const { data, isLoading, error, refetch } = useGetProductionCapacityQuery()
  const [selectedProduct, setSelectedProduct] = useState<ProductionCapacity | null>(null)

  const handleProduce = (product: ProductionCapacity) => {
    setSelectedProduct(product)
  }

  const handleClose = () => {
    setSelectedProduct(null)
  }

  useEffect(() => {
    refetch()
  }, [])

  if (error) return <div className="p-6 text-red-500">Erro ao carregar capacidade de produção.</div>

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-800">Capacidade de Produção</h1>
        </div>

        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <span className="text-blue-500 mt-0.5 flex-shrink-0">ℹ️</span>
          <p>Visualize a quantidade máxima de cada produto que pode ser fabricada com o estoque atual de matérias-primas. Ao clicar em “Produzir”, você define a quantidade desejada e o sistema atualiza automaticamente os estoques.</p>
        </div>
      </div>
      <ProductionCapacityTable data={data ?? []} onProduce={handleProduce} isLoading={isLoading} />

      {selectedProduct && <ProduceProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleClose} />}
    </div>
  )
}
