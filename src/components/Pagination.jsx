import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Pagination = ({ dataLength, itemsPerPage, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(dataLength / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const siblingCount = 1;
        const startPage = Math.max(1, currentPage - siblingCount);
        const endPage = Math.min(totalPages, currentPage + siblingCount);
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} onClick={() => handleClick(i)} className={`me-2 ${i === currentPage ? "active" : ""}`}>
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };
    return (
        <div>{totalPages > 1 && (
            <ul className="pagination">
                {currentPage > 1 && (
                    <li onClick={() => handleClick(currentPage - 1)} className='me-2'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </li>
                )}
                {renderPageNumbers()}
                {currentPage < totalPages && (
                    <li onClick={() => handleClick(currentPage + 1)} className=''>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </li>
                )}
            </ul>
        )}
        </div>
    );
};

export default Pagination;
