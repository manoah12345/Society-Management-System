import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase-config';

function Profile() {
    const email = auth?.currentUser?.email;

  return (
    <div className='h-full w-[82%]'>
        <div className='w-[86vw] h-[300px] bg-white flex flex-col items-center justify-center gap-3'>
            <Link to='/profile/detail'>
        <CgProfile className='text-[120px]' />
        </Link>
        <h1 className='text-3xl'>{ email }</h1>
        </div>
        <div className='w-[86vw] h-[40%] bg-blue-400 flex justify-center items-center text-[30px]'>
            <table className='border-2 border-black h-[50%] w-[32%] bg-white'>
                <tr className='border-2 border-black'>
                    <td className='border-2 border-black text-center'>Flat No.</td>
                    <td className='text-center'>201</td>
                </tr>
                <tr>
                    <td className='border-2 border-black text-center'>Role</td>
                    <td className='text-center'>Member</td>
                </tr>
            </table>
        </div>

</div>
  )
}

export default Profile