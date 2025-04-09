import React from 'react'
import useSWR from 'swr'
import { Producto } from './Producto'
import axios from 'axios';


export const Productos = () => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => axios.get(`${import.meta.env.VITE_API_URL}/productos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(datos => datos.data);

    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {refreshInterval: 1000});

    if(isLoading) return <div><p>Cargando...</p></div>

    console.log(data);

    return (
        <div>
            <h1 className="text-4xl font-black px-3">Productos</h1>
            <p className="text-2xl my-10 px-3">Maneja el stock de los productos desde acá</p>

            <div className="grid p-3 gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
                    {data.productos.map((producto: any) => (
                      <div key={producto.id}>
                        <Producto producto={producto} botonDisponible={true}/>
                      </div>
                    ))}
                  </div>
        </div>
    )
}
