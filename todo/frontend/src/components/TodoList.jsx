import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { getTodos } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
  // Context to manage todo state
  const { todo, setTodo } = useContext(todoContext);
  // const [loading, setLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 8;
  const [active, setActive] = useState("");

  useEffect(() => {
    fetchData();
  }, [setTodo]);

  const fetchData = async () => {
    try {
      const response = await getTodos();

      // Update state with fetched todos if successful, else show an error toast
      if (response.statusText === "OK") {
        setTodo(response.data.todos.reverse());
      } else {
        toast.error(response.response.data.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

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

    // const filteredTodos = timeFilters[selectedFilter] || [];
    // setFilteredTodos(filteredTodos.slice(0, currentPage * todosPerPage));
    const filteredTodos = timeFilters[selectedFilter] || [];
    setFilteredTodos(filteredTodos);
    setCurrentPage(1); // Reset current page when changing the filter
  }, [todo, selectedFilter]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1); // Reset current page when changing the filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const visibleTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <>
      <div className="relative p-6 overflow-x-auto dark:bg-gray-800 dark:border-gray-700 shadow-md sm:rounded-lg">
        {/* Filters and Search Bar */}
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

          <tbody>
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
        <div>
          {/* {Array.from({ length: totalPages }).map((_, index) => (
          <button className={` bg-slate-50 text-black px-4 ${active} py-2`} key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))} */}
          <div>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={` py-2 px-3 mx-1 mt-5 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
