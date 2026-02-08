import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import ItemDetail from './item-detail'

const status = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const Order = () => {
  const [orderItems, setOrderItems] = useState([])
  const [apiStatus, setApiStatus] = useState(status.pending)

  const formattedCurrency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  })

  const getOrderItems = async () => {
    try {
      setApiStatus(status.pending)
      const api = import.meta.env.VITE_BACKEND_URI
      const token = Cookies.get('jwtToken')

      const response = await axios.get(`${api}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrderItems(response.data.orders)
      setApiStatus(status.success)
    } catch (err) {
      setApiStatus(status.failure)
      console.log(err.message)
    }
  }

  useEffect(() => {
    getOrderItems()
  }, [])

  const success = (
    <ul className='mt-6 flex flex-col gap-4'>
      {orderItems.length > 0 ? (
        orderItems.map(eachOrder => (
          <li key={eachOrder._id} className='border-1 border-black p-2 rounded-md'>
            <p className='text-sm'>Order ID: {eachOrder._id}</p>
            <ul className='flex flex-col gap-2'>
              {eachOrder.items.map(eachItem => (
                <li key={eachItem._id} className='flex items-center gap-1'>
                  <ItemDetail id={eachItem.product} quantity={eachItem.qty} price={eachItem.price} />
                </li>
              ))}
              <li>
                <p className='text-black font-bold'>Total: {formattedCurrency.format(eachOrder.total)}</p>
              </li>
            </ul>
          </li>
        ))) : (
        <p>No orders placed yet</p>
      )}

    </ul>
  )

  const pending = (
    <div className="flex-1 w-full mt-6 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const failure = (
    <div className="flex-1 w-full flex flex-col items-center justify-center gap-2 mt-6">
      <h1 className='text-xl font-bold'>Something went wrong</h1>
      <button
        className="border-black border-1 px-2 py-1 rounded-md"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  )

  const order = () => {
    toast(
      <div className='w-full h-full'>
        <h1 className='text-xl font-medium text-center'>Order</h1>
        {
          apiStatus === status.success ? success : apiStatus === status.pending ? pending : failure
        }
      </div>,
      {
        autoClose: 10000,
        closeOnClick: true,
        draggable: true,
        closeButton: true,
        position: 'bottom-right'
      }
    )
  }

  return (
    <button
      className='bg-white border-1 border-white rounded-md px-3 py-1 hover:border-black'
      onClick={order}
    >
      Orders
    </button>
  )
}

export default Order