import React from 'react'
import Navbar from './navbar'
import ItemList from './item-list'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Navbar />
      <ItemList />
      Home
    </div>
  )
}

export default Home