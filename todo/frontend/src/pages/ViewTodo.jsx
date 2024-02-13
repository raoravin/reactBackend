import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodo } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewTodo = () => {
  const [todo, setTodo] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodo(id);
      if (response.status === 200) {
        setTodo(response.data.todo);
      } else {
        toast.error(response.response.data.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {todo && (
        // <div>
        //     <h1 className=' text-3xl mt-4 font-bold'>Title: {todo.title}</h1>
        //     <h2 className=' mt-3 text-2xl'>Completed: {todo.completed ? "Completed" : "Not Completed"}</h2>
        //     <p className=' mt-3'>Description: {todo.description}</p>
        //     <p className=' mt-3'>Created: {todo.createdAt}</p>
        //     <p className=' mt-3'>Created: {todo.updatedAt}</p>
        // </div>

        <div
          href="#"
          class="flex m-auto mt-14 flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl dark:border-gray-700 dark:bg-gray-800 "
        >
          <img
            class="object-cover w-96 rounded-t-lg h-auto  md:rounded-none md:rounded-s-lg"
            src="https://cdn.pixabay.com/photo/2024/01/18/12/54/flowers-8516916_1280.jpg"
            alt=""
          />
          <div class=" w-screen h-full p-4  rounded-lg s sm:p-8 dark:bg-gray-800 ">
            fj
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTodo;
