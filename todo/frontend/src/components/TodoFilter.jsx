// TodoFilter.js
import React from "react";

const TodoFilter = ({ selectedFilter, handleFilterChange,search}) => {

  const find = () => {
    setCurrentPage(1);
  }
    
  return (
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
          <option value="important">important</option>
          <option className=" hidden" value="textFilter">{search === "" ? "searching" : "result" }</option>        </select>
      </div>
  );
};
export default TodoFilter;
