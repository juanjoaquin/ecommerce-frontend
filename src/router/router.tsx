import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../layouts/Layout"
import { AuthLayout } from "../layouts/AuthLayout"
import { Inicio } from "../components/Inicio"
import { Login } from "../components/Login"
import { Registro } from "../components/Registro"
import { AdminLayout } from "../layouts/AdminLayout"
import { Ordenes } from "../components/Ordenes"
import { Productos } from "../components/Productos"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/registro',
                element: <Registro/>
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <Ordenes/>
            }, 
            {
                path: '/admin/ordenes',
                element: <Ordenes/>
            }, 
            {
                path: '/admin/productos',
                element: <Productos/>
            }
        ]
    }
])