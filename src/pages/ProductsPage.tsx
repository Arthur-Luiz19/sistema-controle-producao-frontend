import { useState } from 'react'
import ProductsTable from '../features/products/ProductsTable'
import ProductModal from '../features/products/ProductsModal'
import type { Product } from '../services/productsApi'

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsOpen(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }


  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto">
            Novo Produto
          </button>
        </div>

        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <span className="text-blue-500 mt-0.5">ℹ️</span>
          <p>Gerencie seus produtos: cadastre, edite e associe matérias-primas para produção.</p>
        </div>
      </div>

      <ProductsTable onEdit={handleEdit} />

      {isOpen && <ProductModal product={selectedProduct} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  )
}
