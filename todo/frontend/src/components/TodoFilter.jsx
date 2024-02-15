// TodoFilter.js
import React from "react";

const TodoFilter = ({ selectedFilter, handleFilterChange }) => {
    
  return (
    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      {/* Filter Dropdown */}
      <div>
        {/* Dropdown menu */}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className=" border-8 border-gray-700 hover:bg-grey-800 dark:hover:bg-grey-700 text-white bg-gray-700 font-medium rounded-lg text-base px-5 py-1 text-center outline-none inline-flex items-center"
        >
          <option value="newest">Newest</option>
          <option value="1week">1 Week</option>
          <option value="2weeks">2 Weeks</option>
          <option value="1month">1 Month</option>
          <option value="lastmonth">Last Month</option>
        </select>
      </div>
      {/* Search bar */}
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
          </svg>
        </div>
        {/* Search Input */}
        <input
          type="text"
          id="table-search"
          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search htmlFor items"
        />
      </div>
    </div>
  );
};

export default TodoFilter;
