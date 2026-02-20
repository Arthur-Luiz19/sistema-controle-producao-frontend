import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ApiResponse<T> {
  success: boolean
  timestamp: string
  data: {
    data: T 
    meta?: {
      totalItems: number
      totalPages: number
    }
  }
}


export interface ProductRawMaterial {
  id: string
  product: { id: string; name: string }
  rawMaterial: { id: string; name: string }
  quantityRequired: number
}

export const productRawMaterialsApi = createApi({
  reducerPath: 'productRawMaterialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL
  }),
  tagTypes: ['ProductRawMaterials'],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAssociationsByProduct: builder.query<ProductRawMaterial[], string>({
      query: (productId) => `/product-raw-materials/product/${productId}`,
      transformResponse: (response: ApiResponse<ProductRawMaterial[]>) => {
        return response.data.data
      },
      providesTags: ['ProductRawMaterials']
    }),

    createAssociation: builder.mutation<ProductRawMaterial, { productId: string; rawMaterialId: string; quantityRequired: number }>({
      query: (body) => ({
        url: '/product-raw-materials',
        method: 'POST',
        body
      }),
      invalidatesTags: ['ProductRawMaterials']
    }),

    updateAssociation: builder.mutation<ProductRawMaterial, { id: string; quantityRequired: number }>({
      query: ({ id, quantityRequired }) => ({
        url: `/product-raw-materials/${id}`,
        method: 'PATCH',
        body: { quantityRequired }
      }),
      invalidatesTags: ['ProductRawMaterials']
    }),

    deleteAssociation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product-raw-materials/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ProductRawMaterials']
    })
  })
})

export const { useGetAssociationsByProductQuery, useCreateAssociationMutation, useUpdateAssociationMutation, useDeleteAssociationMutation } = productRawMaterialsApi
