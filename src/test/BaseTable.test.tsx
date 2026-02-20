import { render, screen } from '@testing-library/react'
import { BaseTable } from '../components/layouts/BaseTable'
import { describe, it, expect } from 'vitest'

interface TestItem {
  id: string
  name: string
  value: number
}

describe('BaseTable', () => {
  const columns = [
    { header: 'Nome', accessor: 'name' as keyof TestItem },
    { header: 'Valor', accessor: 'value' as keyof TestItem }
  ]

  const data: TestItem[] = [
    { id: '1', name: 'Item 1', value: 100 },
    { id: '2', name: 'Item 2', value: 200 }
  ]

  it('renderiza mensagem de carregamento', () => {
    render(
      <BaseTable
        data={[]}
        columns={columns}
        keyExtractor={(item: TestItem) => item.id}
        isLoading={true}
      />
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renderiza mensagem quando vazio', () => {
    render(
      <BaseTable
        data={[]}
        columns={columns}
        keyExtractor={(item: TestItem) => item.id}
        emptyMessage="Nenhum registro"
      />
    )

    expect(screen.getByText('Nenhum registro')).toBeInTheDocument()
  })

  it('renderiza dados corretamente', () => {
    render(<BaseTable data={data} columns={columns} keyExtractor={(item) => item.id} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('renderiza headers das colunas', () => {
    render(<BaseTable data={data} columns={columns} keyExtractor={(item) => item.id} />)

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Valor')).toBeInTheDocument()
  })
})
