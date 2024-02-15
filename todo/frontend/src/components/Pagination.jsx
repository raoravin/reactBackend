// Pagination.js
import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  // console.log(currentPage);
    // const [active, setActive] = useState("");
  const renderPaginationButtons = () => {
    const totalButtonsToShow = 3;
    const totalButtons = Math.min(totalPages, totalButtonsToShow);
    const buttons = [];

    if (currentPage > Math.floor(totalButtonsToShow / 2) + 1) {
      buttons.push(
        <button
         key={1} 
         onClick={() => handlePageChange(1)}
         className={`py-2 px-3 mx-1 mt-5 border rounded-md ${
            currentPage === 1
              ? "bg-green-500 text-white"
              : "bg-white text-black"
          }`}
         >
          1
        </button>
      );
      if (currentPage > Math.floor(totalButtonsToShow / 2) + 2) {
        buttons.push(<span className=" text-white mt-6" key="ellipsis-start">...</span>);
      }
    }

    const startIndex = Math.max(1, currentPage - Math.floor(totalButtonsToShow / 2));
    const endIndex = Math.min(totalPages, startIndex + totalButtons - 1);

    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`py-2 px-3 mx-1 mt-5 border rounded-md ${
            currentPage === i ? "bg-green-500 text-white" : "bg-white text-black"
          }`}
        >
          {i}
        </button>
      );
      }

    if (currentPage < totalPages - Math.floor(totalButtonsToShow / 2)) {
      if (currentPage < totalPages - Math.floor(totalButtonsToShow / 2)) {
        buttons.push(<span className=" text-white mt-6" key="ellipsis-end">...</span>);
      }
      buttons.push(
        <button 
        key={totalPages} 
        onClick={() => handlePageChange(totalPages)}
        className={`py-2 px-3 mx-1 mt-5 border rounded-md ${
            currentPage === totalPages
              ? "bg-green-500 text-white"
              : "bg-white text-black"
          }`}

        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className=" flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`{py-2 px-2 mx-1 mt-5 border rounded-md ${currentPage === 1 ? "hidden" :" bg-white"} text-gray-600}`}
        >
          <GrPrevious />
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`{py-2 px-2 mx-1 mt-5 border rounded-md ${currentPage === totalPages ? "hidden" :" bg-white"} text-gray-600}`}

        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
