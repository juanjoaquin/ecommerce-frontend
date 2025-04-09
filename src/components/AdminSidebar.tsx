import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ClipboardList, LogOut, Package } from 'lucide-react';


export const AdminSidebar = () => {

    const {logout} = useAuth({middleware: 'auth'});

    return (
        <aside className='md:w-72 h-screen bg-white border-r shadow-sm flex flex-col justify-between'>
    
          {/* Logo */}
          <div className='p-6 flex justify-center'>
            <img src='/img/logo.svg' alt='imagen logotipo' className='w-40' />
          </div>
    
          {/* Navegación */}
          <nav className='flex flex-col gap-3 px-6'>
            <Link
              to='/admin/ordenes'
              className='flex items-center gap-3 text-gray-700 font-medium hover:text-orange-600 transition-colors'
            >
              <ClipboardList size={20} />
              Órdenes
            </Link>
    
            <Link
              to='/admin/productos'
              className='flex items-center gap-3 text-gray-700 font-medium hover:text-orange-600 transition-colors'
            >
              <Package size={20} />
              Productos
            </Link>
          </nav>
    
          {/* Botón cerrar sesión */}
          <div className='p-6'>
            <button
              onClick={logout}
              className='flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 cursor-pointer w-full px-4 py-2 rounded text-white font-bold transition-all'
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </aside>
      )
}
