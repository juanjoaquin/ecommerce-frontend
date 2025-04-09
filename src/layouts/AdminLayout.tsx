import React from 'react'
import { AdminSidebar } from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const AdminLayout = () => {

    useAuth({middleware: 'admin'});

    return (
        <div className='md:flex'>
            <AdminSidebar />

            <main className='flex-1 h-screen overflow-scroll bg-gray-100'>

                <Outlet />
            </main>

        </div>
    )
}
