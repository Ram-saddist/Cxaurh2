import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
export default function Navigation() {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      {
        !user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button  onClick={logoutUser}>Logout</button>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )
      }

    </div>
  )
}