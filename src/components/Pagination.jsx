import React, { useState } from 'react';

const Pagination = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} onClick={() => handleClick(i)}>
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            {/* <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
            <ul className="pagination">
                {renderPageNumbers()}
            </ul>
        </div>
    );
};

export default Pagination;
