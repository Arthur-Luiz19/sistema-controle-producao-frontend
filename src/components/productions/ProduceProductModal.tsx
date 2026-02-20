import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../Modal/modal'
import { useProduceProductMutation } from '../../services/productionsApi'
import type { ProductionCapacity } from '../../services/productionsApi'
import { ModalFooter } from '../layouts/ModalFooter'
import { getErrorMessage } from '../../types/api-error'

interface Props {
  product: ProductionCapacity | null
  isOpen: boolean
  onClose: () => void
}

export function ProduceProductModal({ product, isOpen, onClose }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [produceProduct, { isLoading }] = useProduceProductMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product || quantity <= 0 || quantity > product.maxProducibleQuantity) return

    try {
      await produceProduct({ id: product.productId, quantity }).unwrap()
      onClose()
    } catch (error) {
      const message = getErrorMessage(error)
      alert(`Erro ao produzir: ${message}`)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Produzir: ${product?.productName ?? ''}`} size="sm" footer={<ModalFooter isLoading={isLoading} isDisabled={quantity <= 0} formId="produce-form" onCancel={onClose} submitLabel="Produzir" cancelLabel="Cancelar" submitColor="blue" cancelColor="red" />}>
      <form id="produce-form" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Quantidade a Produzir</label>
          <input type="number" className="w-full border p-2 my-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} max={product?.maxProducibleQuantity} />
          <p className="text-sm text-gray-500 mt-1">Máximo disponível: {product?.maxProducibleQuantity}</p>
        </div>
      </form>
    </Modal>
  )
}
