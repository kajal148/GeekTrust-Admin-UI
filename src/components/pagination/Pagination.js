import React from 'react';

const Pagination = ({adminsPerPage, totalAdmins, paginate, currentPage, filteredAdmins, searchState}) => {

    const pageNumbers = [];
    let  total = Math.ceil(totalAdmins/adminsPerPage);

    if(searchState){
        total = Math.ceil(filteredAdmins.length/adminsPerPage);
    }else{
        total = Math.ceil(totalAdmins/adminsPerPage);
    }

    if(total <= 0){
        return <React.Fragment></React.Fragment>
    }

    for(let i = 1 ; i <= total; i++){
        pageNumbers.push(i);
    }

    return (
        <nav className='mt-2'>
            <ul className='pagination'>
            <li className={`page-item ${ currentPage > 1 ? "" : "disabled"}`}>
                <a className="page-link" href="!#" tabIndex="-1" onClick={(e) => paginate(currentPage-1)}>Previous</a>
            </li>
                {pageNumbers.map((pageNumber) => {
                    return <li key={pageNumber} className="page-item">
                        <a href='!#' className='page-link' onClick={(e) => paginate(pageNumber)}>
                            {pageNumber}
                        </a>
                    </li>
                })}
            <li className={`page-item ${ currentPage < total ? "" : "disabled"}`}>
                <a className="page-link" href="!#" onClick={(e) => paginate(currentPage+1)}>Next</a>
            </li>
            </ul>
        </nav>
    )
}

export default Pagination;