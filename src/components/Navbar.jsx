import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const logOut = async () => {
    try{
        await signOut(auth);
        navigate('/auth');
    } catch (error){
        console.error(error);
    }
}

  return (
    <div className='h-[70px] w-full bg-green-300 flex justify-between items-center px-2 text-xl'>
        <h1 className='font-bold text-2xl'>Society Management System</h1>
        <div className='h-full w-1/3 flex justify-around items-center'>
        <Link to='/'>
            <h3 className='h-[50px] w-[100px] flex items-center justify-center p-1 rounded hover:bg-green-400'>Home</h3>
            </Link>
            <Link to='/profile/detail'>
            <CgProfile className='text-2xl' />
            </Link>
            <h3 className='h-[50px] w-[100px] flex items-center justify-center p-1 rounded hover:bg-green-400'>About</h3>
            <h3 className='h-[50px] w-[100px] flex items-center justify-center p-1 rounded hover:bg-green-400' onClick={logOut}>Log Out</h3>
        </div>
    </div>
  )
}

export default Navbar