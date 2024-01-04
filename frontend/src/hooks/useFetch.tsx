import { useState, useEffect } from 'react';

interface UseFetchProps<T> {
    fetchFunction: () => Promise<T>;
    dependence?: unknown[];
}

export const useFetch = <T,>({
    fetchFunction,
    dependence = [],
}: UseFetchProps<T>) => {
    const [data, setData] = useState<T | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Activo la pantalla de carga
                setLoading(true);

                // Hago fetch de datos y los guardo
                const result = await fetchFunction();
                
                setData(result);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setError(e);
            } finally {
                // Desactivo la pantalla de carga
                setLoading(false);
            }
        };

        fetchData();
    }, dependence);

    return { data, loading, error };
};

