import React, { useState, useEffect, createContext } from 'react'
import API from '../api/APICheck.jsx'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user,setUser]= useState(null) 
    const [loading,setLoading]=useState(true)
    const navigate= useNavigate()
    useEffect(()=>{
        refreshUser()
    },[])
    async function refreshUser(){
        try{
            await API.post("/auth/refresh-token")
                .then((res)=>{
                    console.log(res.data)
                    setUser(res.data.user)
                })
        }
        catch(err){
            console.log("Error from Auth context file",err.response)
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }

    const logoutUser=async ()=>{
        await API.post("/auth/logout")
            .then((res)=>{
                console.log(res)
                localStorage.removeItem("token")
                setUser(null)
                navigate("/login")
            })
    }

    const loginUser=(data)=>{
        localStorage.setItem("token",data.token)
        setUser(data.user)
        setLoading(false)
        navigate("/dashboard")
    }
    return (
        <div>
            <AuthContext.Provider value={{loginUser,logoutUser,loading,user}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}