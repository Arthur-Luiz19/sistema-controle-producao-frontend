import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ProductionCapacity {
  productId: string
  productName: string
  maxProducibleQuantity: number
}

interface ApiResponse<T> {
  success: boolean
  timestamp: string
  data: T
}

export const productionsApi = createApi({
  reducerPath: 'productionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL
  }),
  tagTypes: ['Production', 'RawMaterial', 'Products'],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getProductionCapacity: builder.query<ProductionCapacity[], void>({
      query: () => '/products/capacity',
      transformResponse: (response: ApiResponse<ProductionCapacity[]>) => response.data,
      providesTags: ['Products'],
    }),

    produceProduct: builder.mutation<{ message: string }, { id: string; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/products/${id}/produce`,
        method: 'POST',
        body: { quantity }
      }),
      invalidatesTags: ['Production', 'RawMaterial', 'Products']
    })
  })
})

export const { useGetProductionCapacityQuery, useProduceProductMutation } = productionsApi
