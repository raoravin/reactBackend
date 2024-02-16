import axios from "axios";

const config = {
    withCredentials: true
};


export const getTodos = async () => {
    try {
        const res = await axios.get("https://react-backend-pink.vercel.app/api/todos",config);
        return res;
    } catch (error) {
        return error;
    }
}


export const createTodo = async (todo) => {
    try {
        const res = await axios.post("https://react-backend-pink.vercel.app/api/todos/create", todo, config);
        return res;
    } catch (error) {
        return error;
    }
}



export const getTodo = async (id) => {
    try {
        const res = await axios.get(`https://react-backend-pink.vercel.app/api/todos/${id}`,config);
        return res;
    } catch (error) {
        return error;
    }
}


export const updateTodo = async(id, todo) => {
    try {
        const res = await axios.put(`https://react-backend-pink.vercel.app/api/todos/update/${id}`,todo,config);
        return res;
    } catch (error) {
        return error;
    }
}

export const updateToggle = async(id, todo) => {
    try {
        const res = await axios.put(`https://react-backend-pink.vercel.app/api/todos/update/toggle/${id}`,todo,config);
        return res;
    } catch (error) {
        return error;
    }
}



export const deleteTodo = async(id) => {
    try {
        const res = await axios.delete(`https://react-backend-pink.vercel.app/api/todos/delete/${id}`,config);
        return res;
    } catch (error) {
        return error;
    }
}
