import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url: string) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });
    return res.data.pedidos;
};

export const usePedidos = () => {
    const { data, error, isLoading, mutate } = useSWR(`${import.meta.env.VITE_API_URL}/admin/pedidos`, fetcher);

    return {
        pedidos: data,
        isLoading,
        error,
        mutate,
    };
};
