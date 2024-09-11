import React from 'react'

function Home() {
  return ( 
    <div className='h-full w-[82%] flex justify-around py-3 items-start'>
        <h1 className='px-10 py-7 border rounded bg-white'>Total number of Vehicles</h1>
        <h1 className='px-10 py-7 border rounded bg-white'>Total Members</h1>
        <h1 className='px-10 py-7 border rounded bg-white'> Remaining empty Blocks</h1>
    </div>
  )
}
export default Home