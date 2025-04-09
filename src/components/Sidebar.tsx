import React, { useState } from 'react';
import logo from '../../public/img/logo.svg';
import { Categoria } from './Categoria';
import useCommerce from '../hooks/useCommerce';
import { useAuth } from '../hooks/useAuth';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, LogOut, Menu } from 'lucide-react'; // Importa el icono de menú

export const Sidebar = () => {
    const { categorias } = useCommerce();
    const { logout, user } = useAuth({ middleware: 'auth' });
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className='md:w-72 w-full'> {/* El sidebar ocupa todo el ancho en small */}
            <div className='p-4 flex justify-between items-center md:justify-center'>
                <img src={logo} alt="Logo" className='w-40 mx-auto' />

            </div>


            <div className='flex flex-col text-center justify-center mt-4 mb-10 space-y-2'>


                <p className='text-xl font-semibold text-gray-600 text-center'>Hola, {user?.name}</p>
                <span
                    onClick={logout}
                    className='text-center flex items-center mx-auto gap-2 text-red-500 font-bold cursor-pointer truncate hover:text-red-600'
                >
                    Cerrar sesión
                    <LogOut size={18} />
                </span>


            </div>

            <div className='flex justify-end w-full bg-gray-100 md:hidden'>
                <button
                    onClick={toggleMenu}
                    className='py-2 text-gray-600 hover:text-gray-800 focus:outline-none transition-opacity duration-200 ease-in-out px-2'
                >
                    {isOpen === false ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-narrow-wide-icon lucide-arrow-down-narrow-wide"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="M11 4h4" /><path d="M11 8h7" /><path d="M11 12h10" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-wide-narrow-icon lucide-arrow-up-wide-narrow"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h10" /><path d="M11 16h7" /><path d="M11 20h4" /></svg>
                    }
                </button>
            </div>
            
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden 
                ${isOpen ? 'max-h-screen' : 'max-h-0'} 
                md:max-h-screen md:overflow-visible`}
            >
                {categorias.map((categoria) => (
                    <div key={categoria.id}>
                        <Categoria categoria={categoria} />
                    </div>
                ))}
            </div>
        </aside>
    );
}