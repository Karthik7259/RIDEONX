import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1564836663277-c4aa761b9882?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN5YmVycHVuayUyMGNpdHl8ZW58MHx8MHx8fDA%3D")] h-screen pt-1  flex justify-between flex-col w-full'>
            <img className="w-40 h-40" src="/logo4.png" alt="" />
         <div  className='bg-cover bg-center bg-[url("https://cdn.pixabay.com/photo/2015/11/17/21/46/navigation-1048294_1280.jpg")] bg-white pb-7 py-4 px-4 '>
            <h2 className='text-[30px] font-bold'>Kickstart Your Journey with RIDEONX!</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-3.5'>Discover</Link>
         </div>
        </div>
    </div>
  )
}

export default Start;
