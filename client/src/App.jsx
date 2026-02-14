import React from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Navigation from './components/Navigation.jsx'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute><Dashboard/> </ProtectedRoute>
          }/>
  
        </Routes>
      </BrowserRouter>
    </div>
  )
}
