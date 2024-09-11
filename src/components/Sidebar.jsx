import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='h-full w-[14%] bg-red-400 border-r-2 flex flex-col justify-around items-center pb-14 text-xl'>
        <h3>[Society Name]</h3>
        <Link className='h-[70px] w-[150px] flex items-center justify-center px-3 py-1 hover:border-black hover:border rounded hover:bg-red-500 hover:font-semibold' to='/profile'>Profile</Link>
        <Link className='h-[70px] w-[150px] flex items-center justify-center px-3 py-1 hover:border-black hover:border rounded hover:bg-red-500 hover:font-semibold' to='/society'>Society Info</Link>
        <Link className='h-[70px] w-[150px] flex items-center justify-center px-3 py-1 hover:border-black hover:border rounded hover:bg-red-500 hover:font-semibold'>Members</Link>
        <Link className='h-[70px] w-[150px] flex items-center justify-center px-3 py-1 hover:border-black hover:border rounded hover:bg-red-500 hover:font-semibold'>Account</Link>
        <Link className='h-[70px] w-[150px] flex items-center justify-center px-3 py-1 hover:border-black hover:border rounded hover:bg-red-500 hover:font-semibold'>Parking</Link>
    </div>
  )
}

export default Sidebar