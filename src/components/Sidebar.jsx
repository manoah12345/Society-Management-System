import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='h-full w-[18%] bg-red-400 border-r-2 flex flex-col justify-around items-center pb-14'>
        <h3>[Society Name]</h3>
        <Link className='px-3 py-1 hover:border rounded' to='/profile'>Profile</Link>
        <Link className='px-3 py-1 hover:border rounded'to='/society'>Society Info</Link>
        <Link className='px-3 py-1 hover:border rounded'>Members</Link>
        <Link className='px-3 py-1 hover:border rounded'>Account</Link>
        <Link className='px-3 py-1 hover:border rounded'>Parking</Link>
    </div>
  )
}

export default Sidebar