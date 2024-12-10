import React from 'react';

interface PaginationProps {
    totalPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPage) onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination">


<span
    className={`page-link-prev p-2 rounded bg-gray-100 hover:bg-gray-200 transition ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`}
    onClick={currentPage > 1 ? handlePrev : undefined}
    role="button"
    aria-disabled={currentPage === 1}
>
    <i className="d-icon-arrow-left"></i> Prev
</span>


{[...Array(totalPage)].map((_, index) => (
    <span
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={`page-link px-3 py-2 rounded transition hover:bg-blue-200 ${currentPage === index + 1 ? 'active bg-blue-500 text-black' : 'bg-gray-100'}`}
        role="button"
        aria-current={currentPage === index + 1 ? 'page' : undefined}
    >
        {index + 1}
    </span>
))}


<span
    className={`page-link-next p-2 rounded bg-gray-100 hover:bg-gray-200 transition ${
        currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`}
    onClick={currentPage < totalPage ? handleNext : undefined}
    role="button"
    aria-disabled={currentPage === totalPage}
>
    Next <i className="d-icon-arrow-right"></i>
</span>

            
        </div>
    );
};

export default Pagination;
