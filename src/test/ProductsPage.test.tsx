import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import ProductsPage from '../pages/ProductsPage'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../services/productsApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../services/productsApi')>()
  return {
    ...actual,
    useGetProductsQuery: () => ({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn()
    })
  }
})

describe('ProductsPage', () => {
  it('renderiza título da página', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    )
    expect(screen.getByText('Produtos')).toBeInTheDocument()
  })

  it('renderiza botão Novo Produto', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    )
    expect(screen.getByText('Novo Produto')).toBeInTheDocument()
  })

  it('renderiza descrição informativa', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    )
    expect(screen.getByText(/Gerencie seus produtos/i)).toBeInTheDocument()
  })
})
