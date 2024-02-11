import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};



export const register = async (user) => {
    try {
        const res = await axios.post("http://localhost:3000/api/users/register", user,config)
        return res
    } catch (error) {
        return error
    }
}


export const login = async (user) => {
    try {
        const res = await axios.post("http://localhost:3000/api/users/login", user,config)
        return res
    } catch (error) {
        return error
    }
}


export const logout = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/users/logout",config)
        return res;
    } catch (error) {
        return error;
    }
}


export const getUser= async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/users/me",config)
        return res;
    } catch (error) {
        return error;
    }
}




export const updateUser = async (user) => {
    try {
        const res = await axios.put("http://localhost:3000/api/users/updatedetails", user,config)
        return res;
    } catch (error) {
        return error;
    }
}



export const updatePassword = async (data) => {
    try {
        const res = await axios.put("http://localhost:3000/api/users/updatePassword", data,config)
        return res;
    } catch (error) {
        return error;
    }
}

export const delteUser = async () => {
    try {
        const res = await axios.delete("http://localhost:3000/api/users/delete",config)
        return res
    } catch (error) {
        return error
    }
}
