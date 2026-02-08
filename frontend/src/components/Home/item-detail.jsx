import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ItemDetail = ({ id, quantity, price }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    ; (async function () {
      try {
        const api = import.meta.env.VITE_BACKEND_URI
        const response = await axios.get(`${api}/items/${id}`)
        setName(response.data.name)
      } catch (err) {
        console.log(err.response)
      }
    })()
  }, [])

  return (
    <>
      <p>{name}</p>
      <p>x</p>
      <p>{quantity}</p>
      <p>=</p>
      <p>{price}</p>
    </>
  )
}

export default ItemDetail