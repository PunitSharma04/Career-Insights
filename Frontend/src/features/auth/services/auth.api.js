import axios from "axios";

/**
 * Auth API Service
 * This service provides functions to interact with the authentication API endpoints.
 * It includes functions for user registration, login, logout, and fetching the current user's information.
 * The API base URL is set to "http://localhost:3000" and credentials are included in requests for session management.  
 */

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export async function register({username, email, password}){ 
    try{
        const response = await api.post("/api/auth/register", {username, email, password});
        return response.data;
    }catch(error){
        console.error("Registration error:", error);
        throw error;
    }
}

export async function login({email, password}){
    try{
        const response = await api.post("/api/auth/login", {email, password});
        return response.data;
    }catch(error){
        console.error("Login error:", error);
        throw error;
    }
}

export async function logout(){
    try{
        const response = await api.get("/api/auth/logout");
        return response.data;
    }catch(error){
        console.error("Logout error:", error);
        throw error;
    }
}

export async function getMe(){
    try{
        const response = await api.get("/api/auth/get-me");
        return response.data;
    }catch(error){
        console.error("Get Me error:", error);
        throw error;
    }
}