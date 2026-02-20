import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../../components/Modal/modal'
import { useCreateRawMaterialMutation, useUpdateRawMaterialMutation, type RawMaterial } from '../../services/rawMaterialsApi'
import { ModalFooter } from '../../components/layouts/ModalFooter'
import { getErrorMessage } from '../../types/api-error'

interface Props {
  material: RawMaterial | null
  isOpen: boolean
  onClose: () => void
}

export default function RawMaterialModal({ material, isOpen, onClose }: Props) {
  const isEditMode = !!material?.id

  const [name, setName] = useState(material?.name ?? '')
  const [quantityAvailable, setQuantityAvailable] = useState(material?.quantityAvailable ?? 0)

  const [createRawMaterial, { isLoading: isCreating }] = useCreateRawMaterialMutation()
  const [updateRawMaterial, { isLoading: isUpdating }] = useUpdateRawMaterialMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || quantityAvailable < 0) return

    try {
      if (isEditMode && material?.id) {
        await updateRawMaterial({ id: material.id, data: { name, quantityAvailable } }).unwrap()
      } else {
        await createRawMaterial({ name, quantityAvailable }).unwrap()
      }
      onClose()
    } catch (error) {
      const message = getErrorMessage(error)
      alert(`Erro ao salvar matéria-prima: ${message}`)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'} size="md" footer={<ModalFooter isLoading={isCreating || isUpdating} formId="rawmaterial-form" onCancel={onClose} submitLabel="Salvar" cancelLabel="Cancelar" submitColor="green" cancelColor="red" />}>
      <form id="rawmaterial-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input type="text" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantidade Disponível</label>
          <input type="number" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={quantityAvailable} onChange={(e) => setQuantityAvailable(Number(e.target.value))} min={0} />
        </div>
      </form>
    </Modal>
  )
}
