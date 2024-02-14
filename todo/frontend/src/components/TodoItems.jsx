import React, { useContext, useEffect, useState } from "react";
import { deleteTodo, updateTodo, updateToggle } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todoContext } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Styles for the modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "none", // Remove the border
  },
};

const TodoItems = ({ item }) => {
  // Hooks and context
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { todo, setTodo } = useContext(todoContext);
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  // Function to handle checkbox change
  const handleCheckboxChange = async () => {
    try {
      // Make a request to the server to toggle the Todo
      const response = await updateToggle(item._id);

      // Update the local state
      if (response.statusText === "OK") {
        setIsCompleted(response.data.completed);
      } else {
        toast.error(response.response.data.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error toggling Todo:", error.message);
    }
  };

  // Function to handle todo deletion
  const deleteHandle = async (todoId) => {
    try {
      if (window.confirm("Are you sure?")) {
        const response = await deleteTodo(item._id);
        if (response.statusText === "OK") {
          setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
        } else {
          toast.error(response.response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Functions for managing modal state
  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => {};
  const closeModal = () => setIsOpen(false);




  

  // Function to handle todo update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      completed: isCompleted,
    };

    try {
      const response = await updateTodo(item._id, data);
  
      if (response.statusText === "OK") {
        closeModal();
        setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === item._id ? { ...todo, ...response.data.todo } : todo
        )
      );
      } else {
        toast.error(response.response.data.errors[0].msg, {
          autoClose: 3000,
        });
        // Revert UI if API call fails
      }
    } catch (error) {
      toast.error("Error updating todo:", error);
      // Revert UI if API call fails
    }
  };

  return (
    <>
      {/* Todo Item Row */}
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        {/* Checkbox Column */}
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required=""
              checked={isCompleted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        {/* Title Column */}
        <td className={`px-6 py-4 max-w-[200px] truncate ${isCompleted ? "line-through" : ''}`}>{item.title}</td>
        {/* Description Column */}
        <td className={`px-6 py-4 max-w-[200px] truncate ${isCompleted ? "line-through" : ''}`}>{item.description}</td>
        {/* View Button Column */}
        <td className=" px-4 py-2">
          <button
            onClick={() => navigate(`/view/todo/${item._id}`)}
            className=" bg-blue-500 text-white px-3 rounded p-0.5"
          >
            View
          </button>
        </td>
        {/* Update Button Column */}
        <td className=" px-4 py-2">
          <button onClick={openModal} className=" bg-green-500 text-white p-0.5 px-2 rounded">
            Update
          </button>
        </td>
        {/* Delete Button Column */}
        <td className=" px-4 py-2">
          <button
            onClick={() => deleteHandle(item._id)}
            className=" bg-red-600 text-white px-2 rounded p-0.5"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Actual Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* Modal Content */}
        <div className=" w-screen rounded-lg shadow dark:border sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* Modal Title */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Todo
            </h1>
            
            {/* Form for Updating Todo */}
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                {/* Title Input */}
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label
                  htmlFor="description"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                {/* Description Input */}
                <input
                  type="text"
                  name="description"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Checkbox for Completion Status */}
              <div className="flex items-center h-5 mt-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(!isCompleted)}
                />
                <p className=" text-white ms-2">Completed or not</p>
              </div>

              {/* Buttons for Closing and Updating */}
              <div className=" flex gap-4 mt-5">
                <button
                  type="submit"
                  className="w-full mt-2 text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="w-full mt-2 text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TodoItems;
