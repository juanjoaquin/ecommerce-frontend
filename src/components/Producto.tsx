import React from 'react'
import { convertDinero } from '../helpers'
import useCommerce from '../hooks/useCommerce'


export const Producto = ({ producto, botonAgregar = false, botonDisponible = false }: any) => {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useCommerce();
    const { nombre, imagen, precio } = producto

    const precioTachado = convertDinero(precio * 1.2);

    return (
        <div className='border border-orange-400 rounded-lg p-3  shadow'>
            <div className='w-full bg-gray-200 rounded-lg '>

                <img src={`/img/${imagen}.jpg`} className='w-50 mx-auto rounded-lg p-1' alt={`imagen ${nombre}`} />
            </div>


            <div className='p-5'>
                <h3 className='text-2xl font-semibold'>{nombre}</h3>
                <div className='flex items-center gap-2'>

                    <p className='mt-5 font-medium text-4xl text-amber-700'>{convertDinero(Number(precio))}</p>
                    <span className='text-gray-400 line-through mt-7 text-sm'>
                        {convertDinero(precio * 1.2)}
                    </span>
                </div>

                {botonAgregar && (


                    <button
                        type='button'
                        className={`uppercase text-white w-full mt-5 p-2 rounded-lg font-semibold transition-colors ${producto.disponible
                            ? 'bg-orange-500 hover:bg-orange-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!producto.disponible}
                        onClick={() => {
                            if (producto.disponible) {
                                handleClickModal();
                                handleSetProducto(producto);
                            }
                        }}
                    >
                        Agregar al pedido
                    </button>

                )}

                {botonDisponible && (
                    <button
                        type='button'
                        className={`uppercase text-white w-full mt-5 p-3 font-semibold cursor-pointer transition-colors 
            ${producto.disponible
                                ? 'bg-red-500 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-800'}`}
                        onClick={() => { handleClickProductoAgotado(producto.id) }}
                    >
                        {producto.disponible ? "Producto Agotado" : "Marcar como Disponible"}
                    </button>
                )}

            </div>

        </div>
    )
}
