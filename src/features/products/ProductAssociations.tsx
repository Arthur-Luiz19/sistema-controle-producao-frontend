import { useState } from 'react'
import {
  useGetAssociationsByProductQuery,
  useCreateAssociationMutation,
  useDeleteAssociationMutation,
  useUpdateAssociationMutation
} from '../../services/productRawMaterialsApi'
import { useGetRawMaterialsQuery } from '../../services/rawMaterialsApi'
import { getErrorMessage } from '../../types/api-error'

interface ProductAssociation {
  id: string
  rawMaterial: { id: string; name: string }
  quantityRequired: number
}

interface RawMaterial {
  id: string
  name: string
  quantityAvailable: number
}

interface Props {
  productId: string
}

export function ProductAssociations({ productId }: Props) {
  const [selectedRawMaterial, setSelectedRawMaterial] = useState('')
  const [quantityRequired, setQuantityRequired] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedQuantity, setEditedQuantity] = useState(0)

  const { data: associations, isLoading: loadingAssociations } =
    useGetAssociationsByProductQuery(productId)

  const { data: rawMaterials } = useGetRawMaterialsQuery()

  const [createAssociation, { isLoading: creating }] =
    useCreateAssociationMutation()
  const [deleteAssociation, { isLoading: deleting }] =
    useDeleteAssociationMutation()
  const [updateAssociation, { isLoading: updating }] =
    useUpdateAssociationMutation()

  const handleAddAssociation = async () => {
    if (!selectedRawMaterial || quantityRequired <= 0) return
    try {
      await createAssociation({
        productId,
        rawMaterialId: selectedRawMaterial,
        quantityRequired
      }).unwrap()
      setSelectedRawMaterial('')
      setQuantityRequired(0)
    } catch (error) {
      alert(`Erro ao associar matéria-prima: ${getErrorMessage(error)}`)
    }
  }

  const handleDeleteAssociation = async (id: string) => {
    if (!window.confirm('Remover associação?')) return
    await deleteAssociation(id)
  }

  const handleUpdateAssociation = async (id: string, quantity: number) => {
    try {
      await updateAssociation({ id, quantityRequired: quantity }).unwrap()
      setEditingId(null)
    } catch (error) {
      alert(`Erro ao atualizar: ${getErrorMessage(error)}`)
    }
  }

  const availableRawMaterials =
    rawMaterials?.filter(
      (rm: RawMaterial) =>
        !associations?.some(
          (a: ProductAssociation) => a.rawMaterial.id === rm.id
        )
    ) ?? []

  return (
    <div className="my-5">
      <h3 className="text-lg font-semibold mb-3">Matérias-primas associadas</h3>

      {loadingAssociations ? (
        <p className="text-gray-500">Carregando associações...</p>
      ) : (
        <>
          {associations?.length === 0 && (
            <p className="text-gray-500 mb-4">
              Nenhuma matéria-prima associada.
            </p>
          )}

          {associations?.map((assoc: ProductAssociation) => (
            <div
              key={assoc.id}
              className="flex justify-between items-center border p-2 mb-2 rounded"
            >
              {editingId === assoc.id ? (
                <>
                  <input
                    type="number"
                    className="border p-1 w-24"
                    value={editedQuantity}
                    onChange={(e) => setEditedQuantity(Number(e.target.value))}
                    min={1}
                  />
                  {editedQuantity <= 0 ? (
                    <span className="text-red-600 text-sm">Quantidade deve ser maior que 0</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateAssociation(assoc.id, editedQuantity)
                      }
                      disabled={updating}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 disabled:opacity-50 rounded"
                    >
                      {updating ? 'Salvando...' : 'Salvar'}
                    </button>
                  )}
                </>
              ) : (
                <>
                  <span>
                    {assoc.rawMaterial.name} — {assoc.quantityRequired}
                  </span>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(assoc.id)
                        setEditedQuantity(assoc.quantityRequired)
                      }}
                      disabled={deleting || updating}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 disabled:opacity-50 rounded"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAssociation(assoc.id)}
                      disabled={deleting}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 disabled:opacity-50 rounded"
                    >
                      {deleting ? 'Removendo...' : 'Remover'}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="mt-4">
            <h4 className="font-medium mb-2">Adicionar matéria-prima</h4>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Matéria-prima
                </label>
                <select
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedRawMaterial}
                  onChange={(e) => setSelectedRawMaterial(e.target.value)}
                  disabled={creating}
                >
                  <option value="">Selecione</option>
                  {availableRawMaterials.map((rm: RawMaterial) => (
                    <option key={rm.id} value={rm.id}>
                      {rm.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  className="border p-2 rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={quantityRequired}
                  onChange={(e) => setQuantityRequired(Number(e.target.value))}
                  min={0}
                  disabled={creating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-transparent">
                  .
                </label>
                <button
                  type="button"
                  onClick={handleAddAssociation}
                  disabled={
                    !selectedRawMaterial || quantityRequired <= 0 || creating
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  {creating ? 'Adicionando...' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}