import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../services/productsApi'
import { productRawMaterialsApi } from '../services/productRawMaterialsApi'
import { rawMaterialsApi } from '../services/rawMaterialsApi'
import { productionsApi } from '../services/productionsApi'

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productRawMaterialsApi.reducerPath]: productRawMaterialsApi.reducer,
    [rawMaterialsApi.reducerPath]: rawMaterialsApi.reducer,
    [productionsApi.reducerPath]: productionsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, productRawMaterialsApi.middleware, rawMaterialsApi.middleware, productionsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
