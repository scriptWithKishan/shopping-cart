import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import axios from "axios"

import { TriangleAlert } from 'lucide-react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const onSubmit = e => {
    e.preventDefault()

    const api = import.meta.env.VITE_BACKEND_URI

      ; (async function () {
        try {
          const response = await axios.post(`${api}users/login`, {
            username,
            password
          })

          const data = response.data

          const token = data.token
          Cookies.set('jwtToken', token)

          navigate('/')
        } catch (err) {
          setError(err.response?.data?.message)
        }
      })()
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Login to your account <br /> to purchase new products</h1>

      <form
        className='flex flex-col gap-2 items-center mt-10 px-20'
        onSubmit={onSubmit}
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="border-1 bg-gray-100 border-slate-200 w-4/5 rounded-md pl-2 outline-none h-10" type="text" placeholder="USERNAME" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border-1 bg-gray-100 border-slate-200 w-4/5 rounded-md pl-2 outline-none h-10" type="password" placeholder="PASSWORD" />
        <button
          className=" mt-6 border-1 bg-black text-white border-black w-4/5 rounded-md pl-2 outline-none h-10 cursor-pointer"
          type="submit">
          Login
        </button>

        {
          error && <div className='flex items-center gap-4 py-2 px-4 bg-rose-400 border-2 border-dashed border-rose-700 rounded-md'>
            <TriangleAlert color='white' />
            <p className="text-white font-medium">{error}</p>
          </div>
        }
      </form>


      <p className='text-center mt-6'>Don't have an account? Create one <Link to="/signup" className='text-blue-800'>here</Link></p>
    </>
  )
}



export default Login