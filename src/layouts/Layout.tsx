import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Resumen } from '../components/Resumen'
import useCommerce from '../hooks/useCommerce'
import { ModalProducto } from '../components/ModalProducto'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement('#root')

export const Layout = () => {
    useAuth({ middleware: 'auth' })
    const { modal } = useCommerce();
    console.log(modal)

    return (
        <>
            <div className='md:flex'>
                <Sidebar />

                <main className='flex-1 h-screen overflow-scroll bg-gray-100'>

                    <Outlet />
                </main>

                <Resumen />
            </div>

            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalProducto />
                </Modal>
            )}

            <ToastContainer />
        </>
    )
}
