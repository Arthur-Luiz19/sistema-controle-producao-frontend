import { useEffect } from 'react'
import { BaseTable, type Column } from '../../components/layouts/BaseTable'
import { useGetProductsQuery, useDeleteProductMutation, type Product } from '../../services/productsApi'

interface Props {
  onEdit: (product: Product) => void
}

export default function ProductsTable({ onEdit }: Props) {
  const { data, isLoading, refetch } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir?')
    if (!confirmed) return
    await deleteProduct(id)
  }

  useEffect(() => {
    refetch()
  }, [])

  const columns: Column<Product>[] = [
    {
      header: 'Nome',
      accessor: 'name',
      align: 'left'
    },
    {
      header: 'Preço',
      accessor: (product) => (typeof product.price === 'number' ? product.price.toFixed(2) : product.price),
      align: 'right'
    },
    {
      header: 'Quantidade',
      accessor: 'quantity',
      align: 'right'
    }
  ]

  return (
    <BaseTable
      data={data ?? []}
      columns={columns}
      keyExtractor={(product) => product.id}
      isLoading={isLoading}
      emptyMessage="Nenhum produto cadastrado."
      actions={(product) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(product)
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(product.id)
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
