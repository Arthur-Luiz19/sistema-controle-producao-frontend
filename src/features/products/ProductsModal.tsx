import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../../components/Modal/modal'
import { ModalFooter } from '../../components/layouts/ModalFooter'
import { ProductAssociations } from './ProductAssociations'
import { useCreateProductMutation, useUpdateProductMutation, type Product } from '../../services/productsApi'
import { getErrorMessage } from '../../types/api-error'

interface Props {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: Props) {
  const isEditMode = !!product?.id

  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product?.price ?? 0)
  const [quantity, setQuantity] = useState(product?.quantity ?? 0)

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || price < 0 || quantity < 0) return

    try {
      if (isEditMode && product?.id) {
        await updateProduct({
          id: product.id,
          data: { name, price, quantity }
        }).unwrap()
      } else {
        await createProduct({ name, price, quantity }).unwrap()
      }
      onClose()
    } catch (error) {
      alert(`Erro ao salvar produto: ${getErrorMessage(error)}`)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Editar Produto' : 'Novo Produto'} size="lg" footer={<ModalFooter isLoading={isCreating || isUpdating} formId="product-form" onCancel={onClose} submitLabel="Salvar" cancelLabel="Cancelar" submitColor="green" cancelColor="red" />}>
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input type="text" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input type="number" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={price} onChange={(e) => setPrice(Number(e.target.value))} onFocus={(e) => e.target.select()} min={0} step="0.01" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <input type="number" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} onFocus={(e) => e.target.select()} min={0} />
        </div>

        {isEditMode && product?.id && <ProductAssociations productId={product.id} />}
      </form>
    </Modal>
  )
}
