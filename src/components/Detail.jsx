import React from 'react'

function Detail() {
  return (
    <div className='h-full w-[82%] p-5'>
        <h1 className='mb-5'>Residents</h1>
        <div className='h-[80%] w-full bg-white rounded grid grid-cols-[150px,auto] grid-rows-7 p-2'>
            <h3 className='text-center border border-black'>Name</h3>
            <h3 className='px-1 border border-black'>Glavin Lobo</h3>
            <h3 className='text-center border border-black'>Birthdate</h3>
            <h3 className='px-1 border border-black'>02/09/2004</h3>
            <h3 className='text-center border border-black'>Age</h3>
            <h3 className='px-1 border border-black'>19</h3>
            <h3 className='text-center border border-black'>Gender</h3>
            <h3 className='px-1 border border-black'>Male</h3>
            <h3 className='text-center border border-black'>Occupation</h3>
            <h3 className='px-1 border border-black'>Student</h3>
            <h3 className='text-center border border-black'>Phone No.</h3>
            <h3 className='px-1 border border-black'>1234567890</h3>
            <h3 className='text-center border border-black'>abc@gmail.com</h3>
            <h3 className='px-1 border border-black'>Email</h3>

        </div>
        </div>
  )
}

export default Detail