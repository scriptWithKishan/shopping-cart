import React from 'react'
import { useNavigate } from "react-router"
import axios from 'axios'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    const api = import.meta.env.VITE_BACKEND_URI
    const token = Cookies.get('jwtToken')

      ; (async function () {
        try {
          await axios.post(`${api}users/logout`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          Cookies.remove('jwtToken')
          navigate('/login')
        } catch (err) {
          console.log(err)
        }
      })()
  }

  return (
    <div>
      <h1>ShopKart</h1>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar