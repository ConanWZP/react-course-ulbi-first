import {FC, useState} from "react";


interface UseFetchingProps {
    callback: (...args: any) => void;
}


export const useFetching:FC<UseFetchingProps> = (callback) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}