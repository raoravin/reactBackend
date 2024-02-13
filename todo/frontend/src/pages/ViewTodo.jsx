import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewTodo = () => {
  const [todo, setTodo] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        // Fetch todo details by ID
        const response = await getTodo(id);

        if (response.status === 200) {
          // Update state with the fetched todo data
          setTodo(response.data.todo);
        } else {
          // Display an error toast if there's an issue with the request
          toast.error(response.response.data.message);
        }
      } catch (error) {
        console.error("Error fetching todo:", error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {todo && (
        <div className="flex m-auto mt-14 flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl dark:border-gray-700 dark:bg-gray-800">
          {/* Todo Image Section */}
          <img
            className="object-cover w-96 rounded-t-lg h-auto md:rounded-none md:rounded-s-lg"
            src="https://cdn.pixabay.com/photo/2024/01/18/12/54/flowers-8516916_1280.jpg"
            alt=""
          />
          {/* Todo Details Section */}
          <div className="w-screen h-full p-4 rounded-lg s sm:p-8 dark:bg-gray-800">
            <div className="relative overflow-x-auto">
              {/* Todo Details Table */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {/* Title Row */}
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <h4 className="border-b-2 mb-1 text-blue-600 border-blue-600 w-8">
                        Title :
                      </h4>
                      <p className="text-slate-400 text-wrap">{todo.title}</p>
                    </th>
                  </tr>
                  {/* Description Row */}
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <h4 className="border-b-2 mb-1 text-blue-600 border-blue-600 w-20">
                        Description :
                      </h4>
                      <p className=" text-wrap text-slate-400">
                        {todo.description}
                      </p>
                    </th>
                  </tr>
                  {/* CreatedAt Row */}
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <h4 className="border-b-2 mb-1 text-blue-600 border-blue-600 w-16">
                        CreatedAt :
                      </h4>
                      <p className="text-slate-400">{todo.createdAt}</p>
                    </th>
                  </tr>
                  {/* UpdateAt Row */}
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <h4 className="border-b-2 mb-1 text-blue-600 border-blue-600 w-16">
                        UpdateAt :
                      </h4>
                      <p className="text-slate-400">{todo.updatedAt}</p>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Button to go back to the home page */}
            <button  onClick={() => navigate("/")}  className=" relative left-5 mt-5 inline-flex p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Back to home
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTodo;
