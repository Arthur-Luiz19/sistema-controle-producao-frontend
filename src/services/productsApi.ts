import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

interface ProductsResponse {
  success: boolean
  timestamp: string
  data: {
    items: Product[]
    meta: {
      totalItems: number
      totalPages: number
      currentPage: number
    }
  }
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL
  }),
  tagTypes: ['Products'],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (response: ProductsResponse) =>
        response.data.items.map((item) => ({
          ...item,
          price: Number(item.price)
        })),
      providesTags: ['Products']
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Products']
    }),

    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Products']
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi
