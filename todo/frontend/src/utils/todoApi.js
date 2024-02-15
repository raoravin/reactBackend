import { useContext } from "react";
import { getTodos } from "../api/todo";

export const fetchTodo = async (todo, setTodo ) => {
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
