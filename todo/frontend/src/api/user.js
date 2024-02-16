import axios from "axios";

const config = {
    withCredentials: true
};



export const register = async (user) => {
    try {
        const res = await axios.post("https://react-backend-pink.vercel.app/api/users/register", user)
        return res
    } catch (error) {
        return error
    }
}


export const login = async (user) => {
    try {
        const res = await axios.post("https://react-backend-pink.vercel.app/api/users/login", user)
        return res
    } catch (error) {
        return error
    }
}


export const logout = async () => {
    try {
        const res = await axios.get("https://react-backend-pink.vercel.app/api/users/logout")
        return res;
    } catch (error) {
        return error;
    }
}


export const getUser= async () => {
    try {
        const res = await axios.get("https://react-backend-pink.vercel.app/api/users/me")
        return res;
    } catch (error) {
        return error;
    }
}




export const updateUser = async (user) => {
    try {
        const res = await axios.put("https://react-backend-pink.vercel.app/api/users/updatedetails", user,config)
        return res;
    } catch (error) {
        return error;
    }
}



export const updatePassword = async (data) => {
    try {
        const res = await axios.put("https://react-backend-pink.vercel.app/api/users/updatePassword", data,config)
        return res;
    } catch (error) {
        return error;
    }
}

export const delteUser = async () => {
    try {
        const res = await axios.delete("https://react-backend-pink.vercel.app/api/users/delete",config)
        return res
    } catch (error) {
        return error
    }
}
