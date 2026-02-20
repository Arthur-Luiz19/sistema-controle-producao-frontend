import { useEffect } from 'react'
import { BaseTable, type Column } from '../../components/layouts/BaseTable'
import { useDeleteRawMaterialMutation, useGetRawMaterialsQuery, type RawMaterial } from '../../services/rawMaterialsApi'

interface Props {
  onEdit: (material: RawMaterial) => void
}

export default function RawMaterialsTable({ onEdit }: Props) {
  const { data, refetch} = useGetRawMaterialsQuery()
  const [deleteRawMaterial] = useDeleteRawMaterialMutation()

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir?')) return
    await deleteRawMaterial(id)
  }

  useEffect(() => {
    refetch()
  }, [])

  const columns: Column<RawMaterial>[] = [
    {
      header: 'Nome',
      accessor: 'name',
      align: 'left'
    },
    {
      header: 'Quantidade',
      accessor: 'quantityAvailable',
      align: 'right'
    }
  ]

  return (
    <BaseTable
      data={data ?? []}
      columns={columns}
      keyExtractor={(material) => material.id}
      emptyMessage="Nenhuma matéria-prima cadastrada."
      actions={(material) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(material)
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(material.id)
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Excluir
          </button>
        </>
      )}
    />
  )
}
