import React, { createContext, useEffect, useState } from "react";
import { categorias as categoriasDB } from '../data/categorias'
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "react-router-dom";

interface Categorias {
    id: number;
    nombre: string;
    icono: string;
    created_at: string;
}

interface Producto {
    id: number;
    nombre: string;
    imagen: string;
    precio: number;
    categoria_id: number;
    cantidad: number;
}

interface CommerceContextType {
    categorias: { icono: string; nombre: string; id: number }[];
    categoriaActual: { icono: string; nombre: string; id: number };
    handleClickCategoria: (id: number) => void;
    handleClickModal: () => void;
    modal: boolean;
    handleSetProducto: (producto: any) => void
    producto: Producto | null;
    pedido: Producto[];
    handleAgregarPedido: (producto: any) => void;
    handleEditarCantidad: (id: number) => void;
    handleDeleteProductoPedido: (id: number) => void;
    total: number;
    handleSubmitNewOrden: (datos: { numero_tarjeta: string; fecha_vencimiento: string; CVV: string; metodo_pago: 'tarjeta_debito' | 'tarjeta_credito';    }) => Promise<void>;
    handleClickCompletarPedido: (id: number) => void
    handleClickProductoAgotado: (id: number) => Promise<void>
}


const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const CommerceProvider = ({ children }: { children: React.ReactNode }) => {

    const [categorias, setCategorias] = useState<Categorias[]>([]);
    // const [categoriaActual, setCategoriaActual] = useState({});
    const [categoriaActual, setCategoriaActual] = useState<{ icono: string; nombre: string; id: number }>({
        icono: '',
        nombre: '',
        id: 0
    });
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [pedido, setPedido] = useState<Producto[]>([]);
    const [total, setTotal] = useState<number>(0);


    const handleClickCategoria = (id: number) => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria);
    }

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = (producto: any) => {
        setProducto(producto);
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }: any) => {
        if (pedido.some(pedidoState => pedidoState.id === producto?.id)) {
            const pedidoActualizado = pedido.map(pedidoState =>
                pedidoState.id === producto?.id
                    ? { ...pedidoState, cantidad: pedidoState.cantidad + producto.cantidad }
                    : pedidoState
            );

            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente')

        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido')
        }
    }

    const handleEditarCantidad = (id: number) => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar);
        setModal(!modal);
    }

    const handleDeleteProductoPedido = (id: number) => {
        const confirmDelete = window.confirm('Estás seguro de eliminar el producto del pedido?')
        if (!confirmDelete) return;

        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado);
        toast.success('Producto eliminado');
    }

    const getCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const response = await axios.get<{ data: Categorias[] }>(import.meta.env.VITE_API_CATEGORIAS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(response.data.data);
            setCategoriaActual(response.data.data[0]);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitNewOrden = async ({
        numero_tarjeta,
        fecha_vencimiento,
        CVV,
        metodo_pago
      }: {
        numero_tarjeta: string;
        fecha_vencimiento: string;
        CVV: string;
        metodo_pago: 'tarjeta_debito' | 'tarjeta_credito';
      }) => {
        const token = localStorage.getItem('AUTH_TOKEN');
      
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/pedidos/hacer-pedido`,
            {
              total,
              productos: pedido.map(producto => ({
                id: producto.id,
                cantidad: producto.cantidad
              })),
              pago: {
                metodo_pago,
                numero_tarjeta,
                fecha_vencimiento,
                CVV
              }
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
      
          toast.success(data.message);
          setTimeout(() => setPedido([]), 1000);
        } catch (error) {
          console.log(error);
        }
      };
      

    // const handleSubmitNewOrden = async () => {
    //     const token = localStorage.getItem('AUTH_TOKEN');

    //     try {
    //         const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/pedidos/hacer-pedido`,
    //             { total, productos: pedido.map(producto => {
    //                 return {
    //                     id: producto.id,
    //                     cantidad: producto.cantidad
    //                 }
    //             }) },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             toast.success(data.message);
    //             setTimeout(() => {
    //                 setPedido([]);
    //             }, 1000);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleClickCompletarPedido = async (id: number) => {
       const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/admin/pedidos/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPedido((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));

            toast.success("Pedido completado");
        } catch(error) {
            console.log(error);
        }
    }

    const handleClickProductoAgotado = async (id: number) => {
        const token = localStorage.getItem('AUTH_TOKEN');
         try {
             await axios.put(`${import.meta.env.VITE_API_URL}/admin/productos/${id}`, {}, {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             });
 
             toast.success("Pedido completado");
         } catch(error) {
             console.log(error);
         }
     }

    useEffect(() => {
        const total = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(total);
        getCategorias()
    }, [pedido]);

    return (
        <CommerceContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleClickModal,
                modal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleDeleteProductoPedido,
                total,
                handleSubmitNewOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}>

            {children}
        </CommerceContext.Provider>
    );
};

export { CommerceProvider };

export default CommerceContext;