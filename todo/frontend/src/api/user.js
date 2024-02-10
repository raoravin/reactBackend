import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};



export const register = async (user) => {
    try {
        const res = await axios.post("http://localhost:3000/api/users/register", user)
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
        const res = await axios.put("/api/users/updatedetails", user)
        return res;
    } catch (error) {
        return error;
    }
}



export const updatePassword = async (data) => {
    try {
        const res = await axios.put("/api/users/updatePassword", data)
        return res;
    } catch (error) {
        return error;
    }
}

export const delteUser = async () => {
    try {
        const res = await axios.delete("/api/users/delete")
        return res
    } catch (error) {
        return error
    }
}
