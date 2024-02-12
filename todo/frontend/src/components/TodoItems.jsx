import React, { useContext, useEffect, useState } from "react";
import { deleteTodo, updateToggle } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todoContext } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";

const TodoItems = ({ item }) => {
  const navigate = useNavigate();

  const { todo, setTodo } = useContext(todoContext);
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const handleCheckboxChange = async () => {
    try {
      // Make a request to the server to toggle the Todo
      const response = await updateToggle(item._id);
      console.log(response);

      // Update the local state
      if (response.statusText === "OK"){
        setIsCompleted(response.data.completed);
        toast.success(response.data.message, {
          autoClose: 3000,
        });        
      } else {
        toast.error(response.response.data.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error toggling Todo:", error.message);
    }
  };

  const deleteHandle = async () => {
    try {
      if (window.confirm("Are you sure?")) {
        const response = await deleteTodo(item._id);
        if (response.statusText === "OK") {
          toast.success(response.data.message);
          window.location.reload();
        } else {
          toast.error(response.response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <tr className={`${isCompleted ? "bg-red-600" : ''}`}>
      <td className={`border px-4 py-2 ${isCompleted ? "line-through" : ''} ` }>{item.title}</td>
      <td className={`border px-4 py-2 ${isCompleted ? "line-through ": ''} ` }>{item.description}</td>
      <td className={`border px-4 py-2`}>
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            required=""
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          <p className=" ms-2">{isCompleted ? "compeleted" : ""}</p>
        </div>
      </td>
      <td className=" border px-4 py-2">
        <button className=" bg-blue-500 text-white px-2 rounded">View</button>
      </td>
      <td className=" border px-4 py-2">
        <button className=" bg-green-500 text-white px-2 rounded">
          Update
        </button>
      </td>
      <td className=" border px-4 py-2">
        <button
          onClick={deleteHandle}
          className=" bg-red-600 text-white px-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
