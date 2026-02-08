import React from 'react'
import { useNavigate } from "react-router"
import axios from 'axios'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = async () => {
    const api = import.meta.env.VITE_BACKEND_URI
    const token = Cookies.get('jwtToken')

    try {
      await axios.post(`${api}/users/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      Cookies.remove('jwtToken')
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex items-center justify-between p-6'>
      <h1 className='text-2xl font-bold'>ShopKart</h1>

      <div className='flex items-center gap-4'>
        <button className='bg-white border-1 border-white rounded-md px-3 py-1 hover:border-black'>Checkout</button>
        <button className='bg-white border-1 border-white rounded-md px-3 py-1 hover:border-black'>Cart</button>
        <button className='bg-white border-1 border-white rounded-md px-3 py-1 hover:border-black'>Orders</button>
        {Cookies.get('jwtToken') ? (
          <button
            className='bg-black border-1 rounded-md text-white px-3 py-1'
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className='bg-black border-1 rounded-md text-white px-3 py-1'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar