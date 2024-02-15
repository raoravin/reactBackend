import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";
import TodoFilter from "./TodoFilter";
import { fetchTodo } from "../utils/todoApi";

function TodoList() {
  const { todo, setTodo } = useContext(todoContext);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(
    () => {
      const savedPage = parseInt(localStorage.getItem("currentPage"), 10);
      return savedPage;
    }
  );
  const todosPerPage = 8;
  const [active, setActive] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetchTodo(todo,setTodo);
  }, [setTodo]);

  useEffect(() => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    const twoWeeksAgo = new Date(currentDate);
    twoWeeksAgo.setDate(currentDate.getDate() - 14);

    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const lastMonthStartDate = new Date(currentDate);
    lastMonthStartDate.setMonth(currentDate.getMonth() - 2); // Assuming 'last month' means the previous month
    const lastMonthEndDate = new Date(currentDate);
    lastMonthEndDate.setMonth(currentDate.getMonth() - 1);

    if (!Array.isArray(todo)) {
      // Handle the case when 'todo' is not an array
      setFilteredTodos([]);
      return;
    }

    const timeFilters = {
      newest: todo,
      "1week": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= oneWeekAgo
      ),
      "2weeks": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= twoWeeksAgo
      ),
      "1month": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= oneMonthAgo
      ),
      lastmonth: todo.filter(
        (todoItem) =>
          new Date(todoItem.createdAt) >= lastMonthStartDate &&
          new Date(todoItem.createdAt) <= lastMonthEndDate
      ),
    };

  
    const filteredTodos = timeFilters[selectedFilter] || [];
    
    setFilteredTodos(filteredTodos);
  
    // After filtering, we want to keep the current page if it's still within the valid range
    if (currentPage > Math.ceil(filteredTodos.length / todosPerPage)) {
      setCurrentPage(1);
    }
  }, [todo, selectedFilter,currentPage,todosPerPage, searchQuery]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1); // Reset current page when changing the filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const visibleTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <>
    <div className=" bg-red-700 w-auto h-[42.5rem] relative  dark:bg-gray-800 dark:border-gray-700 shadow-md sm:rounded-lg">
      <div className=" p-6 dark:bg-gray-800 dark:border-gray-700 ">
        {/* Filters and Search Bar */}
        {/* Include the TodoFilter component */}
        <TodoFilter
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />

        {/* Todo List Table */}
        <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Table Header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=" bg-slate-700">
              {/* Checkbox Column */}
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {/* Title Column */}
              <th scope="col" className="px-6 py-4 w-1/5 text-sm">
                Title
              </th>
              {/* Description Column */}
              <th scope="col" className="px-6 py-4 w-2/5 text-sm">
                Description
              </th>
              {/* View Column */}
              <th scope="col" className="px-6 py-4 text-sm">
                View
              </th>
              {/* Edit Column */}
              <th scope="col" className="px-6 py-4 text-sm">
                Edit
              </th>
              {/* Delete Column */}
              <th scope="col" className="px-6 py-4 text-sm">
                Delete
              </th>
            </tr>
          </thead>
          {/* Table Body */}  
          <tbody >
            {/* Map through todos and render TodoItems component */}
            {Array.isArray(todo) && todo.length > 0 ? (
              visibleTodos.map((item) => (
                <TodoItems key={item._id} id={item._id} item={item} />
              ))
            ) : (
              // Render a message if no todos found
              <tr>
                <td colSpan="6" className="text-center">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>

        
          {/* Load More button */}
          {/* Pagination */}
        </table>

        
      </div>
      <div className=" absolute left-1/2 right-1/2 bottom-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default TodoList;
