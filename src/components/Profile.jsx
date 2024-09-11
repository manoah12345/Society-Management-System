import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className='h-full w-[82%]'>
        <div className='w-full h-[60%] bg-white flex flex-col justify-center items-center gap-3'>
            <Link to='/profile/detail'>
        <CgProfile className='text-[120px]' />
        </Link>
        <h1 className='text-3xl'>[Name]</h1>
        </div>
        <div className='w-full h-[40%] bg-blue-400 flex justify-center items-center'>
            <table className='border-2 border-black h-20 w-[32%] bg-white'>
                <tr className='border-2 border-black'>
                    <td className='border-2 border-black text-center'>Flat No.</td>
                    <td className='text-center'>201</td>
                </tr>
                <tr>
                    <td className='border-2 border-black text-center'>role</td>
                    <td className='text-center'>member</td>
                </tr>
            </table>
        </div>

</div>
  )
}

export default Profile