import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};


export const getTodos = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/todos",config);
        return res;
    } catch (error) {
        return error;
    }
}


export const createTodo = async (todo) => {
    try {
        const res = await axios.post("http://localhost:3000/api/todos/create", todo, config);
        return res;
    } catch (error) {
        return error;
    }
}



export const getTodo = async () => {
    try {
        const res = await axios.get(`/api/todos/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}


export const updateTodo = async(id, todo) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/todos/update/${id}`,todo,config);
        return res;
    } catch (error) {
        return error;
    }
}

export const updateToggle = async(id, todo) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/todos/update/toggle/${id}`,todo,config);
        return res;
    } catch (error) {
        return error;
    }
}



export const deleteTodo = async(id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/api/todos/delete/${id}`,config);
        return res;
    } catch (error) {
        return error;
    }
}