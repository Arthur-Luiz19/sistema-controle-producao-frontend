import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import RawMaterialsPage from '../pages/RawMaterialsPage'
import ProductionPage from '../pages/ProductionPage'
import MainLayout from '../components/layouts/MainLayout'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/productions" element={<ProductionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
