import { api } from "./axios";

export const getAllProducts =async ()=>{
    try {
        
        const response = await api.get("/products")        
        return response.data
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")
    }
}

export const getProductById = async(id)=>{
    try {
        
        const response = await api.get(`products/${id}`)        
        return response.data
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")

    }
}

export const getAllCategories = async ()=>{
    try {
        const response = await api.get('/products/categories')
        return response.data
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")

    }
}

export const getProductsByCategory = async(category)=>{
    try {
        const response = await api.get(`/products/category${category}`)
    } catch (error) {
        throw error.response.data || new Error("Something went wrong")

    }
}