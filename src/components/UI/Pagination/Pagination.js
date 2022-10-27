import React from 'react';
import {getPagesArray} from "../../../utils/pages";
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {
    /*let pagesArray = getPagesArray(totalPages);*/

    let pagesArray = usePagination(totalPages);


    return (
        <div className={'page__wrapper'}>
            {pagesArray.map(p => (
                <span onClick={() => changePage(p)}
                      className={p === page ? 'page__current page' : 'page'}
                      key={p}>
                        {p}
                    </span>
            ))}
        </div>
    );
};

export default Pagination;