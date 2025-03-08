import React from 'react'
import {  Link } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext } from '../context/userContext.jsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [userData, setUserData] = useState({})
   const {user,setuser}=useContext(UserDataContext)

   const navigate=useNavigate()

   const submitHandler = async(e) => {
    e.preventDefault()
      const userData={
        email: email,
        password: password
      }  

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)
      if(response.status===200){
        const data=response.data
        setuser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
      setEmail('')
      setPassword('')
    }

  return (
      <div 
  className="p-7 flex flex-col justify-between h-screen bg-cover bg-center bg-no-repeat" 
  style={{ backgroundImage: "url('/public/ridexhome.webp')" }}
>

              <div>
                 <img className="w-35 h-20 mb-3" src="/logo2.png" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} action="">
      <h3 className='text-lg font-medium mb-2'>what's your email</h3>

      <input
       required
       value={email}
       onChange={ 
        (e
        ) => {
        setEmail(e.target.value)
      }
    }
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email"
         placeholder='email@example.com' />

      <h3 className='text-lg font-medium mb-2' >Enter password</h3>

      <input 
      value={password}
      onChange={ 
        (e
        ) => {
        setPassword(e.target.value)
      }
    }
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      required type="password" placeholder='*********' />

      <button
      className='bg-[#111] text-white  font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>
      </form>
      
      <p className='text-center'>New here? <Link to='/signup' className='text-blue-600 '>Create new Account</Link></p>
             </div>
             <div>
            <Link 
             to={'/RideBoss-login'}
            className='flex items-center justify-center bg-[#10b461] text-white  font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'> Sign in as RideBoss</Link>
             </div>
      </div>

  )
}

export default UserLogin