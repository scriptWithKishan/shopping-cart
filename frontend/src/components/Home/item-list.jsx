import React, { useEffect, useState } from 'react'
import axios from 'axios'

import EachItem from './each-item'

const status = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const ItemList = () => {
  const [products, setProducts] = useState([])
  const [apiStatus, setApiStatus] = useState(status.pending)

  useEffect(() => {
    setApiStatus(status.pending)
    const api = import.meta.env.VITE_BACKEND_URI
      ; (async function () {
        try {
          const response = await axios.get(`${api}/items`)

          setProducts(response.data.products)
          setApiStatus(status.success)
        } catch (err) {
          setApiStatus(status.failure)
          console.log(err.message)
        }
      })()
  }, [])


  const success = (
    <ul className="flex-1 px-40 py-10 list-none flex items-center flex-wrap gap-10">
      {
        products.map(eachItem => (
          <EachItem details={eachItem} />
        ))
      }
    </ul>
  )

  const pending = (
    <div className="flex-1 w-full flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const failure = (
    <div className="flex-1 w-full flex flex-col items-center justify-center gap-6">
      <h1 className='text-4xl font-bold'>Something went wrong</h1>
      <button
        className="border-black border-1 px-2 py-1 rounded-md"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  )

  if (apiStatus === status.success) return success
  else if (apiStatus === status.pending) return pending
  else return failure
}

export default ItemList