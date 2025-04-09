import React, { useState } from 'react'
import useCommerce from '../hooks/useCommerce'
import { ResumenProducto } from './ResumenProducto';
import { convertDinero } from '../helpers';
import { toast } from 'react-toastify';

export const Resumen = () => {
  const { pedido, total, handleSubmitNewOrden } = useCommerce();

  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [metodoPago, setMetodoPago] = useState<'tarjeta_debito' | 'tarjeta_credito'>('tarjeta_debito');
  const [CVV, setCVV] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);



  const deshabilitarButton = () => pedido.length === 0 || isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(numeroTarjeta)) {
      toast.error('El número de tarjeta debe tener 16 dígitos');
      return;
    }

    if (!/^\d{3}$/.test(CVV)) {
      toast.error('El CVV debe tener 3 dígitos');
      return;
    }

    const today = new Date();
    const expirationDate = new Date(fechaVencimiento);
    if (expirationDate <= today) {
      toast.error('La fecha de vencimiento debe ser posterior a hoy');
      return;
    }

    setIsSubmitting(true);

    try {
      await handleSubmitNewOrden({
        numero_tarjeta: numeroTarjeta,
        fecha_vencimiento: fechaVencimiento,
        CVV: CVV,
        metodo_pago: metodoPago
      });

      setNumeroTarjeta('');
      setFechaVencimiento('');
      setCVV('');
      setMetodoPago('tarjeta_debito');

    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((error: any) => {
          toast.error(error[0]);
        });
      } else {
        toast.error('Hubo un error al procesar el pago');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className='md:w-72 sm:w-full h-screen overflow-y-scroll p-5'>


      <h1 className='text-2xl font-semibold'>Mi pedido </h1>
      <p className='text-lg my-5'>
        Acá tendrás la información de tu pedido
      </p>


      <div className='py-10'>
        {pedido.length > 0 ? (
          <>
            {pedido.map((producto) => (
              <div key={producto.id}>
                <ResumenProducto producto={producto} />
              </div>
            ))}
          </>
        ) : (
          <p className='text-gray-600 text-sm'>
            Aún no contas con pedido
          </p>
        )}
      </div>

      <div className='bg-gray-100 rounded-lg shadow-sm border-2 border-dashed border-orange-500'>
        <p className='text-2xl font-bold text-orange-800 p-10'>Total: {''} {convertDinero(total)}</p>
      </div>

      {pedido.length > 0 && (
        <div className='bg-orange-100/40 rounded-lg '>


          <form className='w-full mt-4 py-2 px-1' onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label className='block text-sm font-semibold mb-2 text-amber-900'>Número de Tarjeta</label>
              <input
                type='text'
                value={numeroTarjeta}
                maxLength={16}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '');
                  setNumeroTarjeta(value);
                }}
                className='w-full border border-amber-900 rounded p-1'
                required
              />
            </div>

            <div className='mb-2'>
              <label className='block text-sm font-semibold mb-2 text-amber-900'>Método de Pago</label>
              <select
                value={metodoPago}
                onChange={e => setMetodoPago(e.target.value as 'tarjeta_debito' | 'tarjeta_credito')}
                className='w-full border rounded p-1 border-amber-900'
                required
              >
                <option value='tarjeta_debito'>Tarjeta de Débito</option>
                <option value='tarjeta_credito'>Tarjeta de Crédito</option>
              </select>
            </div>

            <div className='mb-2'>
              <label className='block text-sm font-semibold mb-2 text-amber-900'>Fecha de Vencimiento</label>
              <input
                type='date'
                value={fechaVencimiento}
                onChange={e => setFechaVencimiento(e.target.value)}
                className='w-full border rounded p-1 border-amber-900'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2 text-amber-900'>CVV</label>
              <input
                type='text'
                maxLength={3}
                value={CVV}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCVV(value);
                }}
                className='w-full border rounded p-1 border-amber-900'
                required
              />
            </div>

            <div className='mt-5'>
              <button
                disabled={deshabilitarButton()}
                type="submit"
                className={`${deshabilitarButton() ? 'bg-gray-700 px-5 py-2 rounded uppercase font-semibold text-gray-400 cursor-not-allowed text-center w-full' : 'bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'}`}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
};
