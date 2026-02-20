import { Outlet } from 'react-router-dom'
import Navbar from '../layouts/navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
