import React from 'react'

export const Alerta = ({ children }: any) => {
    return (
        <div className='text-center my-2 bg-red-600 text-white font-semibold p-3 uppercase'>
            {children}
        </div>
    )
}
