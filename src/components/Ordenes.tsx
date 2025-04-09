import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCommerce from '../hooks/useCommerce';
import { usePedidos } from '../hooks/usePedidos';
import { Package, User2 } from 'lucide-react';
import { convertDinero } from '../helpers';


interface PedidosProps {
    id: number;
    total: number;
    estado: boolean;
    created_at: string;
    user: {
        id: number;
        name: string;

    },
    productos: [
        {
            nombre: string;
            precio: string;
            imagen: string;
            disponible: number;
            pivot: {
                cantidad: number;
            }
        }
    ]
}


export const Ordenes = () => {
    const [pedidos, setPedidos] = useState<PedidosProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { handleClickCompletarPedido } = useCommerce();



    const token = localStorage.getItem('AUTH_TOKEN');

    const getOrdenes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/pedidos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                withCredentials: true
            });

            setPedidos(response.data.pedidos);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Hubo un error al cargar los pedidos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getOrdenes();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-black px-3">Ordenes</h1>
            <p className="text-2xl my-10 px-3">Acá tendrás las ordenes que han seleccionado los usuarios</p>

            {isLoading && <p className="px-3">Cargando pedidos...</p>}
            {error && <p className="px-3 text-red-600">{error}</p>}

            <div className="grid grid-cols-3 px-4  gap-6">
                {pedidos.length === 0 ? (
                    <p>No hay pedidos pendientes.</p>
                ) : (
                    pedidos.map((pedido) => (
                        <div key={pedido.id} className=" py-4 rounded-lg bg-gray-200 px-4 last-of-type:border-none shadow-lg">
                            <div className='bg-gray-100/70 py-4 px-2 rounded-lg'>

                                <div className='flex justify-between' >
                                    <div className='flex items-center gap-2'>

                                        <Package className='text-amber-700' />
                                        <p className="font-medium text-gray-700"> #{pedido.id}</p>
                                    </div>

                                    <div className='flex items-center gap-2'>

                                        <User2 size={22} className='text-amber-700' />
                                        <p className='capitalize text-gray-700 font-medium'> {pedido.user?.name}</p>
                                    </div>
                                </div>



                                <h3 className="font-bold mt-2 mb-1">Productos:</h3>
                                <div className="px-2">
                                    {pedido.productos.length > 0 ? (
                                        pedido.productos.map((producto, index) => (
                                            <div key={index}>
                                                <div className='flex justify-between items-center space-y-1 '>

                                                    <p className='text-gray-800 font-medium' >{producto.nombre}</p>
                                                    <p className='font-medium text-green-700'> {convertDinero(Number(producto.precio))}</p>
                                                    <span className="ml-2 text-gray-600 text-sm">x {producto.pivot?.cantidad}</span>

                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay productos en este pedido.</p>
                                    )}
                                </div>
                            </div>

                            <div className='text-end mt-4 px-4'>
                                <p className='text-xl font-semibold text-amber-700'>Total {convertDinero(Number(pedido.total))}</p>
                            </div>

                            <input
                                onClick={() => handleClickCompletarPedido(pedido.id)}
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full mt-4 cursor-pointer"
                                value="Confirmar Pedido"
                            />


                        </div>
                    ))

                )}
            </div>
        </div>
    );
};
