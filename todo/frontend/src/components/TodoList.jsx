import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { getTodos } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

function TodoList() {
  // Context to manage todo state
  const { todo, setTodo } = useContext(todoContext);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
        <div className="relative p-6 overflow-x-auto dark:bg-gray-800 dark:border-gray-700 shadow-md sm:rounded-lg">
          {/* Filters and Search Bar */}
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            {/* Filter Dropdown */}
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                {/* Filter Icon */}
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Last 30 days
                {/* Dropdown Icon */}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  f
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdownRadio"
                className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
                style={{
                  position: "absolute",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate3d(522.5px, 3847.5px, 0px)",
                }}
              >
                {/* Filter options */}
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  {/* Filter option 1 */}
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label
                        htmlFor="filter-radio-example-1"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last day
                      </label>
                    </div>
                  </li>
                  {/* Filter option 2 */}
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label
                        htmlFor="filter-radio-example-2"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last 7 days
                      </label>
                    </div>
                  </li>
                  {/* Filter option 3 */}
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label
                        htmlFor="filter-radio-example-3"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last 30 days
                      </label>
                    </div>
                  </li>
                  {/* Filter option 4 */}
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label
                        htmlFor="filter-radio-example-4"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last month
                      </label>
                    </div>
                  </li>
                  {/* Filter option 5 */}
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label
                        htmlFor="filter-radio-example-5"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last year
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
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
                todo.map((item) => (
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
          </table>
        </div>
    </>
  );
}

export default TodoList;
