import React from 'react'
import useCommerce from '../hooks/useCommerce'


export const Categoria = ({categoria}: any ) => {

    const {handleClickCategoria, categoriaActual} = useCommerce();
    const {icono, id, nombre} = categoria


  return (
    <div className={`flex items-center gap-4 border border-gray-200 w-full p-3 hover:bg-amber-400 cursor-pointer ${categoriaActual.id === id ? 'bg-amber-500' : 'bg-white'}`}>
        <div className={`bg-gray-200 rounded-lg py-2 px-2 ${categoriaActual.id === id ? 'border border-amber-500' : ''}`}>
        <img src={`/img/icono_${icono}.svg`} alt="Icono categoria" className='w-10' />

        </div>
        <button type='button' onClick={()=> handleClickCategoria(id)} className='text-lg font-semibold cursor-pointer truncate'>{nombre}</button>

    </div>
  )
}
