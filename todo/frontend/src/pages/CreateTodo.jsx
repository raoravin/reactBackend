import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../api/todo';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTodo = () => {
  // State to manage input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  // console.log(important);

  // Navigation hook for redirecting after form submission
  const navigate = useNavigate();

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Data to be sent to createTodo API
    const data = {
      title,
      description,
      completed,
      important,
    };

    try {
      // Sending a request to createTodo API
      const response = await createTodo(data);

      // Handling the response
      if (response.statusText === "OK") {
        // Display success message
        toast.success(response.data.message, {
          autoClose: 3000,
        });
        // Redirect to the home page
        navigate("/");
      } else {
        // Display error messages
        toast.error(response.response.data.message, {
          autoClose: 3000,
        });
        toast.warn(response.response.data?.errors[0]?.msg, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating todo:", error.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center py-20 px-6 mx-auto">
        <a
          href="#"
          className="py-5 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full mt-0 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Todo
            </h1>
            <form onSubmit={submitHandler}>
              {/* Input for Todo Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Title..."
                  required=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* Input for Todo Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className=' flex gap-2 mt-4'>
                <input 
                className="w-4 mt-1 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                type="checkbox"
                // checked={important}
                onChange={e => setImportant(!important)}
                />
                <p className=' text-white'>Important</p>
              </div>
              {/* Button to Submit Form */}
              <button
                type="submit"
                className="w-full my-7 text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create a todo
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTodo;
