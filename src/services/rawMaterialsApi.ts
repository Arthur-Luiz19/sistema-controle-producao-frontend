import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface RawMaterial {
  id: string;
  name: string;
  quantityAvailable: number;
  createdAt: string;
  updatedAt: string;
}

interface RawMaterialsResponse {
  success: boolean
  timestamp: string
  data: RawMaterial[]
}

export const rawMaterialsApi = createApi({
  reducerPath: 'rawMaterialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL
  }),
  tagTypes: ['RawMaterials'],
  endpoints: (builder) => ({
    getRawMaterials: builder.query<RawMaterial[], void>({
      query: () => '/raw-materials',
      transformResponse: (response: RawMaterialsResponse) => response.data,
      providesTags: ['RawMaterials']
    }),

    createRawMaterial: builder.mutation<RawMaterial, Partial<RawMaterial>>({
      query: (body) => ({
        url: '/raw-materials',
        method: 'POST',
        body
      }),
      invalidatesTags: ['RawMaterials']
    }),

    updateRawMaterial: builder.mutation<RawMaterial, { id: string; data: Partial<RawMaterial> }>({
      query: ({ id, data }) => ({
        url: `/raw-materials/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['RawMaterials']
    }),

    deleteRawMaterial: builder.mutation<void, string>({
      query: (id) => ({
        url: `/raw-materials/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['RawMaterials']
    })
  })
})

export const { useGetRawMaterialsQuery, useCreateRawMaterialMutation, useUpdateRawMaterialMutation, useDeleteRawMaterialMutation } = rawMaterialsApi
