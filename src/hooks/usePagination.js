import React from "react";
import {useMemo} from "react";


export const usePagination = (totalPages) => {
    console.log('Сработал usePagination')

    const pages = useMemo(() => {
        let result = [];
        for (let i=0; i<totalPages; i++) {
            result.push(i + 1)
        }
        return result
    }, [totalPages])
    return pages
}
