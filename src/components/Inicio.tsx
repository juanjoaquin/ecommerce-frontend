import React, { useEffect, useState } from "react";
import axios from "axios";
import { Producto } from "./Producto";
import useCommerce from "../hooks/useCommerce";

interface ProductoType {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  categoria_id: number;
}

export const Inicio = () => {
  const { categoriaActual } = useCommerce();
  const [productos, setProductos] = useState<ProductoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('AUTH_TOKEN');

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/productos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProductos(res.data.productos);
      }
      catch (err) {
        setError("Error al cargar productos");
      } finally {
        setIsLoading(false);
      }
    };

    getProductos();
  }, []);

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  const productosFiltrados = productos.filter(p => p.categoria_id === categoriaActual?.id);

  return (
    <>
      <div className="px-6 mt-4">

        <h1 className="text-4xl font-black px-3">{categoriaActual?.nombre}</h1>
        <p className="text-2xl my-10 px-3">Selecciona tu pedido</p>
      </div>

      <div className="grid p-3 gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {productosFiltrados.map((producto) => (
          <div key={producto.id}>
            <Producto producto={producto} botonAgregar={true} />
          </div>
        ))}
      </div>
    </>
  );
};