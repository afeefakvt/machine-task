import { api } from "./axios";

export const loginUser = async(credentials)=>{
    try {
        const response =  await api.post('/auth/login',credentials)
        return response.data
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")

    }
}

export  const registerUser = async(userData)=>{
    try {
        const response = await api.post('/users',userData)
        return response.data
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")

    }
}