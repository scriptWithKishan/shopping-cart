import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const EachItem = ({ details }) => {
  const { _id, name, description, image, price } = details

  const formattedCurrency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  })

  const addToCart = async () => {
    try {
      const token = Cookies.get('jwtToken')
      const api = import.meta.env.VITE_BACKEND_URI
      await axios.post(`${api}/carts`, { productId: _id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <li className='bg-white flex flex-col h-105 w-70 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-300 overflow-hidden group'>
      <img className="h-70 w-full rounded-t-md transition-transform group-hover:scale-105 duration-300" src={image} alt="product image" />
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <h1 className='font-medium'>{name}</h1>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
        <div className='mb-1 flex items-center justify-between'>
          <p className='font-medium'>{formattedCurrency.format(price)}</p>
          <button
            onClick={addToCart}
            className='bg-black px-3 py-1 text-sm text-white rounded-md'
          >
            Buy
          </button>
        </div>
      </div>
    </li>
  )
}

export default EachItem