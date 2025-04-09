import axios from 'axios';
import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from './Alerta';
import { useAuth } from '../hooks/useAuth';
import { CircleUserRound, Lock } from 'lucide-react';


export const Login = () => {

    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const [errores, setErrores] = useState<string[]>([])
    const {login} = useAuth({
        middleware: 'guest',
        url: '/'
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datos = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        }

       await login(datos, setErrores)

    }
    return (
        <div className=" bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-orange-600 mb-2">Bienvenido</h1>
              <p className="text-gray-600">Inicia sesión para continuar</p>
            </div>
    
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                {errores.map((error, index) => (
                  <div key={index} className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
                    {error}
                  </div>
                ))}
    
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email 
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CircleUserRound className="h-5 w-5 text-orange-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        placeholder="Ingresá tu email"
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-orange-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        placeholder="Ingresá tu contraseña"
                      />
                    </div>
                  </div>
    
                  <button
                    type="submit"
                    className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02]"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
    
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Si aún no tenes una cuenta,{' '}
                  <Link to="/auth/registro" className="text-orange-500 hover:text-orange-600 font-semibold">
                    Registrate
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}
