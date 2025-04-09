import axios from "axios";
import { useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import useSWR from "swr";


export const useAuth = ({ middleware, url }: any) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    );

    const login = async (datos: any, setErrores: any) => {

        try {
            const { data }: any = await axios.post(`${import.meta.env.VITE_API_URL}/login`, datos, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }, withCredentials: true
            });

            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
             mutate();
        } catch (error) {
            const axiosError = error as any;
            setErrores(Object.values(axiosError.response?.data?.errors ?? {}));
        }
    }

    const registro = async (datos: any, setErrores: any) => {
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/registro`, datos, {

                // CORS fixeado 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }, withCredentials: true
            });

            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
             mutate(); 
        } catch (error) {
            const axiosError = error as any;
            setErrores(Object.values(axiosError.response?.data?.errors ?? {}));
        }
    }

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN');
            mutate(undefined);
        } catch (error) {
            throw new Error
        }
    }

    console.log(user)
    console.log(error)

    useEffect(() => {
        if (middleware === 'guest' && url && user !== undefined) {
            navigate(url);
        }
        if (middleware === 'auth' && error) {
            navigate('/auth/login');
        }
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        if(middleware === 'admin' && user && !user.admin) {
            navigate('/');
        }

    }, [user, error]);


    return {
        login,
        registro,
        logout,
        user,
        error
    }

}