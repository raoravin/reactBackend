import React from 'react'
import TodoList from '../components/TodoList'

const LoggedInHome = () => {
  return (
    <div className=' w-5/6 m-auto text-center'>
      <h1 className=" my-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"><span className="bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Todo List</span></h1>
      <TodoList />
    </div>
  )
}

export default LoggedInHome