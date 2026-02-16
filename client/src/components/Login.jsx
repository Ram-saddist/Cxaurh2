import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login() {
 const {loginUser} = useContext(AuthContext)
  const [loginFormData, setLoginFormData] = useState({
    email: "", password: ""
  })
  const navigate = useNavigate()
  function handleLogin(e) {
    e.preventDefault()
    axios.post("http://localhost:2000/auth/login",loginFormData,{withCredentials:true})
      .then((res)=>{
        console.log(res)
        if(res.status==200){
          alert("User loggerd in successfully")
          //localStorage.setItem("token",res.data.token)
          //navigate("/")
          loginUser(res.data)
        }
      })
      .catch(err=>{
        console.log(err.response?.data?.message)
      })
  }
  function handleChange(e) {
    setLoginFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  return (
    <div className='container'>
      <div className="row d-flex justify-content-center">
        <form onSubmit={handleLogin} className='col-12 col-md-6'>
          <div className='mb-3'>
            <h2>Login</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              onChange={handleChange} />
          </div>
          <button className='btn btn-warning'>Submit</button>
        </form>
      </div>
    </div>
  )
}
