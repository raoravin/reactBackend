import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";
import TodoFilter from "./TodoFilter";
import { fetchTodo } from "../utils/todoApi";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function TodoList() {
  const { todo, setTodo } = useContext(todoContext);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = parseInt(localStorage.getItem("currentPage"), 10);
    return savedPage;
  });
  const todosPerPage = 8;
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(true);

  useEffect(() => {
    fetchTodo(todo, setTodo);
  }, [setTodo]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    if (selectedFilter !== "textFilter") {
      setSearch("");
    }
  };

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;

    if (timeDifference < 60 * 1000) {
      // If less than a minute, show seconds
      return `${Math.floor(timeDifference / 1000)}s ago`;
    } else if (timeDifference < 60 * 60 * 1000) {
      // If less than an hour, show minutes
      return `${Math.floor(timeDifference / (60 * 1000))}m ago`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      // If less than a day, show hours
      return `${Math.floor(timeDifference / (60 * 60 * 1000))}h ago`;
    } else {
      // After 24 hours, show the complete date in the format 00/00/00
      const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
      return createdDate.toLocaleDateString(undefined, options);
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
      important: todo.filter((todoItem) => todoItem.important === true),
      textFilter: todo.filter((todoItem) =>
        todoItem.title.toLowerCase().includes(search.toLowerCase())
      ),
    };

    const filteredTodos = timeFilters[selectedFilter] || [];
    // Check if filteredTodos is empty and set a state variable accordingly
    if (filteredTodos.length === 0) {
      setNoTodosFound(true);
    } else {
      setNoTodosFound(false);
    }

    setFilteredTodos(filteredTodos);

    // After filtering, we want to keep the current page if it's still within the valid range
    if (currentPage > Math.ceil(filteredTodos.length / todosPerPage)) {
      setCurrentPage(1);
    }
  }, [todo, selectedFilter, currentPage, todosPerPage, search]);

  // const handleFilterChange = (event) => {
  //   setSelectedFilter(event.target.value);
  //   setCurrentPage(1); // Reset current page when changing the filter
  // };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };
  const [noTodosFound, setNoTodosFound] = useState();

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
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <TodoFilter
              selectedFilter={selectedFilter}
              handleFilterChange={handleFilterChange}
              search={search}
            />

            {/* Search bar */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className=" flex">
              {/* <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
             
            </div> */}
              {/* Search Input */}
              <input
                type="text"
                id="table-search"
                className="block outline-none p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 rounded-e-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search htmlFor items"
                value={search}
                onChange={handleSearchChange}
                onClick={(e) => {
                  setSelectedFilter("textFilter");
                  setSearchIcon(!searchIcon);
                }}
              />
              <button
                className={`{text-black rounded-s-none rounded-lg bg-slate-300 p-3 ${
                  searchIcon ? "hidden" : ""
                } }`}
                disabled={searchIcon ? true : false}
                onClick={(e) => {
                  setSelectedFilter("newest");
                  setSearch("");
                  setSearchIcon(!searchIcon);
                }}
              >
                {searchIcon ? <FaSearch /> : <RxCross2 />}
              </button>
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
                <th></th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {/* Map through todos and render TodoItems component */}

              {/* Map through todos and render TodoItems component */}
              {noTodosFound ? (
                // Render a message based on the selected filter
                <tr>
                  <td colSpan="6" className="text-center mt-2">
                    {selectedFilter === "newest" && "No todo found"}
                    {selectedFilter === "1week" &&
                      "No todos found in the last 1 week"}
                    {selectedFilter === "2weeks" &&
                      "No todos found in the last 2 weeks"}
                    {selectedFilter === "1month" &&
                      "No todos found in the last 1 month"}
                    {selectedFilter === "lastmonth" &&
                      "No todos found in the last month"}
                    {selectedFilter === "important" &&
                      "No todos found in the important"}
                      {selectedFilter === "textFilter" &&
                      "no todo found"}
                    {/* Add more conditions based on your filter categories */}
                  </td>
                </tr>
              ) : Array.isArray(visibleTodos) && visibleTodos.length > 0 ? (
                visibleTodos.map((item) => (
                  <TodoItems
                    key={item._id}
                    id={item._id}
                    item={item}
                    timeSinceCreation={calculateTimeDifference(item.createdAt)}
                  />
                ))
              ) : (
                <tr>
                  <td className=" text-white p-2">loading...</td>
                </tr>
              )}
            </tbody>

            {/* Load More button */}
            {/* Pagination */}
          </table>
        </div>
        <div className=" absolute left-1/2 right-1/2 bottom-6">
          {Array.isArray(visibleTodos) && visibleTodos.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default TodoList;
