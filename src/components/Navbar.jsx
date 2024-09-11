import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='h-[70px] w-full bg-green-300 flex justify-between items-center px-2 text-xl'>
        <h1 className='font-bold text-2xl'>Society Management System</h1>
        <div className='h-full w-1/3 flex justify-around items-center'>
        <Link to='/'>
            <h3 className='p-1 rounded hover:bg-sky-400'>Home</h3>
            </Link>
            <Link to='/profile/detail'>
            <CgProfile className='text-2xl' />
            </Link>
            <h3 className='p-1 rounded hover:bg-sky-400'>About</h3>
            <h3 className='p-1 rounded hover:bg-sky-400'>Username</h3>
        </div>
    </div>
  )
}

export default Navbar