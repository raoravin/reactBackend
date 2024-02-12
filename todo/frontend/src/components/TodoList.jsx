import React, { useContext, useEffect } from "react";
import { todoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { getTodos } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function TodoList() {
  const { todo, setTodo } = useContext(todoContext);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getTodos();
        if(response.statusText === "OK") {
            setTodo(response.data.todos);
        }else {
            toast.error(response.response.data.message, {
                autoClose: 3000,
              });
        }
    }
    fetchData();
  },[setTodo]);

  return (
    <table className=" table-auto w-full">
      <thead>
        <tr>
          <th className=" border px-4 py-3">title</th>
          <th className=" border px-4 py-3">Description</th>
          <th className=" border px-4 py-3">Completed</th>
          <th className=" border px-4 py-3">View</th>
          <th className=" border px-4 py-3">Update</th>
          <th className=" border px-4 py-3">Delete</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(todo) && todo.length > 0 ? (
          todo.map((item) => <TodoItems key={item._id} id={item._id} item={item} />)
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No todos found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TodoList;
