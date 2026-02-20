import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { to: '/products', label: 'Produtos' },
    { to: '/raw-materials', label: 'Matérias-Primas' },
    { to: '/productions', label: 'Produção' }
  ]

  return (
    <nav className="bg-gray-800 text-white px-4 sm:px-6 py-4">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Sistema de Produção</h1>

          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'font-semibold border-b-2 border-white pb-1' : 'hover:text-gray-300 transition')}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-700 rounded transition" aria-label="Toggle menu">
            <span className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2 pb-2">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'bg-gray-700 text-white px-4 py-2 rounded font-semibold border-l-4 border-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition')}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
