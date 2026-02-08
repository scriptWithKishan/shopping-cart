import React from 'react'

const EachItem = ({ details }) => {
  const { name, description, image, price } = details

  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  })

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
          <button className='bg-black px-3 py-1 text-sm text-white rounded-md'>Buy</button>
        </div>
      </div>
    </li>
  )
}

export default EachItem