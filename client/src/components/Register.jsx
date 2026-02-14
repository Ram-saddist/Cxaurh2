import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", mobile: ""
  })
  const navigate=useNavigate()
  function handleRegister(e) {
    e.preventDefault()
    console.log(formData)
    axios.post("http://localhost:2000/auth/register",formData)
      .then((res)=>{
        if(res.status==201){
          alert("Registration successful")
          navigate("/login")
        }
      })
      .catch(err=>{
        alert("Check the console once registration is unsuccessful")
        console.log(err)
      })
  }
  function handleChange(e) {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  return (
    <div className='container'>
      <div className="row d-flex justify-content-center">
        <form onSubmit={handleRegister} className='col-12 col-md-6'>
          <div className="mb-3">
            <h2>Register</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name='name'
              onChange={handleChange} />
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
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name='mobile'
              onChange={handleChange} />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}
