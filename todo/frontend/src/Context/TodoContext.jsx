import { createContext, useState,} from "react";


export const todoContext = createContext({
    todo: {},
    setTodo: () => {}
});


export const TodoContextProvider = ({children}) => {
    const [todo, setTodo] = useState({});
    return (
        <todoContext.Provider value={{todo, setTodo}}>
            {children}
        </todoContext.Provider>
    )
}