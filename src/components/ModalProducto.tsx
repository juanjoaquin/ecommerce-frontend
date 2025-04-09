import React, { useState, useEffect } from 'react'
import useCommerce from '../hooks/useCommerce'
import { convertDinero } from '../helpers';


export const ModalProducto = () => {

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useCommerce();
    const [cantidad, setCantidad] = useState<number>(1);
    const [edicicion, setEdicion] = useState(false);

    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto?.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto?.id)[0]

            setCantidad(productoEdicion.cantidad);
            setEdicion(true);
        }
    }, [pedido]);

    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <img src={`/img/${producto.imagen}.jpg`} alt={`Imagen producto ${producto.nombre}`} className='rounded-lg shadow'/>
            </div>

            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <button onClick={handleClickModal} className='cursor-pointer text-red-600 hover:text-red-700'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                </div>

                <h1 className='mt-5 text-3xl font-semibold'>{producto.nombre}</h1>
                <p className='mt-5 font-bold text-5xl text-amber-500'>{convertDinero(Number(producto.precio))}</p>

                <div className='flex gap-4 mt-5'>


                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad <= 1) return;
                            setCantidad(cantidad - 1)
                        }}
                        className='cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>

                    <p className='text-3xl'>{cantidad}</p>

                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad >= 5) return;
                            setCantidad(cantidad + 1)
                        }}
                        className='cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>

                <button
                    type='button'
                    className='bg-orange-500 hover:bg-orange-800 px-5 py-2 mt-5 text-white uppercase rounded-lg font-semibold cursor-pointer'
                    onClick={() => {
                        handleAgregarPedido({ ...producto, cantidad });
                        handleClickModal();
                    }}
                >
                    {edicicion ? 'Guardar Cambios' : 'Añadadir a la orden'}
                </button>
            </div>
        </div>
    )
}
