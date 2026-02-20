import { useState } from 'react'
import { useGetRawMaterialsQuery } from '../services/rawMaterialsApi'
import RawMaterialsTable from '../features/rawMaterials/RawMaterialsTable'
import RawMaterialModal from '../features/rawMaterials/RawMaterialModal'
import type { RawMaterial } from '../services/rawMaterialsApi'

export default function RawMaterialsPage() {
  const { isLoading, error } = useGetRawMaterialsQuery()
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null)
  const handleCreate = () =>
    setSelectedMaterial({
      id: '',
      name: '',
      quantityAvailable: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

  const handleEdit = (material: RawMaterial) => setSelectedMaterial(material)
  const handleClose = () => setSelectedMaterial(null)

  if (isLoading) return <div className="p-6">Carregando...</div>
  if (error) return <div className="p-6 text-red-500">Erro ao carregar dados.</div>

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h1 className="text-2xl font-bold text-gray-800">Matérias-Primas</h1>
          <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition w-full sm:w-auto">
            Nova Matéria-Prima
          </button>
        </div>

        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <span className="text-blue-500 mt-0.5 flex-shrink-0">ℹ️</span>
          <p>Gerencie o estoque de matérias-primas necessárias para fabricar seus produtos. Cadastre novos itens, edite quantidades disponíveis e acompanhe o inventory em tempo real.</p>
        </div>
      </div>

      <RawMaterialsTable onEdit={handleEdit} />
      
      {selectedMaterial !== null && <RawMaterialModal key={selectedMaterial?.id ?? 'new'} material={selectedMaterial} isOpen={true} onClose={handleClose} />}
    </div>
  )
}
